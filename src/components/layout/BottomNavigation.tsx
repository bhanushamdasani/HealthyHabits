import React, { useState, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { haptics } from '../../utils/haptics';

export const BottomNavigation: React.FC = () => {
  const { currentView, setCurrentView } = usePlanner();
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.scrollTop) return;
      const st = target.scrollTop;
      if (Math.abs(st - lastScroll) > 25) {
        if (st > lastScroll && st > 80) {
          setIsCompact(true);
        } else {
          setIsCompact(false);
        }
        lastScroll = st;
      }
    };

    const containers = document.querySelectorAll('.slider-page');
    containers.forEach((c) => c.addEventListener('scroll', handleScroll, { passive: true }));

    return () => {
      containers.forEach((c) => c.removeEventListener('scroll', handleScroll));
    };
  }, [currentView]);

  const navItems = [
    { id: 'dashboard', label: 'Rituals', icon: '🔥' },
    { id: 'diet', label: 'Diet', icon: '🥗' },
    { id: 'workout', label: 'Workout', icon: '💪' },
    { id: 'analytics', label: 'Insights', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ] as const;

  const handleNavClick = (id: typeof currentView) => {
    haptics.tap();
    if (isCompact) {
      setIsCompact(false);
    }
    setCurrentView(id);
  };

  return (
    <nav
      className="ios-tab-bar"
      aria-label="Main Navigation"
      style={{
        width: '100%',
        flexShrink: 0,
        background: 'var(--surface-solid)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderTop: '1px solid var(--border-glass)',
        paddingTop: '6px',
        paddingBottom: 'max(10px, env(safe-area-inset-bottom, 10px))',
        paddingLeft: '8px',
        paddingRight: '8px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 -4px 25px rgba(0, 0, 0, 0.18)',
        zIndex: 1000,
        position: 'relative'
      }}
    >
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
            style={{
              flex: 1,
              minWidth: 0,
              background: isActive ? 'var(--primary-dim)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--text-2)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '6px 4px',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span
              className="nav-icon"
              style={{
                fontSize: '1.3rem',
                display: 'inline-block',
                transform: isActive ? 'scale(1.12)' : 'scale(1)',
                animation: isActive ? 'iconBounce 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {item.icon}
            </span>
            <span
              className="nav-label"
              style={{
                fontSize: '0.68rem',
                fontWeight: isActive ? 800 : 600,
                letterSpacing: '-0.2px'
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
