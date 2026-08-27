import { describe, it, expect } from 'vitest';
import { calculateStreak } from '../../src/services/streakEngine';
import { defaultSchedule } from '../../src/data/defaultSchedule';
import { formatDateKey, addDays, DAYS_OF_WEEK } from '../../src/utils/dateUtils';

describe('Streak Calculation Engine', () => {
  it('returns 0 streak when no tasks completed', () => {
    const res = calculateStreak({}, defaultSchedule, {}, {}, 0);
    expect(res.streak).toBe(0);
  });

  it('calculates 3-day consecutive streak when >=80% tasks done', () => {
    const history: Record<string, boolean> = {};
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < 3; i++) {
      const d = addDays(today, -i);
      const k = formatDateKey(d);
      const dayName = DAYS_OF_WEEK[d.getDay()];
      const tasks = defaultSchedule[dayName] || [];
      tasks.forEach((t) => {
        history[`${k}-${t.id}`] = true;
      });
    }

    const res = calculateStreak(history, defaultSchedule, {}, {}, 0);
    expect(res.streak).toBe(3);
  });

  it('skips silent mode rest days without breaking streak', () => {
    const history: Record<string, boolean> = {};
    const dayModes: Record<string, 'active' | 'light' | 'silent'> = {};
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    // Day 0: done
    const d0 = today;
    const k0 = formatDateKey(d0);
    const day0 = DAYS_OF_WEEK[d0.getDay()];
    (defaultSchedule[day0] || []).forEach((t) => {
      history[`${k0}-${t.id}`] = true;
    });

    // Day 1: silent rest day
    const d1 = addDays(today, -1);
    const k1 = formatDateKey(d1);
    dayModes[k1] = 'silent';

    // Day 2: done
    const d2 = addDays(today, -2);
    const k2 = formatDateKey(d2);
    const day2 = DAYS_OF_WEEK[d2.getDay()];
    (defaultSchedule[day2] || []).forEach((t) => {
      history[`${k2}-${t.id}`] = true;
    });

    const res = calculateStreak(history, defaultSchedule, dayModes, {}, 0);
    expect(res.streak).toBe(2);
  });
});
