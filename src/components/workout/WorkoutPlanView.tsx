import React, { useState, useEffect, useMemo, useRef } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { CURATED_WORKOUT_DATABASE } from '../../data/workoutCatalog';
import { WorkoutRoutine } from '../../types';
import { getRelativeDateLabel } from '../../utils/dateUtils';
import { soundService } from '../../services/soundService';
import { haptics } from '../../utils/haptics';

export const WorkoutPlanView: React.FC = () => {
  const { store, viewedDate, showIsland, updateUserProfile } = usePlanner();

  // Environment Filter State: 'home' vs 'gym'
  const [workoutEnv, setWorkoutEnv] = useState<'home' | 'gym'>(store.user.workoutLocation || 'home');
  const [selectedRoutineKey, setSelectedRoutineKey] = useState<string>('home_fat_loss_hiit');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  // Exercise Rest Stopwatch State
  const [activeRestExId, setActiveRestExId] = useState<string | null>(null);
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [totalRestSeconds, setTotalRestSeconds] = useState<number>(60);
  const timerRef = useRef<number | null>(null);

  const { statusLabel, dateLabel } = getRelativeDateLabel(viewedDate);
  const goal = store.user.goal || 'fat_loss';
  const isPcos = (store.user.femaleConsiderations || []).includes('pcos') || (store.user.femaleConsiderations || []).includes('pcod');

  // Rest Timer Interval
  useEffect(() => {
    if (restSecondsRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            soundService.playSuccessChime();
            haptics.triumph();
            showIsland('💪 Rest Completed! Begin next set.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restSecondsRemaining, showIsland]);

  const startRestTimer = (exId: string, durationSec: number = 60) => {
    haptics.medium();
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveRestExId(exId);
    setTotalRestSeconds(durationSec);
    setRestSecondsRemaining(durationSec);
  };

  const cancelRestTimer = () => {
    haptics.tap();
    if (timerRef.current) clearInterval(timerRef.current);
    setRestSecondsRemaining(0);
    setActiveRestExId(null);
  };

  // Home Routines List
  const homeRoutines = [
    { key: 'home_fat_loss_hiit', label: '🔥 Fat Burn HIIT & Core', badge: 'Weight Loss' },
    { key: 'home_muscle_calisthenics', label: '💪 Calisthenics Muscle Builder', badge: 'Hypertrophy' },
    { key: 'home_light_mobility', label: '🌸 Light Mobility & PCOS Reset', badge: 'Low Cortisol' }
  ];

  // Gym Routines List
  const gymRoutines = [
    { key: 'gym_fat_loss_push_pull', label: '🔥 Metabolic Compound & Cardio', badge: 'Weight Loss' },
    { key: 'ppl_push', label: 'Push (Chest/Shoulders/Tri)', badge: 'Hypertrophy' },
    { key: 'ppl_pull', label: 'Pull (Back/Biceps/Rear Delt)', badge: 'Hypertrophy' },
    { key: 'legs_core', label: 'Legs & Core Conditioning', badge: 'Strength' },
    { key: 'full_body_starter', label: 'Full Body Foundational', badge: 'All Levels' }
  ];

  const activeRoutineList = workoutEnv === 'home' ? homeRoutines : gymRoutines;

  // Auto-recommend optimal routine on date / environment switch based on user's goal
  useEffect(() => {
    if (workoutEnv === 'home') {
      if (isPcos) {
        setSelectedRoutineKey('home_light_mobility');
      } else if (goal === 'fat_loss') {
        setSelectedRoutineKey('home_fat_loss_hiit');
      } else if (goal === 'muscle_gain') {
        setSelectedRoutineKey('home_muscle_calisthenics');
      } else {
        setSelectedRoutineKey('home_fat_loss_hiit');
      }
    } else {
      if (goal === 'fat_loss') {
        setSelectedRoutineKey('gym_fat_loss_push_pull');
      } else {
        const dayOfWeek = viewedDate.getDay();
        if (dayOfWeek === 1 || dayOfWeek === 4) setSelectedRoutineKey('ppl_push');
        else if (dayOfWeek === 2 || dayOfWeek === 5) setSelectedRoutineKey('ppl_pull');
        else if (dayOfWeek === 3) setSelectedRoutineKey('legs_core');
        else setSelectedRoutineKey('gym_fat_loss_push_pull');
      }
    }
  }, [workoutEnv, goal, isPcos, viewedDate]);

  const handleEnvChange = (env: 'home' | 'gym') => {
    haptics.tap();
    setWorkoutEnv(env);
    updateUserProfile({ workoutLocation: env });
  };

  const routine: WorkoutRoutine = CURATED_WORKOUT_DATABASE[selectedRoutineKey] || CURATED_WORKOUT_DATABASE.home_fat_loss_hiit;

  // Contextual Training Tip
  const workoutTip = useMemo(() => {
    if (workoutEnv === 'home') {
      return goal === 'fat_loss'
        ? '🔥 Home Fat Loss Tip: Keep rest intervals short (45s) to sustain elevated heart rate and maximize post-workout EPOC oxygen consumption.'
        : '💪 Home Hypertrophy Tip: Focus on slow 3-second eccentric descents to build maximal mechanical tension without heavy weights.';
    } else {
      return goal === 'fat_loss'
        ? '🔥 Gym Metabolic Tip: Finish compound lifts with 10 mins of incline walking (12% incline, 4.5 km/h) for zero-impact fat burning.'
        : '🏋️ Gym Progressive Overload: Strive to add 1 repetition or 1-2.5 kg to your working sets each week.';
    }
  }, [workoutEnv, goal]);

  return (
    <div className="slider-page" style={{ paddingTop: '15px' }}>
      {/* 1. Environment Switcher Pill (Home vs Gym) */}
      <div style={{ padding: '0 20px 12px' }}>
        <div
          style={{
            display: 'flex',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-glass)',
            borderRadius: '24px',
            padding: '4px',
            boxShadow: 'var(--shadow)'
          }}
        >
          <button
            onClick={() => handleEnvChange('home')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '20px',
              border: 'none',
              background: workoutEnv === 'home' ? 'var(--primary)' : 'transparent',
              color: workoutEnv === 'home' ? '#ffffff' : 'var(--text-2)',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span>🏡</span>
            <span>Home Workout (Light/Bodyweight)</span>
          </button>

          <button
            onClick={() => handleEnvChange('gym')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '20px',
              border: 'none',
              background: workoutEnv === 'gym' ? 'var(--primary)' : 'transparent',
              color: workoutEnv === 'gym' ? '#ffffff' : 'var(--text-2)',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span>🏋️</span>
            <span>Gym (Weights & Machines)</span>
          </button>
        </div>
      </div>

      {/* Routine Banner */}
      <div className="set-card" style={{ margin: '0 20px 14px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
              Scheduled for {statusLabel}, {dateLabel} • Goal: {goal.replace('_', ' ').toUpperCase()}
            </div>
            <div className="brand-gradient" style={{ fontSize: '1.25rem', fontWeight: 900 }}>
              {routine.name}
            </div>
          </div>
          <span
            style={{
              background: 'rgba(255, 149, 0, 0.15)',
              color: '#FF9500',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 8px',
              borderRadius: '8px'
            }}
          >
            ⏱️ {routine.estimatedDurationMins} Mins
          </span>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', margin: '4px 0 0 0' }}>
          {workoutEnv === 'home'
            ? '100% equipment-free home circuit optimized for metabolic burn and core strength.'
            : 'Progressive overload gym program with free weights and commercial machines.'}
        </p>
      </div>

      {/* Routine Tabs */}
      <div
        className="tabs"
        style={{
          display: 'flex',
          gap: '8px',
          padding: '0 20px 14px',
          overflowX: 'auto'
        }}
      >
        {activeRoutineList.map((r) => {
          const isActive = selectedRoutineKey === r.key;
          return (
            <button
              key={r.key}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                haptics.tap();
                setSelectedRoutineKey(r.key);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <span>{r.label}</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--primary-dim)',
                  color: isActive ? '#ffffff' : 'var(--primary)',
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}
              >
                {r.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contextual Training Tip */}
      <div
        style={{
          margin: '0 20px 14px',
          background: 'var(--surface-2)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          padding: '12px 16px',
          fontSize: '0.8rem',
          color: 'var(--text-1)',
          lineHeight: 1.4
        }}
      >
        {workoutTip}
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Dynamic Warmup Section */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '20px',
            padding: '14px 16px',
            marginBottom: '14px'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FF9500', marginBottom: '6px' }}>
            🔥 Dynamic Warmup (5-8 Mins):
          </div>
          <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.45 }}>
            {routine.warmup.map((w, idx) => (
              <li key={idx} style={{ marginBottom: '2px' }}>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Exercise List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {routine.exercises.map((ex, idx) => {
            const isExpanded = expandedExerciseId === ex.id;
            const isRestActive = activeRestExId === ex.id && restSecondsRemaining > 0;
            const restPct = isRestActive ? (restSecondsRemaining / totalRestSeconds) * 100 : 0;
            const strokeOffset = 125.6 - (125.6 * restPct) / 100;

            const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
              `perfect execution form tutorial ${ex.name}`
            )}`;

            return (
              <div
                key={ex.id}
                style={{
                  background: 'var(--surface)',
                  border: isRestActive ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                  borderRadius: '22px',
                  padding: '16px',
                  boxShadow: isRestActive ? '0 0 20px var(--primary-glow)' : 'var(--shadow)',
                  position: 'relative',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: 'var(--primary)',
                        background: 'var(--primary-dim)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                      }}
                    >
                      Exercise {idx + 1} • {ex.targetMuscle}
                    </span>
                    <h3 style={{ margin: '4px 0 2px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-1)' }}>
                      {ex.name}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-1)' }}>
                      {ex.sets} Sets × {ex.reps}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-2)', fontWeight: 700 }}>
                      Rest: {ex.restSeconds}s
                    </div>
                  </div>
                </div>

                {/* Rest Stopwatch Countdown Display */}
                {isRestActive && (
                  <div
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--primary-glow)',
                      borderRadius: '16px',
                      padding: '12px 14px',
                      margin: '10px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ position: 'relative', width: '38px', height: '38px' }}>
                        <svg width="38" height="38" viewBox="0 0 44 44">
                          <circle cx="22" cy="22" r="20" fill="none" stroke="var(--border)" strokeWidth="4" />
                          <circle
                            cx="22"
                            cy="22"
                            r="20"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="4"
                            strokeDasharray="125.6"
                            strokeDashoffset={strokeOffset}
                            strokeLinecap="round"
                            transform="rotate(-90 22 22)"
                            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
                          />
                        </svg>
                        <span
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.75rem',
                            fontWeight: 900,
                            color: 'var(--primary)'
                          }}
                        >
                          {restSecondsRemaining}s
                        </span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-1)' }}>
                          Rest Interval Active
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-2)' }}>
                          Deep diaphragmatic recovery breathing
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={cancelRestTimer}
                      style={{
                        background: 'var(--border)',
                        border: 'none',
                        color: 'var(--danger)',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      ✕ Stop
                    </button>
                  </div>
                )}

                {/* Rest Timers & Action Row */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => startRestTimer(ex.id, 45)}
                    style={{
                      background: 'var(--primary-dim)',
                      border: 'none',
                      color: 'var(--primary)',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>⏱️</span>
                    <span>45s Rest</span>
                  </button>

                  <button
                    onClick={() => startRestTimer(ex.id, 60)}
                    style={{
                      background: 'var(--primary-dim)',
                      border: 'none',
                      color: 'var(--primary)',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>⏱️</span>
                    <span>60s Rest</span>
                  </button>

                  <a
                    href={ytSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(255, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 0, 0, 0.2)',
                      color: '#FF3B30',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>▶</span>
                    <span>Video Tutorial ↗</span>
                  </a>

                  <button
                    onClick={() => {
                      haptics.tap();
                      setExpandedExerciseId(isExpanded ? null : ex.id);
                    }}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-1)',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      marginLeft: 'auto'
                    }}
                  >
                    {isExpanded ? 'Hide' : '📖 Form Tips'}
                  </button>
                </div>

                {/* Expanded Form Guidance */}
                {isExpanded && (
                  <div
                    className="fade-in"
                    style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: 'var(--surface-2)',
                      borderRadius: '14px',
                      fontSize: '0.8rem',
                      color: 'var(--text-1)'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                      Step-by-Step Execution:
                    </div>
                    <ol style={{ paddingLeft: '18px', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                      {ex.instructions.map((ins, i) => (
                        <li key={i}>{ins}</li>
                      ))}
                    </ol>

                    <div style={{ fontWeight: 800, color: '#34C759', marginBottom: '4px' }}>
                      💡 Form & Technique Tips:
                    </div>
                    <ul style={{ paddingLeft: '18px', margin: '0 0 8px 0', lineHeight: 1.45, color: 'var(--text-2)' }}>
                      {ex.techniqueTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>

                    {ex.easierAlternative && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-2)', marginBottom: '4px' }}>
                        🟢 <strong>Easier Alternative:</strong> {ex.easierAlternative}
                      </div>
                    )}

                    {ex.harderProgression && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>
                        🔴 <strong>Harder Progression:</strong> {ex.harderProgression}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cooldown */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '18px',
            padding: '14px 16px',
            margin: '14px 0 24px'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#34C759', marginBottom: '6px' }}>
            🧘 Post-Workout Cooldown & Mobility:
          </div>
          <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.45 }}>
            {routine.cooldown.map((c, idx) => (
              <li key={idx} style={{ marginBottom: '2px' }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
