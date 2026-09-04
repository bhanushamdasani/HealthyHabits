import React, { useEffect, useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { useTheme } from '../../context/ThemeContext';
import { formatDateKey, DAYS_OF_WEEK } from '../../utils/dateUtils';
import { timeToMinutes } from '../../utils/timeUtils';
import { calculateStreak } from '../../services/streakEngine';
import { haptics } from '../../utils/haptics';

export const HeroCard: React.FC = () => {
  const { store, viewedDate, toggleTask, showIsland, triggerConfettiAnimation } = usePlanner();
  const { theme } = useTheme();

  const dateKey = formatDateKey(viewedDate);
  const todayKey = formatDateKey(new Date());
  const isViewingToday = dateKey === todayKey;

  const dayName = DAYS_OF_WEEK[viewedDate.getDay()];
  const recurringTasks = store.schedule[dayName] || [];
  const oneOffTasks = store.dateTasks[dateKey] || [];
  const combinedTasks = useMemo(() => {
    const list = [...recurringTasks, ...oneOffTasks];
    return list.sort((a, b) => timeToMinutes(a.t) - timeToMinutes(b.t));
  }, [recurringTasks, oneOffTasks]);

  const streakInfo = useMemo(() => {
    return calculateStreak(
      store.history,
      store.schedule,
      store.dayModes,
      store.dateTasks,
      0
    );
  }, [store.history, store.schedule, store.dayModes, store.dateTasks]);

  // Completion calculation
  const doneCount = combinedTasks.filter((t) => store.history[`${dateKey}-${t.id}`]).length;
  const pct = combinedTasks.length > 0 ? Math.round((doneCount / combinedTasks.length) * 100) : 0;

  // Trigger celebration on 100%
  useEffect(() => {
    if (pct === 100 && combinedTasks.length > 0 && isViewingToday) {
      triggerConfettiAnimation();
      showIsland('🎉 All Daily Rituals Completed!');
      haptics.triumph();
    }
  }, [pct, combinedTasks.length, isViewingToday, triggerConfettiAnimation, showIsland]);

  // Find active / next upcoming task
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  let activeTask = null;
  for (const t of combinedTasks) {
    if (timeToMinutes(t.t) > nowMins) {
      activeTask = t;
      break;
    }
  }

  let heroBadge = 'Next Ritual';
  let heroTime = activeTask ? activeTask.t : '--:--';
  let heroTitle = activeTask ? activeTask.act : 'Daily Protocol Done';
  let heroDesc = activeTask ? activeTask.instr : 'All scheduled tasks completed for today.';

  if (!isViewingToday) {
    heroBadge = 'Calendar Record';
    heroTime = `${doneCount}/${combinedTasks.length}`;
    heroTitle = pct === 100 ? 'Day Fully Completed' : 'Daily Progress';
    heroDesc = 'Inspecting historical log for this date.';
  } else if (!activeTask && pct === 100) {
    heroBadge = 'Completed';
    heroTime = '100%';
    heroTitle = 'Protocol Accomplished';
    heroDesc = 'All daily rituals achieved. Rest and recover.';
  } else if (!activeTask) {
    heroBadge = 'Wind-Down';
    heroTime = store.user.sleepTime || '10:00 PM';
    heroTitle = 'Evening Rest Window';
    heroDesc = 'Prepare for restorative nocturnal sleep.';
  }

  const isLight = theme === 'light';

  return (
    <div
      style={{
        margin: '0 clamp(12px, 3.5vw, 18px) 10px',
        background: isLight
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 248, 252, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(28, 30, 40, 0.95) 0%, rgba(16, 18, 26, 0.95) 100%)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid var(--border-glass)',
        boxShadow: isLight
          ? '0 8px 24px rgba(0, 0, 0, 0.04)'
          : '0 12px 30px rgba(0, 0, 0, 0.35)',
        borderRadius: '20px',
        padding: '14px 16px',
        color: isLight ? '#111827' : '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top meta pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: 'var(--primary-dim)',
              padding: '2px 7px',
              borderRadius: '6px'
            }}
          >
            {heroBadge}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isLight ? '#4b5563' : 'var(--text-2)'
            }}
          >
            {heroTime}
          </span>
          {streakInfo.streak > 0 && (
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#FF9500',
                background: 'rgba(255, 149, 0, 0.12)',
                padding: '2px 6px',
                borderRadius: '6px'
              }}
            >
              🔥 {streakInfo.streak}d streak
            </span>
          )}
        </div>

        {/* Headline */}
        <div
          style={{
            fontWeight: 800,
            fontSize: '1rem',
            color: isLight ? '#111827' : '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {heroTitle}
        </div>

        {/* Short Instruction */}
        <div
          style={{
            fontSize: '0.76rem',
            color: isLight ? '#6b7280' : 'var(--text-2)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '1px'
          }}
        >
          {heroDesc}
        </div>
      </div>

      {/* Right side: Progress Ring / Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {activeTask && isViewingToday && !store.history[`${dateKey}-${activeTask.id}`] && (
          <button
            type="button"
            onClick={() => {
              haptics.medium();
              toggleTask(activeTask.id);
            }}
            style={{
              background: 'var(--primary)',
              border: 'none',
              color: '#ffffff',
              padding: '7px 12px',
              borderRadius: '12px',
              fontSize: '0.74rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 3px 10px var(--primary-dim)',
              transition: 'transform 0.15s ease'
            }}
          >
            ✓ Done
          </button>
        )}

        {/* Circular Progress Gauge */}
        <div
          style={{
            position: 'relative',
            width: '46px',
            height: '46px',
            flexShrink: 0
          }}
        >
          <svg width="46" height="46" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke={isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'}
              strokeWidth="3.5"
            />
            <circle
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke={pct === 100 ? '#34C759' : 'var(--primary)'}
              strokeWidth="3.5"
              strokeDasharray="119.4"
              strokeDashoffset={119.4 - (119.4 * pct) / 100}
              strokeLinecap="round"
              transform="rotate(-90 22 22)"
              style={{
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '0.72rem',
              fontWeight: 900,
              color: isLight ? '#111827' : '#ffffff'
            }}
          >
            {pct}%
          </div>
        </div>
      </div>
    </div>
  );
};
