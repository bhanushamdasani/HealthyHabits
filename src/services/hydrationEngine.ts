import { WaterLogEntry } from '../types';

export interface HydrationResult {
  score: string;
  label: 'OPTIMAL' | 'MODERATE' | 'INEFFICIENT' | 'STARTED' | 'CHUGGED' | 'NO INTAKE';
  color: string;
  advice: string;
}

/**
 * Calculates cellular hydration efficiency score.
 * Evaluates spacing between hydration sessions, penalizing large intervals (>4h) and high single-session chugs (>1L).
 */
export function calculateHydrationEfficiency(
  waterLogs: WaterLogEntry[] = [],
  waterTotal: number = 0
): HydrationResult {
  const total = waterTotal || 0;

  if (!waterLogs || waterLogs.length === 0) {
    return {
      score: '0%',
      label: 'NO INTAKE',
      color: 'var(--text-2)',
      advice: 'Log water to begin tracking cellular absorption efficiency. Aim for 3L spread across the day.'
    };
  }

  // 1. Convert logs to minutes and sort
  const logsWithMins = waterLogs
    .map((log) => {
      const [h, m] = log.time.split(':').map(Number);
      return { mins: (h || 0) * 60 + (m || 0), amount: log.amount || 250 };
    })
    .sort((a, b) => a.mins - b.mins);

  // 2. Group into sessions (within 15 minutes of each other)
  const sessions: { mins: number; amount: number }[] = [];
  logsWithMins.forEach((log) => {
    if (sessions.length === 0) {
      sessions.push({ mins: log.mins, amount: log.amount });
    } else {
      const last = sessions[sessions.length - 1];
      if (log.mins - last.mins <= 15) {
        last.amount += log.amount;
      } else {
        sessions.push({ mins: log.mins, amount: log.amount });
      }
    }
  });

  if (sessions.length === 1) {
    const singleVol = sessions[0].amount;
    let score = Math.min(Math.round((total / 3000) * 100), 100);

    let advice = `Good start! You've logged ${(total / 1000).toFixed(1)}L. Spread your next drinks 1–2 hours apart for maximum cellular uptake.`;
    let label: HydrationResult['label'] = 'STARTED';
    let color = '#5AC8FA';

    if (singleVol > 1000) {
      score = Math.max(score - 15, 0);
      label = 'CHUGGED';
      color = '#FF9500';
      advice = `Logged ${(total / 1000).toFixed(1)}L at once. Your kidneys can only absorb ~1L per hour. Next time, space it out!`;
    } else if (total >= 3000) {
      label = 'OPTIMAL';
      color = '#34C759';
    }

    return { score: `${score}%`, label, color, advice };
  }

  let score = 100;
  let deductions = 0;

  for (let i = 1; i < sessions.length; i++) {
    const gap = sessions[i].mins - sessions[i - 1].mins;
    if (gap < 45) {
      deductions += 5;
    } else if (gap > 240) {
      deductions += 10;
    }
  }

  sessions.forEach((s) => {
    if (s.amount > 1000) {
      deductions += 15;
    }
  });

  if (total >= 3000) {
    score += 10;
  } else if (total < 1500) {
    deductions += 20;
  } else if (total < 2500) {
    deductions += 10;
  }

  score = Math.max(Math.min(score - deductions, 100), 0);

  let label: HydrationResult['label'] = 'OPTIMAL';
  let color = '#34C759';
  let advice = `Excellent! ${(total / 1000).toFixed(1)}L logged with great spacing. Your cells are well hydrated.`;

  if (score < 50) {
    label = 'INEFFICIENT';
    color = '#FF3B30';
    advice = 'Cellular absorption is low. Try spacing drinks (250ml every 1.5–2 hours) instead of large intervals.';
  } else if (score < 80) {
    label = 'MODERATE';
    color = 'var(--primary)';
    advice = `Good spacing, but total volume is ${(total / 1000).toFixed(1)}L. Add a few more spaced cups to hit 3L.`;
  }

  return { score: `${score}%`, label, color, advice };
}
