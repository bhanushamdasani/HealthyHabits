import React from 'react';
import { ScheduleTask, DayMode, TaskType } from '../../types';
import { haptics } from '../../utils/haptics';

interface TaskCardProps {
  task: ScheduleTask;
  isDone: boolean;
  dateKey: string;
  dayMode: DayMode;
  lightDayTypes: TaskType[];
  isUpcoming?: boolean;
  onToggle: () => void;
  onDeleteOneOff?: () => void;
  onOpenTaskSupport?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDone,
  dayMode,
  lightDayTypes,
  isUpcoming = false,
  onToggle,
  onDeleteOneOff,
  onOpenTaskSupport
}) => {
  let muted = false;
  if (dayMode === 'silent' || !task.reminder) muted = true;
  if (dayMode === 'light' && !lightDayTypes.includes(task.type)) muted = true;

  const typeColorMap: Record<TaskType, { bg: string; text: string; label: string }> = {
    meal: { bg: 'rgba(52, 199, 89, 0.15)', text: '#34C759', label: 'Meal' },
    workout: { bg: 'rgba(255, 149, 0, 0.15)', text: '#FF9500', label: 'Workout' },
    hack: { bg: 'rgba(10, 132, 255, 0.15)', text: '#0A84FF', label: 'Bio-Hack' },
    custom: { bg: 'rgba(175, 82, 222, 0.15)', text: '#AF52DE', label: 'Custom' }
  };

  const typeConfig = typeColorMap[task.type] || typeColorMap.hack;
  const isHighlight = isUpcoming && !isDone;

  return (
    <div
      className={`task-card task-${task.type} ${isDone ? 'done' : ''} ${muted ? 'muted' : ''}`}
      onClick={onToggle}
      style={{
        background: isHighlight
          ? 'linear-gradient(135deg, rgba(0, 113, 227, 0.06) 0%, var(--surface) 100%)'
          : isDone
          ? 'var(--surface-2)'
          : 'var(--surface)',
        border: isHighlight
          ? '1.5px solid var(--primary)'
          : '1px solid var(--border-glass)',
        borderRadius: '18px',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: isHighlight
          ? '0 4px 18px var(--primary-dim)'
          : isDone
          ? 'none'
          : 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Spring Tactile Checkbox */}
      <div
        className="check-circle"
        onClick={(e) => {
          e.stopPropagation();
          haptics.medium();
          onToggle();
        }}
        role="checkbox"
        aria-checked={isDone}
        tabIndex={0}
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: isDone
            ? '2px solid #34C759'
            : isHighlight
            ? '2px solid var(--primary)'
            : '2px solid var(--border-glass)',
          background: isDone ? '#34C759' : isHighlight ? 'var(--primary-dim)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: isDone
            ? '0 0 10px rgba(52, 199, 89, 0.3)'
            : isHighlight
            ? '0 0 8px var(--primary-dim)'
            : 'none',
          transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {isDone && <span style={{ color: '#ffffff', fontSize: '0.82rem', fontWeight: 900 }}>✓</span>}
      </div>

      {/* Task Content Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top meta tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isHighlight ? 'var(--primary)' : 'var(--text-1)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {task.t}
          </span>

          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              background: typeConfig.bg,
              color: typeConfig.text,
              padding: '1.5px 6px',
              borderRadius: '5px'
            }}
          >
            {typeConfig.label}
          </span>

          {isHighlight && (
            <span
              style={{
                background: 'var(--primary-dim)',
                color: 'var(--primary)',
                padding: '1.5px 7px',
                borderRadius: '6px',
                fontSize: '0.66rem',
                fontWeight: 800
              }}
            >
              ⚡ Upcoming
            </span>
          )}

          {muted && <span style={{ fontSize: '0.68rem' }}>🔕</span>}
          {!task.isRecurring && (
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                background: 'rgba(255, 204, 0, 0.18)',
                color: '#FFCC00',
                padding: '1.5px 5px',
                borderRadius: '5px'
              }}
            >
              Today
            </span>
          )}
        </div>

        <div
          style={{
            fontWeight: 800,
            fontSize: '0.96rem',
            color: 'var(--text-1)',
            marginBottom: '2px',
            textDecoration: isDone ? 'line-through' : 'none',
            opacity: isDone ? 0.6 : 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {task.act}
        </div>

        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-2)',
            lineHeight: 1.35,
            opacity: isDone ? 0.55 : 0.9,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {task.instr}
        </div>

        {task.rule && !isDone && (
          <div
            style={{
              display: 'inline-block',
              background: 'var(--border)',
              color: 'var(--text-2)',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '6px',
              marginTop: '4px'
            }}
          >
            💡 {task.rule}
          </div>
        )}
      </div>

      {/* Action / Guide Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {!task.isRecurring && onDeleteOneOff ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              haptics.delete();
              onDeleteOneOff();
            }}
            className="action-btn"
            style={{
              borderColor: 'var(--danger)',
              color: 'var(--danger)',
              background: 'transparent',
              borderRadius: '50%',
              width: '30px',
              height: '30px'
            }}
            aria-label="Delete Task"
          >
            🗑️
          </button>
        ) : onOpenTaskSupport ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              haptics.tap();
              onOpenTaskSupport();
            }}
            className="action-btn"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-1)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              fontSize: '0.82rem'
            }}
            aria-label="Task Support"
          >
            📖
          </button>
        ) : null}
      </div>
    </div>
  );
};
