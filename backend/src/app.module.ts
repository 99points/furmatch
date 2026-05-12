import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealPlanModule } from './meal-plan/meal-plan.module';

@Module({
  imports: [MealPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
