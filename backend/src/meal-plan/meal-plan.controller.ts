import { Controller, Post, Body } from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';
import { CreatePetDto } from '../pets/dto/create-pet.dto';

@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post('generate')
  async generate(@Body() pet: CreatePetDto) {
    return this.mealPlanService.generateMealPlan(pet);
  }
}
