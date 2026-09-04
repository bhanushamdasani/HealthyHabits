/**
 * Converts any 12-hour or 24-hour time string ("08:30 AM", "8:30pm", "14:30", "22:00")
 * to total minutes from midnight (0..1439).
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const str = timeStr.trim();
  if (!str) return 0;

  // 1. Check for 12-hour format with AM/PM (e.g. "08:30 AM", "8:30pm", "12:00 am")
  const match12 = str.match(/^(\d{1,2}):(\d{2})\s*([ap]m)$/i);
  if (match12) {
    let h = parseInt(match12[1], 10);
    const m = parseInt(match12[2], 10) || 0;
    const period = match12[3].toUpperCase();

    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;

    return ((h % 24) * 60 + m) % 1440;
  }

  // 2. Check for 24-hour format (e.g. "14:30", "08:30", "0:00", "23:59")
  const match24 = str.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const h = parseInt(match24[1], 10);
    const m = parseInt(match24[2], 10) || 0;
    return ((h % 24) * 60 + m) % 1440;
  }

  return 0;
}

/**
 * Converts minutes from midnight to a standard 12-hour formatted time string ("08:30 AM").
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
 * Converts any time representation (24-hour "22:30", 12-hour "10:30 PM", or minutes)
 * to standard 12-hour time ("10:30 PM").
 */
export function formatTime12h(timeInput: string | number): string {
  if (timeInput === undefined || timeInput === null || timeInput === '') return '--:--';

  if (typeof timeInput === 'number') {
    return minutesToTime(timeInput);
  }

  const str = String(timeInput).trim();
  if (str === '--' || str === '--:--') return '--:--';

  const mins = timeToMinutes(str);
  return minutesToTime(mins);
}

/**
 * Converts any time representation to standard 24-hour "HH:MM" (for HTML <input type="time" />).
 */
export function formatTime24h(timeInput: string | number): string {
  if (timeInput === undefined || timeInput === null || timeInput === '') return '08:00';

  const mins = typeof timeInput === 'number' ? timeInput : timeToMinutes(String(timeInput));
  const normalized = ((mins % 1440) + 1440) % 1440;
  const h24 = Math.floor(normalized / 60);
  const m = normalized % 60;

  return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Calculates sleep duration in hours from 12h or 24h bedtime and waketime strings.
 */
export function calculateSleepDurationHours(bedtime: string, waketime: string): number {
  if (!bedtime || !waketime) return 8.0;

  const bedMins = timeToMinutes(bedtime);
  let wakeMins = timeToMinutes(waketime);

  if (wakeMins <= bedMins) {
    wakeMins += 1440; // Crosses midnight into next day
  }

  const diffMins = wakeMins - bedMins;
  const hours = diffMins / 60;
  return isNaN(hours) ? 8.0 : Math.round(hours * 10) / 10;
}

/**
 * Calculates milliseconds from current time until a scheduled time today.
 */
export function msUntilTime(timeStr: string): number {
  const targetMins = timeToMinutes(timeStr);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const nowSecs = now.getSeconds();
  const diffMins = targetMins - nowMins;
  return (diffMins * 60 - nowSecs) * 1000;
}

/**
 * Helper to compute live status for a scheduled meal/activity time on the viewed date.
 */
export function getTimeWindowStatus(timeStr: string, isToday: boolean): {
  isCurrent: boolean;
  isPast: boolean;
  isUpcoming: boolean;
  badgeText: string;
} {
  if (!isToday || !timeStr) {
    return { isCurrent: false, isPast: false, isUpcoming: false, badgeText: '' };
  }

  const targetMins = timeToMinutes(timeStr);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const diff = targetMins - nowMins;

  // Window is current if within 45 mins before or 30 mins after scheduled time
  const isCurrent = diff <= 15 && diff >= -45;
  const isPast = diff < -45;
  const isUpcoming = diff > 15;

  let badgeText = '';
  if (isCurrent) {
    badgeText = '🔥 Active Window';
  } else if (isUpcoming) {
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    badgeText = h > 0 ? `In ${h}h ${m}m` : `In ${m}m`;
  } else {
    badgeText = 'Past Window';
  }

  return { isCurrent, isPast, isUpcoming, badgeText };
}
