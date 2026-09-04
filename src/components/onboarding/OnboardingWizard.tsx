import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { Gender, ActivityLevel, UserGoal, LifestyleType, FemaleHealthConsideration } from '../../types';
import { generatePersonalizedSchedule } from '../../services/personalizationEngine';
import { haptics } from '../../utils/haptics';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { updateUserProfile, saveCustomSchedule, showIsland } = usePlanner();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | string>(24);
  const [gender, setGender] = useState<Gender>('male');

  const [heightMode, setHeightMode] = useState<'cm' | 'ft'>('cm');
  const [heightCm, setHeightCm] = useState<number | string>(170);
  const [heightFt, setHeightFt] = useState<number | string>(5);
  const [heightIn, setHeightIn] = useState<number | string>(7);
  const [weightKg, setWeightKg] = useState<number | string>(65);
  const [goalWeightKg, setGoalWeightKg] = useState<number | string>(60);

  const [activity, setActivity] = useState<ActivityLevel>(1.375);
  const [goal, setGoal] = useState<UserGoal>('fat_loss');
  const [lifestyle, setLifestyle] = useState<LifestyleType>('working_professional');
  const [workoutLocation, setWorkoutLocation] = useState<'home' | 'gym'>('home');
  const [wakeTime, setWakeTime] = useState('06:00 AM');
  const [sleepTime, setSleepTime] = useState('10:00 PM');
  const [pcosFocus, setPcosFocus] = useState(false);
  const [ironFocus, setIronFocus] = useState(false);

  const handleNext = (targetStep: number) => {
    haptics.tap();
    if (targetStep === 2) {
      if (!name.trim()) {
        showIsland('Please enter your name');
        return;
      }
    } else if (targetStep === 3) {
      const computedHeight = heightMode === 'cm' ? Number(heightCm) : Number(heightFt) * 30.48 + Number(heightIn) * 2.54;
      if (!computedHeight || !Number(weightKg)) {
        showIsland('Please specify height and weight');
        return;
      }
    }
    setStep(targetStep);
  };

  const handleFinish = () => {
    haptics.triumph();
    const finalHeight = Math.round(
      heightMode === 'cm'
        ? Number(heightCm) || 170
        : (Number(heightFt) || 5) * 30.48 + (Number(heightIn) || 7) * 2.54
    );

    const femaleCons: FemaleHealthConsideration[] = [];
    if (pcosFocus) femaleCons.push('pcos');
    if (ironFocus) femaleCons.push('iron_focus');

    const numWeight = Number(weightKg) || 65;
    const numGoalWeight = Number(goalWeightKg) || (goal === 'fat_loss' ? numWeight - 5 : numWeight);

    const profileData = {
      name: name.trim() || 'Warrior',
      age: Number(age) || 24,
      gender,
      heightCm: finalHeight,
      startWeightKg: numWeight,
      currentWeightKg: numWeight,
      goalWeightKg: numGoalWeight,
      activityLevel: activity,
      goal,
      lifestyle,
      workoutLocation,
      wakeTime,
      sleepTime,
      femaleConsiderations: femaleCons,
      chimeEnabled: true,
      accentTheme: 'classic' as const
    };

    updateUserProfile(profileData);

    // Build personalized routine schedule & 7-day diet
    const generatedSchedule = generatePersonalizedSchedule(profileData as any);
    Object.keys(generatedSchedule).forEach((dayKey) => {
      saveCustomSchedule(dayKey as any, generatedSchedule[dayKey as keyof typeof generatedSchedule]);
    });

    onComplete();
  };

  return (
    <div
      id="onboarding"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '20px'
      }}
    >
      <div
        className="ob-card slide-up"
        style={{
          background: 'var(--surface-solid)',
          border: '1px solid var(--border-glass)',
          borderRadius: '34px',
          padding: '28px 24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          width: '100%',
          maxWidth: '440px',
          position: 'relative'
        }}
      >
        {/* Top Header Row with Stepper Dots & Skip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🧬</span>
            <span className="brand-gradient" style={{ fontWeight: 900, fontSize: '0.9rem' }}>
              HealthyHabits
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div className={`ob-dot ${step === 1 ? 'active' : ''}`} />
              <div className={`ob-dot ${step === 2 ? 'active' : ''}`} />
              <div className={`ob-dot ${step === 3 ? 'active' : ''}`} />
            </div>
            <button
              onClick={handleFinish}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              Skip & Explore →
            </button>
          </div>
        </div>

        {/* STEP 1: IDENTITY */}
        {step === 1 && (
          <div className="ob-step fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <div>
              <div className="brand-gradient" style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Welcome
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                Let's customize your personalized metabolic & diet protocol.
              </p>
            </div>

            <div className="ios-input-box">
              <span className="ios-input-label">Your Name</span>
              <input
                type="text"
                className="ios-input-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="ios-input-box" style={{ flex: 1 }}>
                <span className="ios-input-label">Age</span>
                <input
                  type="number"
                  className="ios-input-control"
                  placeholder="24"
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>

              <div className="ios-input-box" style={{ flex: 1 }}>
                <span className="ios-input-label">Gender</span>
                <select
                  className="ios-input-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Primary Goal Selector */}
            <div className="ios-input-box">
              <span className="ios-input-label">Primary Goal</span>
              <select
                className="ios-input-control"
                value={goal}
                onChange={(e) => setGoal(e.target.value as UserGoal)}
                style={{ cursor: 'pointer' }}
              >
                <option value="fat_loss">🔥 Weight Loss / Fat Loss (Caloric Deficit)</option>
                <option value="muscle_gain">💪 Muscle Gain / Hypertrophy (Lean Surplus)</option>
                <option value="consistency">🌱 Consistency & Metabolic Routine</option>
                <option value="maintenance">⚖️ Weight Maintenance</option>
              </select>
            </div>

            <button className="btn-primary" style={{ marginTop: '6px' }} onClick={() => handleNext(2)}>
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2: BIOMETRICS */}
        {step === 2 && (
          <div className="ob-step fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <div>
              <div className="brand-gradient" style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Biometrics
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                Used for deterministic BMR & Mifflin-St Jeor TDEE calculation.
              </p>
            </div>

            {/* Unit Switch */}
            <div className="unit-switch" style={{ background: 'var(--surface-2)' }}>
              <div
                className={`unit-opt ${heightMode === 'cm' ? 'active' : ''}`}
                onClick={() => setHeightMode('cm')}
              >
                Centimeters (cm)
              </div>
              <div
                className={`unit-opt ${heightMode === 'ft' ? 'active' : ''}`}
                onClick={() => setHeightMode('ft')}
              >
                Feet & Inches (ft/in)
              </div>
            </div>

            {heightMode === 'cm' ? (
              <div className="ios-input-box">
                <span className="ios-input-label">Height (cm)</span>
                <input
                  type="number"
                  className="ios-input-control"
                  placeholder="170"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="ios-input-box" style={{ flex: 1 }}>
                  <span className="ios-input-label">Feet</span>
                  <input
                    type="number"
                    className="ios-input-control"
                    placeholder="5"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
                <div className="ios-input-box" style={{ flex: 1 }}>
                  <span className="ios-input-label">Inches</span>
                  <input
                    type="number"
                    className="ios-input-control"
                    placeholder="7"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="ios-input-box" style={{ flex: 1 }}>
                <span className="ios-input-label">Current Weight (kg)</span>
                <input
                  type="number"
                  className="ios-input-control"
                  placeholder="65"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>

              <div className="ios-input-box" style={{ flex: 1 }}>
                <span className="ios-input-label">Target Goal (kg)</span>
                <input
                  type="number"
                  className="ios-input-control"
                  placeholder="60"
                  value={goalWeightKg}
                  onChange={(e) => setGoalWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>
            </div>

            <div className="ios-input-box">
              <span className="ios-input-label">Daily Physical Activity</span>
              <select
                className="ios-input-control"
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value) as ActivityLevel)}
                style={{ cursor: 'pointer' }}
              >
                <option value={1.2}>Sedentary (Desk Job, Minimal Steps)</option>
                <option value={1.375}>Lightly Active (1-3 workout days/wk)</option>
                <option value={1.55}>Moderately Active (3-5 workout days/wk)</option>
                <option value={1.725}>Very Active (6-7 intense days/wk)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => handleNext(1)}
              >
                ← Back
              </button>
              <button
                className="btn-primary"
                style={{ flex: 2 }}
                onClick={() => handleNext(3)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: LIFESTYLE & PREFERENCES */}
        {step === 3 && (
          <div className="ob-step fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <div>
              <div className="brand-gradient" style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Lifestyle Protocol
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                Synchronizing circadian sleep & training environment.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="ios-input-box" style={{ flex: 1 }}>
                <span className="ios-input-label">Wake Time</span>
                <input
                  type="text"
                  className="ios-input-control"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </div>

              <div className="ios-input-box" style={{ flex: 1 }}>
                <span className="ios-input-label">Sleep Target</span>
                <input
                  type="text"
                  className="ios-input-control"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                />
              </div>
            </div>

            {/* Workout Location Selector */}
            <div className="ios-input-box">
              <span className="ios-input-label">Workout Environment</span>
              <select
                className="ios-input-control"
                value={workoutLocation}
                onChange={(e) => setWorkoutLocation(e.target.value as 'home' | 'gym')}
                style={{ cursor: 'pointer' }}
              >
                <option value="home">🏡 Home Workout (Light & Calisthenics)</option>
                <option value="gym">🏋️ Gym Protocol (Weights & Commercial Machines)</option>
              </select>
            </div>

            <div className="ios-input-box">
              <span className="ios-input-label">Occupation Rhythm</span>
              <select
                className="ios-input-control"
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value as LifestyleType)}
                style={{ cursor: 'pointer' }}
              >
                <option value="working_professional">💼 Corporate / Working Professional</option>
                <option value="student">🎓 College / University Student</option>
                <option value="flexible">🧘 Flexible / Remote / Entrepreneur</option>
              </select>
            </div>

            {/* Female Health Support (Conditional) */}
            {gender === 'female' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span className="ios-input-label" style={{ color: 'var(--primary)' }}>
                  🌸 Women's Health Protocols (Optional)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPcosFocus(!pcosFocus)}
                    style={{
                      background: pcosFocus ? 'var(--primary)' : 'var(--surface-2)',
                      color: pcosFocus ? '#ffffff' : 'var(--text-2)',
                      border: '1px solid var(--border-glass)',
                      padding: '8px 10px',
                      borderRadius: '14px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {pcosFocus ? '✓ PCOS / PCOD' : '+ PCOS / PCOD'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIronFocus(!ironFocus)}
                    style={{
                      background: ironFocus ? 'var(--primary)' : 'var(--surface-2)',
                      color: ironFocus ? '#ffffff' : 'var(--text-2)',
                      border: '1px solid var(--border-glass)',
                      padding: '8px 10px',
                      borderRadius: '14px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {ironFocus ? '✓ Iron Boost' : '+ Iron Boost'}
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => handleNext(2)}
              >
                ← Back
              </button>
              <button
                className="btn-primary"
                style={{ flex: 2 }}
                onClick={handleFinish}
              >
                Launch My Protocol 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
