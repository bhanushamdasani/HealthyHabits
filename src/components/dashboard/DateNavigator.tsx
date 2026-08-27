import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { getRelativeDateLabel, formatDateKey } from '../../utils/dateUtils';

export const DateNavigator: React.FC = () => {
  const { viewedDate, changeDateByOffset, store } = usePlanner();
  const { statusLabel, dateLabel, isToday } = getRelativeDateLabel(viewedDate);

  const dateKey = formatDateKey(viewedDate);
  const mode = store.dayModes[dateKey] || 'active';
  const icons: Record<string, string> = { active: '🔔', light: '🔅', silent: '🌙' };

  return (
    <div className="date-nav">
      <button
        className="date-arrow"
        onClick={() => changeDateByOffset(-1)}
        aria-label="Previous Day"
      >
        ‹
      </button>

      <div
        className="current-date-display"
        style={{ color: isToday ? 'var(--primary)' : 'var(--text-1)' }}
      >
        <span>
          {statusLabel}, {dateLabel}
        </span>
        <span style={{ fontSize: '1.1rem' }}>{icons[mode]}</span>
      </div>

      <button
        className="date-arrow"
        onClick={() => changeDateByOffset(1)}
        aria-label="Next Day"
      >
        ›
      </button>
    </div>
  );
};
