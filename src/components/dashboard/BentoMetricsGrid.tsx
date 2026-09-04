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
  onOpenBreathingModal,
  onOpenOneOffSheet
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
    <div style={{ padding: '0 clamp(12px, 3.5vw, 18px) 14px' }}>
      {/* 1. Modular Bento Grid (Minimalist, Functional & Adaptive) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '14px'
        }}
      >
        {/* Tile 1: Hydration Fluidity & Progress */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '24px',
            padding: '16px 18px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              💧 Hydration
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--primary)' }}>
              {hydroPercent}%
            </span>
          </div>

          <div style={{ margin: '10px 0' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>
              {waterConsumed} <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-2)' }}>/ {waterTarget}ml</span>
            </div>
            {/* Liquid Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${hydroPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #007AFF, #64D2FF)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              haptics.medium();
              updateWater(250);
              showIsland('💧 +250ml Water Added!');
            }}
            style={{
              background: 'var(--primary-dim)',
              border: 'none',
              color: 'var(--primary)',
              padding: '7px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              transition: 'transform 0.2s ease'
            }}
          >
            +250ml Hydrate
          </button>
        </div>

        {/* Tile 2: Circadian Sleep Architecture */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '24px',
            padding: '16px 18px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🌙 Sleep Cycle
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#AF52DE',
                background: 'rgba(175, 82, 222, 0.15)',
                padding: '2px 6px',
                borderRadius: '6px'
              }}
            >
              {sleepHours.toFixed(1)}h Window
            </span>
          </div>

          <div style={{ margin: '10px 0' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-1)' }}>
              {displayedBedtime}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginTop: '2px' }}>
              Wake: {displayedWaketime}
            </div>
          </div>

          <button
            onClick={() => {
              haptics.tap();
              onOpenSleepSheet();
            }}
            style={{
              background: 'rgba(175, 82, 222, 0.15)',
              border: 'none',
              color: '#AF52DE',
              padding: '7px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              transition: 'transform 0.2s ease'
            }}
          >
            {sleepRecord ? '✓ Edit Log' : 'Log Sleep'}
          </button>
        </div>

        {/* Tile 3: Daily Macro Targets & Fuel Sync (Full-Width) */}
        <div
          onClick={() => {
            haptics.tap();
            setCurrentView('diet');
          }}
          style={{
            gridColumn: '1 / -1',
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '24px',
            padding: '16px 20px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            transition: 'transform 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'rgba(52, 199, 89, 0.15)',
                color: '#34C759',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem'
              }}
            >
              🥗
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Daily Indian Nutrition Target
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-1)' }}>
                ~{targets.targetCalories} kcal • {targets.targetProteinGrams}g Protein
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>View Plan</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* 2. Fast Actions Dock */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '4px'
        }}
      >
        <button
          onClick={() => {
            haptics.medium();
            onOpenBreathingModal();
          }}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border-glass)',
            borderRadius: '18px',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
            transition: 'transform 0.2s ease'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🧘</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-1)' }}>2-Min Breathe</span>
        </button>

        <button
          onClick={() => {
            haptics.medium();
            onOpenOneOffSheet();
          }}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border-glass)',
            borderRadius: '18px',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
            transition: 'transform 0.2s ease'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>➕</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-1)' }}>Add Habit</span>
        </button>

        <button
          onClick={() => {
            haptics.medium();
            updateWater(500);
            showIsland('💧 +500ml Hydration Boosted!');
          }}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border-glass)',
            borderRadius: '18px',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
            transition: 'transform 0.2s ease'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>💧</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-1)' }}>+500ml Boost</span>
        </button>
      </div>
    </div>
  );
};
