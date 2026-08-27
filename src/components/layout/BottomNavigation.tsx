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
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        borderTop: '0.5px solid var(--border-glass)',
        /* top content: icon + label = ~44px, bottom: only the real safe-area */
        paddingTop: '6px',
        paddingBottom: 'calc(6px + env(safe-area-inset-bottom, 0px))',
        paddingLeft: '4px',
        paddingRight: '4px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        boxShadow: '0 -0.5px 0 var(--border-glass)',
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
              background: 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--text-2)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '2px',
              padding: '4px 2px 2px',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
          >
            <span
              style={{
                fontSize: '1.5rem',
                lineHeight: 1,
                display: 'block',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                animation: isActive ? 'iconBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '-0.1px',
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
