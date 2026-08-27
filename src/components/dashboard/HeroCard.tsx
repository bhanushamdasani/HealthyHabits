import React, { useState, useEffect, useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { useTheme } from '../../context/ThemeContext';
import { formatDateKey, DAYS_OF_WEEK } from '../../utils/dateUtils';
import { timeToMinutes } from '../../utils/timeUtils';
import { getRandomQuote } from '../../data/quotes';
import { haptics } from '../../utils/haptics';

export const HeroCard: React.FC = () => {
  const { store, viewedDate, toggleTask, showIsland, triggerConfettiAnimation } = usePlanner();
  const { theme } = useTheme();
  const [isBreathing, setIsBreathing] = useState(false);
  const [quote, setQuote] = useState('');
  const [, setTicker] = useState(0);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  // 60-second ticker to update live countdowns
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

  // Completion calculation
  const doneCount = combinedTasks.filter((t) => store.history[`${dateKey}-${t.id}`]).length;
  const pct = combinedTasks.length > 0 ? Math.round((doneCount / combinedTasks.length) * 100) : 0;
  const strokeOffset = 125.6 - (125.6 * pct) / 100;

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

  let heroBadge = '⏱️ Next Ritual';
  let heroTime = '--:--';
  let heroTitle = 'Syncing Timeline...';
  let heroDesc = 'Organizing today’s metabolic schedule';
  let countdownText = '';

  if (!isViewingToday) {
    heroBadge = '📅 Calendar Log';
    heroTime = `${doneCount}/${combinedTasks.length}`;
    heroTitle = pct === 100 ? 'Day Fully Completed' : 'Historical Overview';
    heroDesc = 'Inspecting habits and protocol records for this date.';
  } else if (activeTask) {
    heroBadge = '⏱️ Next Ritual';
    heroTime = activeTask.t;
    heroTitle = activeTask.act;
    heroDesc = activeTask.instr;
    const diff = timeToMinutes(activeTask.t) - nowMins;
    if (diff > 0) {
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      countdownText = h > 0 ? `In ${h}h ${m}m` : `In ${m}m`;
    }
  } else if (pct === 100) {
    heroBadge = '🏆 Day Complete';
    heroTime = '100%';
    heroTitle = 'Daily Protocol Accomplished';
    heroDesc = 'All scheduled tasks completed. Deep nocturnal restoration awaits.';
  } else {
    heroBadge = '🌙 Wind-Down';
    heroTime = store.user.sleepTime || '10:00 PM';
    heroTitle = 'Evening Rest Window';
    heroDesc = 'Prepare for restorative sleep to recharge your metabolic rhythm.';
  }

  const isLight = theme === 'light';

  return (
    <div
      style={{
        margin: '0 20px 14px',
        background: isLight
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(244, 247, 252, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(28, 28, 30, 0.95) 0%, rgba(14, 16, 24, 0.95) 100%)',
        backdropFilter: 'blur(35px) saturate(190%)',
        WebkitBackdropFilter: 'blur(35px) saturate(190%)',
        border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid var(--border-glass)',
        boxShadow: isLight
          ? '0 12px 35px rgba(0, 0, 0, 0.06), inset 0 1px 1px #ffffff'
          : '0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        borderRadius: '28px',
        padding: '20px 22px',
        color: isLight ? '#111827' : '#ffffff',
        position: 'relative',
        transition: 'all 0.35s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, paddingRight: '12px' }}>
          {/* Status Badge */}
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px'
            }}
          >
            <span>{heroBadge}</span>
            {countdownText && (
              <span
                style={{
                  background: 'var(--primary-dim)',
                  color: 'var(--primary)',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: '0.68rem',
                  fontWeight: 800
                }}
              >
                {countdownText}
              </span>
            )}
          </div>

          {/* Time / Status Headline */}
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              fontVariantNumeric: 'tabular-nums',
              color: isLight ? '#111827' : '#ffffff'
            }}
          >
            {heroTime}
          </div>

          <div
            style={{
              fontWeight: 800,
              fontSize: '1.05rem',
              color: isLight ? '#1f2937' : '#ffffff',
              marginTop: '2px'
            }}
          >
            {heroTitle}
          </div>

          <div
            style={{
              fontSize: '0.82rem',
              color: isLight ? '#4b5563' : 'rgba(255, 255, 255, 0.65)',
              marginTop: '3px',
              lineHeight: 1.4
            }}
          >
            {heroDesc}
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div
          onClick={() => {
            haptics.tap();
            setIsBreathing((b) => !b);
          }}
          style={{
            position: 'relative',
            width: '68px',
            height: '68px',
            flexShrink: 0,
            cursor: 'pointer'
          }}
          title="Tap to toggle breathing guide"
        >
          <svg width="68" height="68" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke={isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)'}
              strokeWidth="4"
            />
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke={isBreathing ? '#34C759' : 'var(--primary)'}
              strokeWidth="4"
              strokeDasharray="125.6"
              strokeDashoffset={isBreathing ? 0 : strokeOffset}
              strokeLinecap="round"
              transform="rotate(-90 22 22)"
              style={{
                transition: isBreathing ? 'none' : 'stroke-dashoffset 0.6s ease',
                animation: isBreathing ? 'mindfulPacer 8s ease-in-out infinite' : 'none'
              }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: isBreathing ? '1.2rem' : '0.85rem',
              fontWeight: 900,
              color: isLight ? '#111827' : '#ffffff'
            }}
          >
            {isBreathing ? '🧘' : `${pct}%`}
          </div>
        </div>
      </div>

      {/* Quote / Fast Complete Footer */}
      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: isLight ? '#6b7280' : 'rgba(255, 255, 255, 0.6)',
            fontStyle: 'italic',
            flex: 1,
            lineHeight: 1.3
          }}
        >
          "{quote}"
        </div>

        {activeTask && !store.history[`${dateKey}-${activeTask.id}`] && (
          <button
            onClick={() => {
              haptics.medium();
              toggleTask(activeTask.id);
            }}
            style={{
              background: 'var(--primary)',
              border: 'none',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              marginLeft: '12px',
              flexShrink: 0,
              boxShadow: '0 4px 12px var(--primary-dim)',
              transition: 'all 0.2s ease'
            }}
          >
            ✓ Complete
          </button>
        )}
      </div>
    </div>
  );
};
