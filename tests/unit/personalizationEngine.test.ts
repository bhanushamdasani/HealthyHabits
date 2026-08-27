import { describe, it, expect } from 'vitest';
import { calculateBMR, calculateTDEE, calculateNutritionTargets } from '../../src/services/personalizationEngine';
import { generateSevenDayDietPlan, getMealPlanForDate } from '../../src/services/dietPlannerEngine';
import { defaultUserProfile } from '../../src/services/storageService';

describe('Personalization & Nutrition Engine', () => {
  it('calculates deterministic Mifflin-St Jeor BMR for male and female', () => {
    // Male: 10*70 + 6.25*175 - 5*25 + 5 = 700 + 1093.75 - 125 + 5 = 1673.75 -> 1674
    const maleBmr = calculateBMR(70, 175, 25, 'male');
    expect(maleBmr).toBe(1674);

    // Female: 10*60 + 6.25*160 - 5*25 - 161 = 600 + 1000 - 125 - 161 = 1314
    const femaleBmr = calculateBMR(60, 160, 25, 'female');
    expect(femaleBmr).toBe(1314);
  });

  it('calculates accurate TDEE based on activity multiplier', () => {
    const bmr = 1600;
    const tdeeLight = calculateTDEE(bmr, 1.375); // 2200
    expect(tdeeLight).toBe(2200);

    const tdeeMod = calculateTDEE(bmr, 1.55); // 2480
    expect(tdeeMod).toBe(2480);
  });

  it('calculates macronutrient targets respecting fat loss deficit and protein floor', () => {
    const user = {
      ...defaultUserProfile,
      startWeightKg: 70,
      currentWeightKg: 70,
      heightCm: 175,
      age: 24,
      gender: 'male' as const,
      activityLevel: 1.375 as const,
      goal: 'fat_loss' as const
    };

    const targets = calculateNutritionTargets(user);
    expect(targets.targetCalories).toBeLessThan(targets.tdee); // In deficit
    expect(targets.targetProteinGrams).toBeGreaterThanOrEqual(70 * 1.4); // Minimum 1.4g/kg for fat loss
  });
});

describe('7-Day Indian Vegetarian Diet Planner Engine', () => {
  it('generates a complete 7-day plan with no consecutive breakfast duplicate meals', () => {
    const user = { ...defaultUserProfile };
    const plan = generateSevenDayDietPlan(user);

    expect(plan.days.mon).toBeDefined();
    expect(plan.days.tue).toBeDefined();
    expect(plan.days.wed).toBeDefined();
    expect(plan.days.thu).toBeDefined();
    expect(plan.days.fri).toBeDefined();
    expect(plan.days.sat).toBeDefined();
    expect(plan.days.sun).toBeDefined();

    // Verify no consecutive breakfast duplicates
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
    for (let i = 0; i < days.length - 1; i++) {
      const todayBreakfast = plan.days[days[i]].breakfast.name;
      const nextBreakfast = plan.days[days[i + 1]].breakfast.name;
      expect(todayBreakfast).not.toBe(nextBreakfast);
    }
  });

  it('achieves high variety score (>=85%)', () => {
    const plan = generateSevenDayDietPlan(defaultUserProfile);
    expect(plan.varietyScore).toBeGreaterThanOrEqual(85);
  });

  it('generates distinct non-repeating meals across 15 consecutive calendar dates', () => {
    const user = { ...defaultUserProfile };
    const baseDate = new Date(2026, 7, 1); // Aug 1 2026
    const seenBreakfasts = new Set<string>();

    for (let i = 0; i < 15; i++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + i);
      const plan = getMealPlanForDate(d, user);
      expect(plan.breakfast).toBeDefined();
      expect(plan.lunch).toBeDefined();
      expect(plan.dinner).toBeDefined();
      expect(plan.snacks.length).toBeGreaterThanOrEqual(1);
      seenBreakfasts.add(plan.breakfast.id);
    }

    // Must have at least 10+ distinct breakfasts across 15 days
    expect(seenBreakfasts.size).toBeGreaterThanOrEqual(10);
  });

  it('filters strictly to PCOS-friendly low-GI meals when female PCOS filter is active', () => {
    const femaleUser = {
      ...defaultUserProfile,
      gender: 'female' as const,
      femaleConsiderations: ['pcos' as const]
    };

    for (let i = 0; i < 15; i++) {
      const d = new Date(2026, 7, i + 1);
      const plan = getMealPlanForDate(d, femaleUser);
      expect(plan.breakfast.suitableForPCOS).not.toBe(false);
      expect(plan.lunch.suitableForPCOS).not.toBe(false);
      expect(plan.dinner.suitableForPCOS).not.toBe(false);
    }
  });
});
