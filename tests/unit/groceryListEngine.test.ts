import { describe, it, expect } from 'vitest';
import { generateWeeklyGroceryList, normalizeIngredientName } from '../../src/services/groceryListEngine';
import { UserProfile } from '../../src/types';

describe('groceryListEngine', () => {
  const mockProfile: UserProfile = {
    name: 'Suman',
    age: 24,
    gender: 'female',
    heightCm: 165,
    startWeightKg: 60,
    currentWeightKg: 60,
    goal: 'fat_loss',
    femaleConsiderations: ['pcos'],
    wakeTime: '06:00 AM',
    sleepTime: '10:00 PM',
    activityLevel: 1.375,
    lifestyle: 'working_professional'
  };

  it('normalizes ingredients into consolidated supermarket units', () => {
    const paneer = normalizeIngredientName('Paneer (100g)');
    expect(paneer.normalized).toBe('Fresh Low-Fat Paneer');
    expect(paneer.category).toBe('protein');

    const spinach = normalizeIngredientName('Fresh Spinach (Palak)');
    expect(spinach.normalized).toBe('Fresh Baby Spinach (Palak)');
    expect(spinach.category).toBe('produce');

    const ragi = normalizeIngredientName('Ragi Flour (1 cup)');
    expect(ragi.normalized).toBe('Ragi (Finger Millet) Flour');
    expect(ragi.category).toBe('grains');

    const chia = normalizeIngredientName('Chia Seeds (1 tbsp)');
    expect(chia.normalized).toBe('Raw Chia Seeds');
    expect(chia.category).toBe('superfoods');
  });

  it('generates an organized 7-day weekly grocery list with reasonable item counts', () => {
    const list = generateWeeklyGroceryList(mockProfile);

    expect(list.totalItems).toBeGreaterThan(10);
    expect(list.totalItems).toBeLessThan(35); // Concise and non-overwhelming for 1 week
    expect(list.produce.length).toBeGreaterThan(0);
    expect(list.protein.length).toBeGreaterThan(0);
    expect(list.grains.length).toBeGreaterThan(0);

    // Verify weekly quantity units
    list.protein.forEach((item) => {
      expect(item.weeklyQuantity).toBeDefined();
      expect(item.mealsUsedIn.length).toBeGreaterThan(0);
    });
  });
});
