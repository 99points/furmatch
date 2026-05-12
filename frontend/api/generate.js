export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { petName, breed, age, weight, activityLevel, allergies } = req.body;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'GROQ_API_KEY is not configured' });
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
- Name: ${petName}
- Breed: ${breed}
- Age: ${age}
- Weight: ${weight}kg
- Activity Level: ${activityLevel}
- Allergies/Conditions: ${allergies || 'None'}

Generate a personalized 7-day Furchild meal plan for this pet.`;

  try {
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

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ message: `Groq error: ${err}` });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ message: 'No JSON found in AI response' });
    }

    return res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    return res.status(500).json({ message: `Failed: ${err.message}` });
  }
}
