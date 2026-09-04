import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { formatDateKey } from '../../utils/dateUtils';
import { calculateSleepDurationHours, formatTime12h } from '../../utils/timeUtils';
import { calculateNutritionTargets } from '../../services/personalizationEngine';
import { haptics } from '../../utils/haptics';

interface BentoMetricsGridProps {
  onOpenSleepSheet: () => void;
  onOpenBreathingModal: () => void;
  onOpenOneOffSheet: () => void;
}

export const BentoMetricsGrid: React.FC<BentoMetricsGridProps> = ({
  onOpenSleepSheet,
  onOpenBreathingModal
}) => {
  const { store, viewedDate, updateWater, setCurrentView, showIsland } = usePlanner();

  const dateKey = formatDateKey(viewedDate);
  const weightRecord = store.weights[dateKey] || { am: undefined, water: 0, waterLogs: [] };
  const sleepRecord = store.sleepLogs[dateKey];
  const waterConsumed = weightRecord.water || 0;
  const waterTarget = 3000;
  const hydroPercent = Math.min(Math.round((waterConsumed / waterTarget) * 100), 100);

  // Sleep hours and displayed times calculation
  const displayedBedtime = sleepRecord?.bedtime ? formatTime12h(sleepRecord.bedtime) : (store.user.sleepTime || '10:00 PM');
  const displayedWaketime = sleepRecord?.waketime ? formatTime12h(sleepRecord.waketime) : (store.user.wakeTime || '06:00 AM');

  const sleepHours = sleepRecord
    ? calculateSleepDurationHours(sleepRecord.bedtime, sleepRecord.waketime)
    : calculateSleepDurationHours(store.user.sleepTime || '10:00 PM', store.user.wakeTime || '06:00 AM');

  // Nutrition targets calculation
  const targets = calculateNutritionTargets(store.user);

  return (
    <div style={{ padding: '0 clamp(12px, 3.5vw, 24px) clamp(8px, 1.5vw, 14px)' }}>
      <div className="bento-grid">
        {/* Tile 1: Hydration */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '20px',
            padding: '12px 14px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(25px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              💧 Water
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 900, color: 'var(--primary)' }}>
              {hydroPercent}%
            </span>
          </div>

          <div style={{ margin: '6px 0' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-1)' }}>
              {waterConsumed} <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-2)' }}>/ {waterTarget}ml</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'var(--border)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${hydroPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #007AFF, #64D2FF)',
                  borderRadius: '3px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              haptics.medium();
              updateWater(250);
              showIsland('💧 +250ml Logged');
            }}
            style={{
              background: 'var(--primary-dim)',
              border: 'none',
              color: 'var(--primary)',
              padding: '6px 0',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%'
            }}
          >
            +250ml
          </button>
        </div>

        {/* Tile 2: Sleep */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '20px',
            padding: '12px 14px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(25px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              🌙 Sleep
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#AF52DE',
                background: 'rgba(175, 82, 222, 0.12)',
                padding: '2px 5px',
                borderRadius: '6px'
              }}
            >
              {sleepHours.toFixed(1)}h
            </span>
          </div>

          <div style={{ margin: '6px 0' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-1)' }}>
              {displayedBedtime}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-2)', marginTop: '2px' }}>
              Wake: {displayedWaketime}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              haptics.tap();
              onOpenSleepSheet();
            }}
            style={{
              background: 'rgba(175, 82, 222, 0.12)',
              border: 'none',
              color: '#AF52DE',
              padding: '6px 0',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {sleepRecord ? '✓ Edit Log' : 'Log Sleep'}
          </button>
        </div>

        {/* Tile 3: Diet & Nutrition */}
        <div
          onClick={() => {
            haptics.tap();
            setCurrentView('diet');
          }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '20px',
            padding: '12px 14px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            backdropFilter: 'blur(25px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              🥗 Fuel
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--primary)' }}>
              View →
            </span>
          </div>

          <div style={{ margin: '6px 0' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-1)' }}>
              ~{targets.targetCalories} <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-2)' }}>kcal</span>
            </div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34C759', marginTop: '2px' }}>
              {targets.targetProteinGrams}g Protein
            </div>
          </div>

          <div style={{ fontSize: '0.68rem', color: 'var(--text-2)' }}>
            15-Day Cycle Active
          </div>
        </div>

        {/* Tile 4: Mindfulness / Box Breathing */}
        <div
          onClick={() => {
            haptics.medium();
            onOpenBreathingModal();
          }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '20px',
            padding: '12px 14px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            backdropFilter: 'blur(25px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              🧘 Reset
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#34C759' }}>
              4-4-4-4
            </span>
          </div>

          <div style={{ margin: '6px 0' }}>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-1)' }}>
              Box Breathing
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-2)', marginTop: '2px' }}>
              Clear cortisol & focus
            </div>
          </div>

          <div
            style={{
              background: 'rgba(52, 199, 89, 0.12)',
              color: '#34C759',
              padding: '6px 0',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              textAlign: 'center',
              width: '100%'
            }}
          >
            Start Session
          </div>
        </div>
      </div>
    </div>
  );
};
