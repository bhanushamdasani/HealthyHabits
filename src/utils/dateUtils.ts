import { DayName } from '../types';

export const DAYS_OF_WEEK: DayName[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const ORDERED_WEEKDAYS: DayName[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/**
 * Returns formatted date key: "YYYY-MM-DD"
 */
export function formatDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Parses "YYYY-MM-DD" string into local Date object at noon to prevent timezone date shifting.
 */
export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

/**
 * Gets DayName ('mon'..'sun') from Date
 */
export function getDayName(d: Date): DayName {
  return DAYS_OF_WEEK[d.getDay()];
}

/**
 * Computes human readable relative label ("Today", "Yesterday", "Tomorrow", or "Mon, 27 Aug")
 */
export function getRelativeDateLabel(viewedDate: Date): { statusLabel: string; dateLabel: string; isToday: boolean } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const check = new Date(viewedDate);
  check.setHours(0, 0, 0, 0);
  const diffDays = Math.round((check.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let statusLabel = '';
  if (diffDays === 0) statusLabel = 'Today';
  else if (diffDays === -1) statusLabel = 'Yesterday';
  else if (diffDays === 1) statusLabel = 'Tomorrow';
  else statusLabel = viewedDate.toLocaleDateString('en-GB', { weekday: 'short' });

  const dateLabel = viewedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return {
    statusLabel,
    dateLabel,
    isToday: diffDays === 0
  };
}

/**
 * Adds offset days to a date object without mutating original
 */
export function addDays(date: Date, offset: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}
