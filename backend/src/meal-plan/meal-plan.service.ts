import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePetDto } from '../pets/dto/create-pet.dto';

@Injectable()
export class MealPlanService {
  async generateMealPlan(pet: CreatePetDto): Promise<object> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException('GROQ_API_KEY is not set in environment');
    }

    const systemPrompt = `You are an expert pet nutritionist for Furchild, a premium raw pet food company in Dubai UAE. Furchild sells: raw meals (chicken, beef, lamb, turkey), raw bones, freeze-dried treats, and all-natural chews made with human-grade, organic, grain-free ingredients.

Given a pet's profile, generate a personalized 7-day raw meal plan using ONLY Furchild products. Keep language warm, caring and on-brand for a premium pet food company.

Respond with ONLY valid JSON in this exact structure (no markdown, no extra text):
{
  "petName": "string",
  "summary": "2-sentence nutrition profile summary",
  "days": [
    {
      "day": "Monday",
      "morning": { "meal": "string", "portion": "string" },
      "evening": { "meal": "string", "portion": "string" },
      "treats": "string",
      "whyThisMeal": "string"
    }
  ]
}`;

    const userPrompt = `Pet Profile:
- Name: ${pet.petName}
- Breed: ${pet.breed}
- Age: ${pet.age}
- Weight: ${pet.weight}kg
- Activity Level: ${pet.activityLevel}
- Allergies/Conditions: ${pet.allergies || 'None'}

Generate a personalized 7-day Furchild meal plan for this pet.`;

    try {
      console.log('Calling Groq...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      console.log('Groq responded:', response.status);

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Groq ${response.status}: ${err}`);
      }

      const data = await response.json() as any;
      const text = data.choices?.[0]?.message?.content || '';
      console.log('Groq raw response:', text.slice(0, 200));

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in response');
      return JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error('Groq error:', err);
      throw new InternalServerErrorException(`Meal plan generation failed: ${err.message}`);
    }
  }
}
