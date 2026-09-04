import { SleepLogEntry } from '../types';
import { formatDateKey } from '../utils/dateUtils';
import { timeToMinutes } from '../utils/timeUtils';

export interface CircadianResult {
  score: number | string;
  label: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'IRREGULAR' | 'CALC' | 'N/A';
  color: string;
  advice: string;
}

/**
 * Computes circadian sleep consistency score based on bedtime variance (standard deviation in minutes) over 7-14 days.
 */
export function calculateCircadianConsistency(
  sleepLogs: Record<string, SleepLogEntry>
): CircadianResult {
  if (!sleepLogs || Object.keys(sleepLogs).length === 0) {
    return {
      score: '--',
      label: 'N/A',
      color: 'var(--text-2)',
      advice: 'Log sleep times to analyze consistency.'
    };
  }

  const bedtimes: number[] = [];
  const d = new Date();

  for (let i = 0; i < 14; i++) {
    const k = formatDateKey(d);
    const log = sleepLogs[k];
    if (log && log.bedtime) {
      const minsFromMidnight = timeToMinutes(log.bedtime);
      if (minsFromMidnight > 0 || log.bedtime.includes('00:') || log.bedtime.includes('12:00 AM')) {
        // Minutes normalized relative to noon (720 mins) to handle bedtimes spanning midnight (e.g. 10 PM = 1320 -> +12h % 24)
        const minsFromNoon = (minsFromMidnight + 720) % 1440;
        bedtimes.push(minsFromNoon);
      }
    }
    d.setDate(d.getDate() - 1);
  }

  if (bedtimes.length < 3) {
    return {
      score: '--',
      label: 'CALC',
      color: 'var(--text-2)',
      advice: 'Log sleep details for at least 3 days in the Reports tab to calculate sleep consistency.'
    };
  }

  const mean = bedtimes.reduce((a, b) => a + b, 0) / bedtimes.length;
  const variance = bedtimes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / bedtimes.length;
  const stdDevMins = Math.sqrt(variance);

  let score = 100 - stdDevMins / 2;
  score = Math.max(Math.round(score), 0);

  if (stdDevMins <= 30) {
    return {
      score,
      label: 'EXCELLENT',
      color: '#34C759',
      advice: 'Superb circadian alignment! Your bedtime varies by less than 30 minutes. This promotes high-quality REM recovery.'
    };
  } else if (stdDevMins <= 60) {
    return {
      score,
      label: 'GOOD',
      color: 'var(--primary)',
      advice: 'Solid consistency. Bedtime variance is under 1 hour. Fine-tune your wind-down routine to stabilize it further.'
    };
  } else if (stdDevMins <= 90) {
    return {
      score,
      label: 'MODERATE',
      color: '#FF9500',
      advice: 'Moderate schedule variation. Try keeping screens away 1 hour before sleep to lock in a consistent bedtime.'
    };
  }

  return {
    score,
    label: 'IRREGULAR',
    color: '#FF3B30',
    advice: 'Your sleep schedule has high variance. Shift bedtime to within 30 minutes of your target to avoid circadian desynchronization.'
  };
}

