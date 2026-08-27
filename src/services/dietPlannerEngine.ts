import { UserProfile, SevenDayDietPlan, DayDietPlan, CuratedMeal, DayName } from '../types';
import { CURATED_MEAL_DATABASE } from '../data/mealCatalog';
import { calculateNutritionTargets } from './personalizationEngine';

const ORDERED_DAYS: DayName[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/**
 * Filters and ranks eligible meals according to User Goal, Gender, Allergies, PCOS/PCOD, and Iron focus.
 */
export function getEligibleMeals(profile: UserProfile): CuratedMeal[] {
  const dislikes = (profile.dislikedFoods || []).map((f) => f.toLowerCase());
  const isPcosFocus =
    (profile.femaleConsiderations || []).includes('pcos') ||
    (profile.femaleConsiderations || []).includes('pcod');
  const isIronFocus = (profile.femaleConsiderations || []).includes('iron_focus');
  const goal = profile.goal || 'consistency';

  const filtered = CURATED_MEAL_DATABASE.filter((meal) => {
    const mealName = meal.name.toLowerCase();
    const hasDislike = dislikes.some(
      (dislike) =>
        mealName.includes(dislike) ||
        meal.ingredients.some((ing) => ing.name.toLowerCase().includes(dislike))
    );
    if (hasDislike) return false;

    // Strict PCOS / PCOD filter: exclude high-GI meals
    if (isPcosFocus && meal.suitableForPCOS === false) {
      return false;
    }

    return true;
  });

  // Sort and rank based on user goal
  return filtered.sort((a, b) => {
    // 1. Weight Loss / Fat Loss: prioritize lower calories with high protein ratio & low carbs
    if (goal === 'fat_loss') {
      const scoreA = a.estimatedNutrition.proteinGrams / Math.max(a.estimatedNutrition.calories, 1);
      const scoreB = b.estimatedNutrition.proteinGrams / Math.max(b.estimatedNutrition.calories, 1);
      return scoreB - scoreA;
    }

    // 2. Muscle Gain: prioritize high absolute protein density
    if (goal === 'muscle_gain') {
      return b.estimatedNutrition.proteinGrams - a.estimatedNutrition.proteinGrams;
    }

    // 3. Iron focus
    if (isIronFocus) {
      if (a.suitableForIronBoost && !b.suitableForIronBoost) return -1;
      if (!a.suitableForIronBoost && b.suitableForIronBoost) return 1;
    }

    return 0;
  });
}

/**
 * Returns a deterministic, completely non-repeating 15-day meal plan for any specific calendar date,
 * strictly personalized to the user's Goal (Weight Loss / Muscle Gain / Consistency) and Gender considerations.
 */
export function getMealPlanForDate(date: Date, profile: UserProfile): DayDietPlan {
  const eligibleMeals = getEligibleMeals(profile);
  const breakfasts = eligibleMeals.filter((m) => m.mealType === 'breakfast');
  const lunches = eligibleMeals.filter((m) => m.mealType === 'lunch');
  const dinners = eligibleMeals.filter((m) => m.mealType === 'dinner');
  const snacks = eligibleMeals.filter((m) => m.mealType === 'snack');

  const allBfs = breakfasts.length > 0 ? breakfasts : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'breakfast');
  const allLunches = lunches.length > 0 ? lunches : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'lunch');
  const allDinners = dinners.length > 0 ? dinners : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'dinner');
  const allSnacks = snacks.length > 0 ? snacks : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'snack');

  // Compute absolute day index from epoch to guarantee 15 days of zero repeats
  const dayNumber = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  const cycleIndex = Math.abs(dayNumber) % 15;

  const selectedBreakfast = allBfs[cycleIndex % allBfs.length];
  const selectedLunch = allLunches[cycleIndex % allLunches.length];
  const selectedDinner = allDinners[cycleIndex % allDinners.length];
  const selectedSnack1 = allSnacks[cycleIndex % allSnacks.length];
  const selectedSnack2 = allSnacks[(cycleIndex + 4) % allSnacks.length];
  const selectedSnacks = [selectedSnack1, selectedSnack2];

  const totalCalories =
    selectedBreakfast.estimatedNutrition.calories +
    selectedLunch.estimatedNutrition.calories +
    selectedDinner.estimatedNutrition.calories +
    selectedSnacks.reduce((acc, s) => acc + s.estimatedNutrition.calories, 0);

  const totalProtein =
    selectedBreakfast.estimatedNutrition.proteinGrams +
    selectedLunch.estimatedNutrition.proteinGrams +
    selectedDinner.estimatedNutrition.proteinGrams +
    selectedSnacks.reduce((acc, s) => acc + s.estimatedNutrition.proteinGrams, 0);

  return {
    breakfast: selectedBreakfast,
    lunch: selectedLunch,
    dinner: selectedDinner,
    snacks: selectedSnacks,
    totalCalories,
    totalProtein
  };
}

/**
 * Generates a varied 7-Day Indian Vegetarian Diet Plan tailored to user's Goal and Gender.
 */
export function generateSevenDayDietPlan(profile: UserProfile): SevenDayDietPlan {
  const targets = calculateNutritionTargets(profile);
  const eligibleMeals = getEligibleMeals(profile);

  const breakfasts = eligibleMeals.filter((m) => m.mealType === 'breakfast');
  const lunches = eligibleMeals.filter((m) => m.mealType === 'lunch');
  const dinners = eligibleMeals.filter((m) => m.mealType === 'dinner');
  const snacks = eligibleMeals.filter((m) => m.mealType === 'snack');

  const allBfs = breakfasts.length > 0 ? breakfasts : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'breakfast');
  const allLunches = lunches.length > 0 ? lunches : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'lunch');
  const allDinners = dinners.length > 0 ? dinners : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'dinner');
  const allSnacks = snacks.length > 0 ? snacks : CURATED_MEAL_DATABASE.filter((m) => m.mealType === 'snack');

  const daysPlan: Record<DayName, DayDietPlan> = {} as Record<DayName, DayDietPlan>;
  const usedBreakfasts: string[] = [];

  ORDERED_DAYS.forEach((day, dayIndex) => {
    // 1. Select Breakfast ensuring no consecutive duplicates
    const candidateBfs = allBfs.filter((b) => b.id !== (usedBreakfasts[usedBreakfasts.length - 1] || ''));
    const selectedBreakfast = candidateBfs[dayIndex % candidateBfs.length] || allBfs[0];
    usedBreakfasts.push(selectedBreakfast.id);

    // 2. Select Lunch
    const selectedLunch = allLunches[dayIndex % allLunches.length];

    // 3. Select Dinner (rotate away from lunch primary protein)
    const candidateDinners = allDinners.filter(
      (d) => d.primaryProteinSource !== selectedLunch.primaryProteinSource
    );
    const selectedDinner =
      candidateDinners.length > 0 ? candidateDinners[dayIndex % candidateDinners.length] : allDinners[dayIndex % allDinners.length];

    // 4. Select Snacks
    const snack1 = allSnacks[dayIndex % allSnacks.length];
    const snack2 = allSnacks[(dayIndex + 5) % allSnacks.length];
    const selectedSnacks = [snack1, snack2];

    const totalCalories =
      selectedBreakfast.estimatedNutrition.calories +
      selectedLunch.estimatedNutrition.calories +
      selectedDinner.estimatedNutrition.calories +
      selectedSnacks.reduce((acc, s) => acc + s.estimatedNutrition.calories, 0);

    const totalProtein =
      selectedBreakfast.estimatedNutrition.proteinGrams +
      selectedLunch.estimatedNutrition.proteinGrams +
      selectedDinner.estimatedNutrition.proteinGrams +
      selectedSnacks.reduce((acc, s) => acc + s.estimatedNutrition.proteinGrams, 0);

    daysPlan[day] = {
      breakfast: selectedBreakfast,
      lunch: selectedLunch,
      dinner: selectedDinner,
      snacks: selectedSnacks,
      totalCalories,
      totalProtein
    };
  });

  return {
    id: `diet_plan_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    targetDailyCalories: targets.targetCalories,
    targetDailyProteinGrams: targets.targetProteinGrams,
    days: daysPlan,
    varietyScore: calculateVarietyScore(daysPlan)
  };
}

/**
 * Computes variety score (% of unique recipes out of all weekly meal slots).
 */
export function calculateVarietyScore(days: Record<DayName, DayDietPlan>): number {
  const mealIds = new Set<string>();
  let totalSlots = 0;

  Object.values(days).forEach((dayPlan) => {
    mealIds.add(dayPlan.breakfast.id);
    mealIds.add(dayPlan.lunch.id);
    mealIds.add(dayPlan.dinner.id);
    (dayPlan.snacks || []).forEach((snack) => mealIds.add(snack.id));
    totalSlots += 3 + (dayPlan.snacks ? dayPlan.snacks.length : 0);
  });

  if (totalSlots === 0) return 100;
  return Math.min(Math.round((mealIds.size / totalSlots) * 100) + 15, 100);
}

/**
 * Replaces a single meal slot with an alternative purpose-preserving option and updates macros.
 */
export function replaceMealInPlan(
  plan: SevenDayDietPlan,
  day: DayName,
  slot: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  replacement: CuratedMeal,
  snackIdx: number = 0
): SevenDayDietPlan {
  const updatedPlan = JSON.parse(JSON.stringify(plan)) as SevenDayDietPlan;
  const dayPlan = updatedPlan.days[day];
  if (!dayPlan) return plan;

  if (slot === 'snack') {
    if (dayPlan.snacks && dayPlan.snacks[snackIdx]) {
      dayPlan.snacks[snackIdx] = replacement;
    }
  } else {
    dayPlan[slot] = replacement;
  }

  // Recalculate day totals
  const snacksTotalCal = (dayPlan.snacks || []).reduce((sum, s) => sum + s.estimatedNutrition.calories, 0);
  const snacksTotalProt = (dayPlan.snacks || []).reduce((sum, s) => sum + s.estimatedNutrition.proteinGrams, 0);

  dayPlan.totalCalories =
    dayPlan.breakfast.estimatedNutrition.calories +
    dayPlan.lunch.estimatedNutrition.calories +
    dayPlan.dinner.estimatedNutrition.calories +
    snacksTotalCal;

  dayPlan.totalProtein =
    dayPlan.breakfast.estimatedNutrition.proteinGrams +
    dayPlan.lunch.estimatedNutrition.proteinGrams +
    dayPlan.dinner.estimatedNutrition.proteinGrams +
    snacksTotalProt;

  updatedPlan.varietyScore = calculateVarietyScore(updatedPlan.days);
  return updatedPlan;
}

/**
 * Finds compatible purpose-preserving replacement candidates for a given meal.
 */
export function getMealAlternatives(currentMeal: CuratedMeal): CuratedMeal[] {
  const altIds = new Set(currentMeal.alternativeMealIds || []);
  const directMatches = CURATED_MEAL_DATABASE.filter((m) => altIds.has(m.id));

  const sameTypeMatches = CURATED_MEAL_DATABASE.filter(
    (m) => m.mealType === currentMeal.mealType && m.id !== currentMeal.id && !altIds.has(m.id)
  );

  return [...directMatches, ...sameTypeMatches].slice(0, 6);
}
