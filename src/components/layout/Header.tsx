import React, { useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { useTheme } from '../../context/ThemeContext';
import { calculateStreak } from '../../services/streakEngine';
import { haptics } from '../../utils/haptics';

export const Header: React.FC = () => {
  const { store, currentView, showIsland } = usePlanner();
  const { theme, toggleTheme } = useTheme();

  const streakInfo = useMemo(() => {
    return calculateStreak(
      store.history,
      store.schedule,
      store.dayModes,
      store.dateTasks,
      0
    );
  }, [store.history, store.schedule, store.dayModes, store.dateTasks]);

  const userName = store.user.name && store.user.name !== 'Warrior' ? store.user.name : '';

  const now = new Date();
  const hour = now.getHours();
  let timeGreeting = 'Daily Rituals';
  if (userName) {
    if (hour >= 5 && hour < 12) timeGreeting = `Good morning, ${userName}`;
    else if (hour >= 12 && hour < 17) timeGreeting = `Good afternoon, ${userName}`;
    else timeGreeting = `Good evening, ${userName}`;
  }

  const viewHeaders: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: timeGreeting, subtitle: '✨ HealthyHabits' },
    diet: { title: '15-Day Diet Protocol', subtitle: 'HealthyHabits • Nutrition' },
    workout: { title: 'Hypertrophy Training', subtitle: 'HealthyHabits • Workout' },
    analytics: { title: 'Health Insights', subtitle: 'HealthyHabits • Analytics' },
    settings: { title: 'Preferences & Clock', subtitle: 'HealthyHabits • Settings' }
  };

  const currentHeader = viewHeaders[currentView] || { title: 'Daily Rituals', subtitle: '✨ HealthyHabits' };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
        width: '100%',
        background: 'var(--nav-glass)',
        backdropFilter: 'blur(35px) saturate(190%)',
        WebkitBackdropFilter: 'blur(35px) saturate(190%)',
        padding: 'max(12px, env(safe-area-inset-top, 12px)) clamp(14px, 4vw, 20px) 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-glass)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div>
        {/* Brand Tagline */}
        <div
          className="brand-gradient"
          style={{
            fontSize: '0.75rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {currentHeader.subtitle}
        </div>

        {/* View Title */}
        <h1
          style={{
            margin: 0,
            fontSize: '1.35rem',
            fontWeight: 900,
            letterSpacing: '-0.4px',
            color: 'var(--text-1)'
          }}
        >
          {currentHeader.title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Streak Flame Badge */}
        <div
          onClick={() => {
            haptics.tap();
            showIsland(
              streakInfo.streak > 0
                ? `🔥 ${streakInfo.streak}-Day HealthyHabits Streak Active!`
                : 'Complete today’s rituals to build your streak!'
            );
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 900,
            fontSize: '0.85rem',
            background: 'var(--surface-2)',
            border: streakInfo.streak > 0 ? '1px solid rgba(255, 149, 0, 0.35)' : '1px solid var(--border-glass)',
            padding: '7px 13px',
            borderRadius: '16px',
            boxShadow: streakInfo.streak > 0 ? '0 0 14px rgba(255, 149, 0, 0.2)' : '0 2px 10px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span
            style={{
              fontSize: '1.05rem',
              display: 'inline-block',
              animation: streakInfo.streak > 0 ? 'flameFlicker 3s ease-in-out infinite' : 'none'
            }}
          >
            🔥
          </span>
          <span style={{ color: streakInfo.streak > 0 ? '#FF9500' : 'var(--text-1)' }}>
            {streakInfo.streak}d
          </span>
        </div>

        {/* Dark/Light Mode Switcher */}
        <button
          onClick={() => {
            haptics.tap();
            toggleTheme();
          }}
          aria-label="Toggle Dark and Light Theme"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.05rem',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            transition: 'transform 0.2s ease'
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
