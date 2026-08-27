import React from 'react';
import { ScheduleTask, DayMode, TaskType } from '../../types';
import { haptics } from '../../utils/haptics';

interface TaskCardProps {
  task: ScheduleTask;
  isDone: boolean;
  dateKey: string;
  dayMode: DayMode;
  lightDayTypes: TaskType[];
  isLiveActive: boolean;
  onToggle: () => void;
  onDeleteOneOff?: () => void;
  onOpenTaskSupport?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDone,
  dayMode,
  lightDayTypes,
  isLiveActive,
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

  return (
    <div
      className={`task-card task-${task.type} ${isDone ? 'done' : ''} ${muted ? 'muted' : ''} ${
        isLiveActive && !isDone ? 'live-task-glow' : ''
      }`}
      onClick={onToggle}
      style={{
        background: isDone ? 'var(--surface-2)' : 'var(--surface)',
        border: '1px solid var(--border-glass)',
        borderRadius: '24px',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: isDone ? 'none' : 'var(--shadow)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
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
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: isDone ? '2px solid #34C759' : '2px solid var(--border-glass)',
          background: isDone ? '#34C759' : 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: isDone ? '0 0 14px rgba(52, 199, 89, 0.4)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {isDone && <span style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 900 }}>✓</span>}
      </div>

      {/* Task Content Details */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--primary)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {task.t}
          </span>

          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              background: typeConfig.bg,
              color: typeConfig.text,
              padding: '2px 6px',
              borderRadius: '6px'
            }}
          >
            {typeConfig.label}
          </span>

          {muted && <span style={{ fontSize: '0.72rem' }}>🔕</span>}
          {!task.isRecurring && (
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                background: 'rgba(255, 204, 0, 0.2)',
                color: '#FFCC00',
                padding: '2px 6px',
                borderRadius: '6px'
              }}
            >
              Today
            </span>
          )}
        </div>

        <div
          style={{
            fontWeight: 800,
            fontSize: '1.02rem',
            color: 'var(--text-1)',
            marginBottom: '2px',
            textDecoration: isDone ? 'line-through' : 'none',
            opacity: isDone ? 0.65 : 1
          }}
        >
          {task.act}
        </div>

        <div
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-2)',
            lineHeight: 1.35,
            opacity: isDone ? 0.6 : 0.9
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
              padding: '3px 8px',
              borderRadius: '8px',
              marginTop: '6px'
            }}
          >
            💡 {task.rule}
          </div>
        )}
      </div>

      {/* Action / Guide Button */}
      {!task.isRecurring && onDeleteOneOff ? (
        <button
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
            width: '34px',
            height: '34px'
          }}
          aria-label="Delete Task"
        >
          🗑️
        </button>
      ) : onOpenTaskSupport ? (
        <button
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
            width: '34px',
            height: '34px'
          }}
          aria-label="Task Support"
        >
          📖
        </button>
      ) : null}
    </div>
  );
};
