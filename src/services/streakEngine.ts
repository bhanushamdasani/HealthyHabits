import { WeeklySchedule, ScheduleTask, DayMode } from '../types';
import { formatDateKey, DAYS_OF_WEEK } from '../utils/dateUtils';

export interface StreakResult {
  streak: number;
  bestStreak: number;
  perfectDays: number;
}

/**
 * Calculates current streak and perfect days by inspecting past 365 days.
 * - Silent days are skipped without breaking streaks.
 * - Days with >= 80% task completion count as streak days.
 */
export function calculateStreak(
  history: Record<string, boolean>,
  schedule: WeeklySchedule,
  dayModes: Record<string, DayMode>,
  dateTasks: Record<string, ScheduleTask[]> = {},
  storedBestStreak: number = 0
): StreakResult {
  let streak = 0;
  let perfectDays = 0;
  let checkTime = new Date().setHours(12, 0, 0, 0);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const todayKey = formatDateKey(new Date());

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(checkTime);
    const k = formatDateKey(checkDate);
    const mode = dayModes[k] || 'active';

    // Silent day does not penalize streak
    if (mode === 'silent') {
      checkTime -= oneDayMs;
      continue;
    }

    const dayName = DAYS_OF_WEEK[checkDate.getDay()];
    const recurringTasks = schedule[dayName] || [];
    const dateSpecificTasks = dateTasks[k] || [];
    const combined = [...recurringTasks, ...dateSpecificTasks];

    if (combined.length === 0) {
      checkTime -= oneDayMs;
      continue;
    }

    let done = 0;
    combined.forEach((task) => {
      if (history[`${k}-${task.id}`]) {
        done++;
      }
    });

    const score = (done / combined.length) * 100;

    if (score >= 80) {
      streak++;
      perfectDays++;
      checkTime -= oneDayMs;
    } else {
      // If checking today and it's not yet 80%, allow streak from yesterday to persist
      if (k === todayKey && score < 80) {
        checkTime -= oneDayMs;
      } else {
        break;
      }
    }
  }

  const bestStreak = Math.max(streak, storedBestStreak);
  return { streak, bestStreak, perfectDays };
}
