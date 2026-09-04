// ============================================================
// HEALTHYHABITS — DOMAIN TYPES
// ============================================================

export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;
export type UserGoal = 'fat_loss' | 'muscle_gain' | 'weight_gain' | 'maintenance' | 'consistency';
export type LifestyleType = 'student' | 'working_professional' | 'flexible';
export type FemaleHealthConsideration = 'none' | 'pcos' | 'pcod' | 'menstrual_support' | 'iron_focus' | 'other' | 'prefer_not_to_say';
export type DayName = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type DayMode = 'active' | 'light' | 'silent';
export type DayReason = 'Rest' | 'Travel' | 'Sick' | 'Event';
export type TaskType = 'meal' | 'workout' | 'hack' | 'custom';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout';
export type AccentTheme = 'classic' | 'violet' | 'cyan' | 'emerald';

// ------------------------------------------------------------
// User & Biometrics Profile
// ------------------------------------------------------------
export interface UserProfile {
  id?: string;
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  startWeightKg: number;
  currentWeightKg: number;
  goalWeightKg?: number;
  bloodGroup?: string; // Informational only — strictly NOT a nutrition rule
  activityLevel: ActivityLevel;
  lifestyle: LifestyleType;
  goal: UserGoal;
  cookingEffort: 'minimal' | 'moderate' | 'elaborate';
  dislikedFoods: string[];
  allergies: string[];
  femaleConsiderations?: FemaleHealthConsideration[];
  wakeTime: string; // "06:30 AM"
  sleepTime: string; // "10:30 PM"
  workoutDays: DayName[];
  workoutDurationMins: number;
  preferredWorkoutTime: 'morning' | 'afternoon' | 'evening';
  workoutLocation?: 'home' | 'gym';
  accentTheme: AccentTheme;
  chimeEnabled: boolean;
}

// ------------------------------------------------------------
// Schedule & Tasks
// ------------------------------------------------------------
export interface ScheduleTask {
  id: string;
  t: string; // "08:00 AM"
  act: string; // "Breakfast"
  instr: string; // "Moong Dal Chilla (2) + Mint Chutney"
  rule: string; // "+ 1 Multivitamin"
  type: TaskType;
  reminder: boolean;
  isRecurring?: boolean;
  metadata?: {
    mealId?: string;
    workoutId?: string;
    estimatedCalories?: number;
    estimatedProtein?: number;
  };
}

export type WeeklySchedule = Record<DayName, ScheduleTask[]>;

// ------------------------------------------------------------
// Logs, Biometrics & Daily State
// ------------------------------------------------------------
export interface WaterLogEntry {
  time: string; // "08:30"
  amount: number; // 250
}

export interface SleepLogEntry {
  bedtime: string; // "22:30" (24h)
  waketime: string; // "06:30" (24h)
}

export interface DayWeightAndWater {
  am?: number | string;
  pm?: number | string;
  water?: number;
  waterLogs?: WaterLogEntry[];
}

export interface DayLog {
  date: string; // "YYYY-MM-DD"
  mode: DayMode;
  reason?: DayReason;
  weight?: DayWeightAndWater;
  sleep?: SleepLogEntry;
  completedTasks: Record<string, boolean>; // `${date}-${taskId}`: true
  dateTasks?: ScheduleTask[]; // One-off tasks for this specific date
}

// ------------------------------------------------------------
// Nutrition & Curated Food Database
// ------------------------------------------------------------
export interface NutritionEstimate {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
}

export interface CuratedMeal {
  id: string;
  name: string;
  hindiName?: string;
  mealType: MealType;
  primaryProteinSource: 'paneer' | 'tofu' | 'soy_chunks' | 'dal_moong' | 'rajma_chole' | 'besan' | 'curd_dairy' | 'sprouts' | 'sattu_nuts';
  ingredients: { name: string; quantity: string }[];
  servingSize: string;
  estimatedNutrition: NutritionEstimate;
  preparationTimeMins: number;
  recipeInstructions: string[];
  wellnessBenefits: string[];
  safetyNotes?: string[];
  tags: string[];
  suitableForPCOS?: boolean;
  suitableForIronBoost?: boolean;
  alternativeMealIds: string[];
}

export interface DayDietPlan {
  breakfast: CuratedMeal;
  lunch: CuratedMeal;
  dinner: CuratedMeal;
  snacks: CuratedMeal[];
  totalCalories: number;
  totalProtein: number;
}

export interface SevenDayDietPlan {
  id: string;
  generatedAt: string;
  targetDailyCalories: number;
  targetDailyProteinGrams: number;
  days: Record<DayName, DayDietPlan>;
  varietyScore: number;
}

// ------------------------------------------------------------
// Workout & Routine
// ------------------------------------------------------------
export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: 'bodyweight' | 'dumbbells' | 'gym_machines' | 'resistance_bands' | 'none';
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string[];
  techniqueTips: string[];
  commonMistakes?: string[];
  easierAlternative?: string;
  harderProgression?: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  splitType: 'full_body' | 'push_pull_legs' | 'upper_lower' | 'home_calisthenics' | 'cardio_mobility';
  estimatedDurationMins: number;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
}

// ------------------------------------------------------------
// Application State & Sync
// ------------------------------------------------------------
export interface AppDataStore {
  user: UserProfile;
  schedule: WeeklySchedule;
  history: Record<string, boolean>; // `${date}-${taskId}`
  dayModes: Record<string, DayMode>; // `${date}`
  dayReasons: Record<string, DayReason>; // `${date}`
  lightDayTypes: TaskType[];
  weights: Record<string, DayWeightAndWater>; // `${date}`
  sleepLogs: Record<string, SleepLogEntry>; // `${date}`
  dateTasks: Record<string, ScheduleTask[]>; // `${date}`
  dietPlan?: SevenDayDietPlan;
  dateDietOverrides?: Record<string, DayDietPlan>; // `${date}`: custom swapped day plan
  milestonesSeen: Record<number, boolean>;
  lastSyncedAt?: string;
}

export interface SyncQueueItem {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE';
  payload: unknown;
  timestamp: number;
  retryCount: number;
}

export interface Milestone {
  days: number;
  emoji: string;
  title: string;
  subtitle: string;
  desc: string;
}
