import { UserProfile, WeeklySchedule, DayName, ScheduleTask } from '../types';
import { defaultSchedule } from '../data/defaultSchedule';
import { timeToMinutes, minutesToTime } from '../utils/timeUtils';

export interface NutritionTargets {
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
}

export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: string): number {
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else if (gender === 'female') {
    bmr -= 161;
  } else {
    bmr -= 78;
  }
  return Math.round(bmr);
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  return Math.round(bmr * activityLevel);
}

/**
 * Calculates estimated BMR (Mifflin-St Jeor), TDEE, and macronutrient targets.
 * Clearly models them as scientific baseline estimates rather than medical prescriptions.
 */
export function calculateNutritionTargets(profile: UserProfile): NutritionTargets {
  const w = profile.currentWeightKg || profile.startWeightKg || 65;
  const h = profile.heightCm || 170;
  const a = profile.age || 24;
  const gender = profile.gender || 'male';
  const activity = profile.activityLevel || 1.375;
  const goal = profile.goal || 'consistency';

  const bmr = calculateBMR(w, h, a, gender);
  const tdee = calculateTDEE(bmr, activity);

  // Goal caloric adjustments
  let targetCalories = tdee;
  if (goal === 'fat_loss') {
    targetCalories = Math.max(tdee - 350, 1300); // Sustainable 350 kcal deficit with safe floor
  } else if (goal === 'muscle_gain' || goal === 'weight_gain') {
    targetCalories = tdee + 250; // Lean surplus
  }

  // Protein targets (g per kg body weight)
  let proteinFactor = 1.2; // Baseline Indian vegetarian
  if (goal === 'muscle_gain') {
    proteinFactor = 1.6;
  } else if (goal === 'fat_loss') {
    proteinFactor = 1.4; // Preserves lean mass in deficit
  } else if (activity >= 1.725) {
    proteinFactor = 1.7;
  }

  const targetProteinGrams = Math.round(w * proteinFactor);

  // Fat target ~ 25% of calories (9 kcal/g)
  const targetFatGrams = Math.round((targetCalories * 0.25) / 9);

  // Remainder to Carbohydrates (4 kcal/g)
  const remainingCalories = targetCalories - (targetProteinGrams * 4 + targetFatGrams * 9);
  const targetCarbsGrams = Math.max(Math.round(remainingCalories / 4), 100);

  return {
    bmr,
    tdee,
    targetCalories,
    targetProteinGrams,
    targetCarbsGrams,
    targetFatGrams
  };
}

/**
 * Builds a personalized 7-day daily routine schedule mapped dynamically to user's wake time, sleep time, and workout preferences.
 */
export function generatePersonalizedSchedule(profile: UserProfile): WeeklySchedule {
  const wakeMins = profile.wakeTime ? timeToMinutes(profile.wakeTime) : 360; // 06:00 AM default
  const sleepMins = profile.sleepTime ? timeToMinutes(profile.sleepTime) : 1320; // 10:00 PM default

  const days: DayName[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const newSchedule: WeeklySchedule = { ...defaultSchedule };

  // Calculate slot offsets relative to wake time
  const breakfastMins = wakeMins + 90; // +1.5h
  const lunchMins = wakeMins + 330; // +5.5h
  const snackMins = wakeMins + 540; // +9h
  const dinnerMins = Math.min(sleepMins - 120, wakeMins + 720); // 2 hours before bed

  let workoutMins = wakeMins + 600; // 5:00 PM default afternoon
  if (profile.preferredWorkoutTime === 'morning') {
    workoutMins = wakeMins + 45; // early morning
  } else if (profile.preferredWorkoutTime === 'afternoon') {
    workoutMins = wakeMins + 390; // 1:30 PM
  }

  days.forEach((day) => {
    const isWorkoutDay = (profile.workoutDays || []).includes(day);
    const dayTasks: ScheduleTask[] = [];

    // 1. Morning Awakening
    dayTasks.push({
      id: `t_${day}_0`,
      t: minutesToTime(wakeMins),
      act: 'Wake Up & Hydrate',
      instr: '500ml Warm Water + ½ Lemon (Optional 1 tsp ACV)',
      rule: 'Prime Metabolism',
      type: 'hack',
      reminder: true,
      isRecurring: true
    });

    // 2. Morning Workout (if preferred in morning)
    if (isWorkoutDay && profile.preferredWorkoutTime === 'morning') {
      dayTasks.push({
        id: `t_${day}_workout`,
        t: minutesToTime(workoutMins),
        act: 'Morning Training',
        instr: 'Full Body / Resistance Session (45m)',
        rule: 'Show Up & Execute',
        type: 'workout',
        reminder: true,
        isRecurring: true
      });
    }

    // 3. Breakfast
    dayTasks.push({
      id: `t_${day}_bf`,
      t: minutesToTime(breakfastMins),
      act: 'Breakfast',
      instr: 'Moong Dal Chilla / Oats / Besan Chilla + Protein Base',
      rule: '+ 1 Multivitamin',
      type: 'meal',
      reminder: true,
      isRecurring: true
    });

    // 4. Focus Block
    dayTasks.push({
      id: `t_${day}_focus1`,
      t: minutesToTime(breakfastMins + 45),
      act: profile.lifestyle === 'student' ? 'Study Block 1' : 'Deep Work Focus Block',
      instr: 'Deep Focus Block (No Phone Distractions)',
      rule: 'Sip 750ml Water',
      type: 'hack',
      reminder: true,
      isRecurring: true
    });

    // 5. Lunch
    dayTasks.push({
      id: `t_${day}_lunch`,
      t: minutesToTime(lunchMins),
      act: 'Lunch',
      instr: 'Roti / Rice + Dal / Rajma / Chole / Soya + Salad + Curd',
      rule: 'Eat Salad & Protein First',
      type: 'meal',
      reminder: true,
      isRecurring: true
    });

    // 6. Post-lunch Shatapavali walk
    dayTasks.push({
      id: `t_${day}_walk`,
      t: minutesToTime(lunchMins + 25),
      act: 'Movement',
      instr: "'Shatapavali' Walk (10-15 Mins Gentle Stride)",
      rule: 'DO NOT SIT IMMEDIATELY',
      type: 'workout',
      reminder: true,
      isRecurring: true
    });

    // 7. Afternoon Snack
    dayTasks.push({
      id: `t_${day}_snack`,
      t: minutesToTime(snackMins),
      act: 'Afternoon Fuel',
      instr: 'Chana Sattu Drink / Sprouts / Almonds + Green Tea',
      rule: 'Steady Energy',
      type: 'meal',
      reminder: true,
      isRecurring: true
    });

    // 8. Evening Workout (if preferred in evening)
    if (isWorkoutDay && profile.preferredWorkoutTime !== 'morning') {
      dayTasks.push({
        id: `t_${day}_workout`,
        t: minutesToTime(workoutMins),
        act: 'Evening Workout / Gym',
        instr: 'Resistance Training / Cardio (45-60 mins)',
        rule: 'Last Set = DROP SET / Progressive Overload',
        type: 'workout',
        reminder: true,
        isRecurring: true
      });
    }

    // 9. Dinner
    dayTasks.push({
      id: `t_${day}_dinner`,
      t: minutesToTime(dinnerMins),
      act: 'Dinner',
      instr: 'Paneer Bhurji / Tofu / Dal + Stir-Fry Veggies',
      rule: 'Light & High-Protein',
      type: 'meal',
      reminder: true,
      isRecurring: true
    });

    // 10. Post-dinner walk
    dayTasks.push({
      id: `t_${day}_walk2`,
      t: minutesToTime(dinnerMins + 25),
      act: 'Digestive Walk',
      instr: '10 Mins Relaxed Walking',
      rule: 'Aids Digestion & Lowers Glucose Peak',
      type: 'workout',
      reminder: true,
      isRecurring: true
    });

    // 11. Sleep
    dayTasks.push({
      id: `t_${day}_sleep`,
      t: minutesToTime(sleepMins),
      act: 'Sleep & Recovery',
      instr: 'Lights Out in Pitch Black Room (Screens Away)',
      rule: '7.5 - 8 Hours Target for Hormone Reset',
      type: 'hack',
      reminder: true,
      isRecurring: true
    });

    // Sort chronologically
    dayTasks.sort((a, b) => timeToMinutes(a.t) - timeToMinutes(b.t));
    newSchedule[day] = dayTasks;
  });

  return newSchedule;
}
