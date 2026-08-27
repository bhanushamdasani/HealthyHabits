import React, { useState, useEffect } from 'react';
import { soundService } from '../../services/soundService';
import { haptics } from '../../utils/haptics';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)';

export const BreathingModal: React.FC<BreathingModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [sessionSeconds, setSessionSeconds] = useState(120); // 2 minute session
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setSessionSeconds(120);
      return;
    }
    setIsActive(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isActive || !isOpen) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Cycle to next phase (4s Box Breathing)
          setPhase((currentPhase) => {
            if (currentPhase === 'Inhale') {
              soundService.playSuccessChime();
              haptics.medium();
              return 'Hold (Full)';
            }
            if (currentPhase === 'Hold (Full)') {
              haptics.tap();
              return 'Exhale';
            }
            if (currentPhase === 'Exhale') {
              soundService.playSuccessChime();
              haptics.medium();
              return 'Hold (Empty)';
            }
            haptics.tap();
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });

      setSessionSeconds((s) => {
        if (s <= 1) {
          setIsActive(false);
          haptics.triumph();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isOpen]);

  if (!isOpen) return null;

  const isExpanding = phase === 'Inhale' || phase === 'Hold (Full)';
  const mins = Math.floor(sessionSeconds / 60);
  const secs = sessionSeconds % 60;

  return (
    <>
      <div className="sheet-backdrop active" onClick={onClose} style={{ zIndex: 4000 }} />
      <div
        className="bottom-sheet active"
        style={{
          zIndex: 4100,
          background: 'rgba(15, 18, 28, 0.95)',
          backdropFilter: 'blur(50px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          textAlign: 'center',
          padding: '24px 20px 38px'
        }}
      >
        <div className="sheet-drag-handle" style={{ marginBottom: '14px' }} />

        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          4-4-4-4 Box Breathing Session
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 6px' }}>
          Parasympathetic Reset
        </h3>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', marginBottom: '24px' }}>
          Remaining Time: <strong>{mins}:{String(secs).padStart(2, '0')}</strong>
        </div>

        {/* Dynamic Concentric Breathing Aura Circle */}
        <div
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            margin: '0 auto 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Outer Ripple */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
              transform: isExpanding ? 'scale(1.25)' : 'scale(0.85)',
              opacity: isExpanding ? 0.8 : 0.25,
              transition: 'all 4s ease-in-out'
            }}
          />

          {/* Main Breathing Core */}
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, #AF52DE 100%)',
              boxShadow: '0 0 45px var(--primary-glow), inset 0 1px 2px rgba(255,255,255,0.4)',
              transform: isExpanding ? 'scale(1.18)' : 'scale(0.82)',
              transition: 'all 4s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.3px' }}>
              {phase}
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '2px' }}>
              {secondsLeft}s
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', maxWidth: '320px', margin: '0 auto 20px', lineHeight: 1.4 }}>
          Focus purely on your breath. Stimulates the vagus nerve and clears cortisol before your next ritual block.
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={() => {
              haptics.tap();
              setIsActive(!isActive);
            }}
            style={{ flex: 1 }}
          >
            {isActive ? '⏸️ Pause' : '▶️ Resume'}
          </button>
          <button className="btn-primary" onClick={onClose} style={{ flex: 1 }}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};
