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
      className={`nav-bar ${isCompact ? 'compact-nav' : ''}`}
      onClick={() => {
        if (isCompact) setIsCompact(false);
      }}
      aria-label="Main Navigation"
      style={{
        position: 'absolute',
        bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(calc(100% - 24px), 430px)',
        background: 'rgba(20, 22, 30, 0.88)',
        backdropFilter: 'blur(45px) saturate(200%)',
        WebkitBackdropFilter: 'blur(45px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '34px',
        padding: '5px 6px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.42), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
        zIndex: 1000,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={(e) => {
              if (isCompact) {
                e.stopPropagation();
                setIsCompact(false);
              }
              handleNavClick(item.id);
            }}
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
              padding: '6px clamp(4px, 2vw, 12px)',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span
              className="nav-icon"
              style={{
                fontSize: '1.25rem',
                display: 'inline-block',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                animation: isActive ? 'iconBounce 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {item.icon}
            </span>
            <span
              className="nav-label"
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
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
