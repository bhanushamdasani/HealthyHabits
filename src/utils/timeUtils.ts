/**
 * Converts a 12-hour time string ("08:30 AM", "04:00 PM") to total minutes from midnight (0..1439).
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const parts = timeStr.trim().split(' ');
  if (parts.length < 2) return 0;
  const [time, period] = parts;
  const [hStr, mStr] = time.split(':');
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10) || 0;

  if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (period.toUpperCase() === 'AM' && h === 12) h = 0;

  return h * 60 + m;
}

/**
 * Converts minutes from midnight to a 12-hour formatted time string ("08:30 AM").
 */
export function minutesToTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(normalized / 60);
  const m = normalized % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;

  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Converts 24-hour time ("22:30") to 12-hour time ("10:30 PM").
 */
export function formatTime12h(time24: string): string {
  if (!time24) return '--';
  const [hStr, mStr] = time24.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10) || 0;
  if (isNaN(h)) return '--';
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Calculates sleep duration in hours from 12h or 24h bedtime and waketime strings.
 */
export function calculateSleepDurationHours(bedtime: string, waketime: string): number {
  if (!bedtime || !waketime) return 8.0;

  const getMinutes = (str: string): number => {
    const s = String(str).trim();
    if (s.toUpperCase().includes('AM') || s.toUpperCase().includes('PM')) {
      return timeToMinutes(s);
    }
    const [hStr, mStr] = s.split(':');
    const h = parseInt(hStr, 10) || 0;
    const m = parseInt(mStr, 10) || 0;
    return h * 60 + m;
  };

  const bedMins = getMinutes(bedtime);
  let wakeMins = getMinutes(waketime);

  if (wakeMins <= bedMins) {
    wakeMins += 1440; // Crosses midnight into next day
  }

  const diffMins = wakeMins - bedMins;
  const hours = diffMins / 60;
  return isNaN(hours) ? 8.0 : Math.round(hours * 10) / 10;
}

/**
 * Calculates milliseconds from current time until a scheduled 12-hour time today.
 */
export function msUntilTime(timeStr: string): number {
  const targetMins = timeToMinutes(timeStr);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const nowSecs = now.getSeconds();
  const diffMins = targetMins - nowMins;
  return (diffMins * 60 - nowSecs) * 1000;
}
