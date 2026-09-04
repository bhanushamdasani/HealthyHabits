import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { haptics } from '../../utils/haptics';

export const BottomNavigation: React.FC = () => {
  const { currentView, setCurrentView } = usePlanner();

  const navItems = [
    { id: 'dashboard', label: 'Rituals', icon: '🔥' },
    { id: 'diet', label: 'Diet', icon: '🥗' },
    { id: 'workout', label: 'Workout', icon: '💪' },
    { id: 'analytics', label: 'Insights', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ] as const;

  const handleNavClick = (id: typeof currentView) => {
    haptics.tap();
    setCurrentView(id);
  };

  return (
    <nav
      className="ios-tab-bar"
      aria-label="Main Navigation"
      style={{
        width: '100%',
        flexShrink: 0,
        height: '56px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: '12px',
        paddingRight: '12px',
        background: 'var(--surface-solid)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderTop: '1px solid var(--border-glass)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        zIndex: 1000,
        position: 'relative'
      }}
    >
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavClick(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
            style={{
              flex: 1,
              height: '44px',
              minWidth: 0,
              background: isActive ? 'var(--primary-dim)' : 'transparent',
              borderRadius: '14px',
              color: isActive ? 'var(--primary)' : 'var(--text-2)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '4px 0',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <span
              style={{
                fontSize: '1.2rem',
                lineHeight: 1,
                display: 'block',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: isActive ? 800 : 600,
                letterSpacing: '-0.2px',
                lineHeight: 1,
                color: isActive ? 'var(--primary)' : 'var(--text-2)'
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
