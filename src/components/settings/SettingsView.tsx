import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { useTheme } from '../../context/ThemeContext';
import { notificationService } from '../../services/notificationService';
import { DayName, ScheduleTask, TaskType, Gender, LifestyleType, UserGoal, ActivityLevel, FemaleHealthConsideration } from '../../types';
import { timeToMinutes, calculateSleepDurationHours, formatTime24h, formatTime12h } from '../../utils/timeUtils';
import { generatePersonalizedSchedule } from '../../services/personalizationEngine';
import { AuthSheet } from '../modals/AuthSheet';
import { haptics } from '../../utils/haptics';

export const SettingsView: React.FC = () => {
  const {
    store,
    updateUserProfile,
    saveCustomSchedule,
    bulkToggleReminders,
    updateLightDayTypes,
    resetWeeklyCheckboxes,
    hardResetApp,
    showIsland
  } = usePlanner();

  const { accentTheme, setAccent } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Time conversion helpers
  const to24Hour = (timeStr: string): string => formatTime24h(timeStr);
  const to12Hour = (timeStr: string): string => formatTime12h(timeStr);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<{
    name: string;
    heightCm: number | string;
    startWeightKg: number | string;
    age: number | string;
    gender: Gender;
    activityLevel: ActivityLevel;
    goal: UserGoal;
    lifestyle: LifestyleType;
    wakeTime24: string;
    sleepTime24: string;
    chimeEnabled: boolean;
    pcosFocus: boolean;
    ironFocus: boolean;
  }>({
    name: store.user.name || '',
    heightCm: store.user.heightCm ?? 170,
    startWeightKg: store.user.startWeightKg ?? 65,
    age: store.user.age ?? 24,
    gender: store.user.gender || 'male',
    activityLevel: store.user.activityLevel || 1.375,
    goal: store.user.goal || 'consistency',
    lifestyle: store.user.lifestyle || 'working_professional',
    wakeTime24: to24Hour(store.user.wakeTime || '06:00 AM'),
    sleepTime24: to24Hour(store.user.sleepTime || '10:00 PM'),
    chimeEnabled: store.user.chimeEnabled !== false,
    pcosFocus: (store.user.femaleConsiderations || []).includes('pcos'),
    ironFocus: (store.user.femaleConsiderations || []).includes('iron_focus')
  });

  // Calculate sleep duration in real-time
  const sleepDurationHours = calculateSleepDurationHours(
    to12Hour(profileForm.sleepTime24),
    to12Hour(profileForm.wakeTime24)
  );

  // Schedule Editor State
  const [selectedEditorDay, setSelectedEditorDay] = useState<DayName>('mon');
  const [editorTasks, setEditorTasks] = useState<ScheduleTask[]>(() => {
    return JSON.parse(JSON.stringify(store.schedule['mon'] || []));
  });
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(null);

  const handleDaySelectChange = (day: DayName) => {
    setSelectedEditorDay(day);
    setEditorTasks(JSON.parse(JSON.stringify(store.schedule[day] || [])));
    setOpenAccordionIdx(null);
  };

  const handleSaveProfile = () => {
    haptics.medium();
    const femaleCons: FemaleHealthConsideration[] = [];
    if (profileForm.pcosFocus) femaleCons.push('pcos');
    if (profileForm.ironFocus) femaleCons.push('iron_focus');

    updateUserProfile({
      name: profileForm.name,
      heightCm: Number(profileForm.heightCm),
      startWeightKg: Number(profileForm.startWeightKg),
      age: Number(profileForm.age),
      gender: profileForm.gender as Gender,
      activityLevel: Number(profileForm.activityLevel) as ActivityLevel,
      goal: profileForm.goal as UserGoal,
      lifestyle: profileForm.lifestyle as LifestyleType,
      wakeTime: to12Hour(profileForm.wakeTime24),
      sleepTime: to12Hour(profileForm.sleepTime24),
      chimeEnabled: profileForm.chimeEnabled,
      femaleConsiderations: femaleCons
    });
  };

  // Realigns schedule rituals dynamically according to new wake/sleep time
  const handleAutoRealignSchedule = () => {
    haptics.triumph();
    const femaleCons: FemaleHealthConsideration[] = [];
    if (profileForm.pcosFocus) femaleCons.push('pcos');
    if (profileForm.ironFocus) femaleCons.push('iron_focus');

    const updatedProfile = {
      ...store.user,
      name: profileForm.name,
      wakeTime: to12Hour(profileForm.wakeTime24),
      sleepTime: to12Hour(profileForm.sleepTime24),
      femaleConsiderations: femaleCons
    };

    updateUserProfile(updatedProfile);

    // Regenerate daily timeline anchored to new wake & sleep hours
    const newSchedule = generatePersonalizedSchedule(updatedProfile);
    Object.keys(newSchedule).forEach((dayKey) => {
      saveCustomSchedule(dayKey as DayName, newSchedule[dayKey as keyof typeof newSchedule]);
    });

    setEditorTasks(JSON.parse(JSON.stringify(newSchedule[selectedEditorDay] || [])));
    showIsland('⏰ All Daily Rituals Realigned to New Clock!');
  };

  const handleTaskFieldChange = (index: number, field: keyof ScheduleTask, value: any) => {
    const updated = [...editorTasks];
    updated[index] = { ...updated[index], [field]: value };
    setEditorTasks(updated);
  };

  const handleAddNewTaskSlot = () => {
    haptics.medium();
    const newTask: ScheduleTask = {
      id: `t_${selectedEditorDay}_${Date.now()}`,
      t: '12:00 PM',
      act: 'New Activity',
      instr: 'Details here',
      rule: 'Why do this?',
      type: 'hack',
      reminder: true,
      isRecurring: true
    };
    setEditorTasks([...editorTasks, newTask]);
    setOpenAccordionIdx(editorTasks.length);
    showIsland('New Slot Added at Bottom!');
  };

  const handleDeleteTask = (index: number) => {
    haptics.delete();
    if (confirm('Permanently delete this task slot?')) {
      const updated = editorTasks.filter((_, i) => i !== index);
      setEditorTasks(updated);
      setOpenAccordionIdx(null);
      showIsland('Task Slot Removed');
    }
  };

  const handleSaveSchedule = () => {
    haptics.medium();
    const sorted = [...editorTasks].sort((a, b) => timeToMinutes(a.t) - timeToMinutes(b.t));
    saveCustomSchedule(selectedEditorDay, sorted);
  };

  const getSuggestionDatalistId = (activityName: string) => {
    const n = (activityName || '').toLowerCase();
    if (n.includes('breakfast')) return 'list-breakfast';
    if (n.includes('lunch')) return 'list-lunch';
    if (n.includes('dinner')) return 'list-dinner';
    if (n.includes('snack') || n.includes('pre') || n.includes('post')) return 'list-snack';
    if (n.includes('gym') || n.includes('cardio') || n.includes('workout')) return 'list-workout';
    return 'list-general';
  };

  const nextUpcomingTask = editorTasks.find((t) => timeToMinutes(t.t) > new Date().getHours() * 60 + new Date().getMinutes());

  return (
    <div style={{ paddingTop: '12px', width: '100%' }}>
      {/* 1. Cloud Sync & Profile Banner (iOS Inset) */}
      <div className="set-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), #5AC8FA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              color: '#fff',
              boxShadow: '0 4px 12px var(--primary-dim)'
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' }}>
              {profileForm.name || 'Warrior'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>
              HealthyHabits Local Protocol
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            haptics.tap();
            setIsAuthOpen(true);
          }}
          className="apply-week-btn"
        >
          Cloud Sync
        </button>
      </div>

      {/* 2. Circadian Sleep & Wake Up Clock Selection (iOS Clock Component) */}
      <div className="set-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
            ⏰ Circadian Sleep & Wake Clock
          </h3>
          <span
            style={{
              background: 'rgba(52, 199, 89, 0.15)',
              color: '#34C759',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '8px'
            }}
          >
            {sleepDurationHours.toFixed(1)}h Window
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '14px' }}>
          Set your natural sleep/wake schedule. Changing times can automatically align your meal and ritual reminders.
        </p>

        {/* Wake Up Time Row */}
        <div className="ios-clock-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>☀️</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase' }}>
                Wake Up Time
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                {to12Hour(profileForm.wakeTime24)}
              </div>
            </div>
          </div>

          <input
            type="time"
            className="ios-clock-input"
            value={profileForm.wakeTime24}
            onChange={(e) => {
              haptics.tap();
              setProfileForm({ ...profileForm, wakeTime24: e.target.value });
            }}
          />
        </div>

        {/* Bedtime Row */}
        <div className="ios-clock-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>🌙</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase' }}>
                Bedtime (Lights Out)
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#AF52DE' }}>
                {to12Hour(profileForm.sleepTime24)}
              </div>
            </div>
          </div>

          <input
            type="time"
            className="ios-clock-input"
            value={profileForm.sleepTime24}
            onChange={(e) => {
              haptics.tap();
              setProfileForm({ ...profileForm, sleepTime24: e.target.value });
            }}
          />
        </div>

        {/* Realign Daily Schedule Action Button */}
        <button
          className="btn-secondary"
          onClick={handleAutoRealignSchedule}
          style={{
            marginTop: '14px',
            borderColor: 'var(--primary)',
            color: 'var(--primary)',
            background: 'var(--primary-dim)'
          }}
        >
          ⚡ Realign All Daily Rituals to this Clock
        </button>
      </div>

      {/* 3. Biometrics & Lifestyle Profile */}
      <div className="set-card">
        <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: 800 }}>Biometrics & Fitness Target</h3>
        <span className="sm-label">Display Name</span>
        <input
          className="sm-input"
          value={profileForm.name}
          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
          placeholder="Display Name"
        />

        <div className="bio-inputs">
          <div style={{ flex: 1 }}>
            <span className="sm-label">Height (cm)</span>
            <input
              type="number"
              className="sm-input"
              placeholder="170"
              value={profileForm.heightCm}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  heightCm: e.target.value === '' ? '' : Number(e.target.value)
                })
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <span className="sm-label">Start Weight (kg)</span>
            <input
              type="number"
              className="sm-input"
              placeholder="65"
              value={profileForm.startWeightKg}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  startWeightKg: e.target.value === '' ? '' : Number(e.target.value)
                })
              }
            />
          </div>
        </div>

        <div className="bio-inputs">
          <div style={{ flex: 1 }}>
            <span className="sm-label">Age</span>
            <input
              type="number"
              className="sm-input"
              placeholder="24"
              value={profileForm.age}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  age: e.target.value === '' ? '' : Number(e.target.value)
                })
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <span className="sm-label">Gender</span>
            <select
              className="sm-input"
              value={profileForm.gender}
              onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value as Gender })}
              style={{ padding: '10px' }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <span className="sm-label">Primary Fitness Goal</span>
        <select
          className="sm-input"
          value={profileForm.goal}
          onChange={(e) => setProfileForm({ ...profileForm, goal: e.target.value as UserGoal })}
          style={{ padding: '10px' }}
        >
          <option value="fat_loss">Fat Loss (Sustainable Deficit)</option>
          <option value="muscle_gain">Muscle Gain (Lean Surplus)</option>
          <option value="maintenance">Weight Maintenance</option>
          <option value="consistency">Consistency & Metabolic Routine</option>
        </select>

        <span className="sm-label">Activity Level (TDEE Multiplier)</span>
        <select
          className="sm-input"
          value={profileForm.activityLevel}
          onChange={(e) => setProfileForm({ ...profileForm, activityLevel: Number(e.target.value) as ActivityLevel })}
          style={{ padding: '10px' }}
        >
          <option value="1.2">Sedentary (Desk Job, No Exercise)</option>
          <option value="1.375">Lightly Active (1-3 days/week)</option>
          <option value="1.55">Moderately Active (3-5 days/week)</option>
          <option value="1.725">Very Active (6-7 days/week)</option>
          <option value="1.9">Extra Active / Double Training</option>
        </select>

        {profileForm.gender === 'female' && (
          <div style={{ marginTop: '12px', background: 'var(--border)', padding: '12px 14px', borderRadius: '16px' }}>
            <span className="sm-label" style={{ marginTop: 0 }}>Optional Female Health Filters:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <label style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={profileForm.pcosFocus}
                  onChange={(e) => setProfileForm({ ...profileForm, pcosFocus: e.target.checked })}
                />
                🌸 PCOS / PCOD Support (Low GI & Anti-Spike)
              </label>
              <label style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={profileForm.ironFocus}
                  onChange={(e) => setProfileForm({ ...profileForm, ironFocus: e.target.checked })}
                />
                🩸 Iron Focus (Spinach & Legume Boost)
              </label>
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleSaveProfile} style={{ marginTop: '14px' }}>
          Save Biometrics
        </button>
      </div>

      {/* 4. Theme Accent Customization */}
      <div className="set-card">
        <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: 800 }}>Apple Theme Accents</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '12px' }}>
          Select your primary visionOS glassmorphism accent palette.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <button
            className="bulk-btn"
            style={{
              background: '#007AFF',
              color: '#fff',
              border: accentTheme === 'classic' ? '2px solid white' : 'none'
            }}
            onClick={() => setAccent('classic')}
          >
            Blue
          </button>
          <button
            className="bulk-btn"
            style={{
              background: '#8B5CF6',
              color: '#fff',
              border: accentTheme === 'violet' ? '2px solid white' : 'none'
            }}
            onClick={() => setAccent('violet')}
          >
            Violet
          </button>
          <button
            className="bulk-btn"
            style={{
              background: '#06B6D4',
              color: '#fff',
              border: accentTheme === 'cyan' ? '2px solid white' : 'none'
            }}
            onClick={() => setAccent('cyan')}
          >
            Cyan
          </button>
          <button
            className="bulk-btn"
            style={{
              background: '#10B981',
              color: '#fff',
              border: accentTheme === 'emerald' ? '2px solid white' : 'none'
            }}
            onClick={() => setAccent('emerald')}
          >
            Emerald
          </button>
        </div>
      </div>

      {/* 5. Alerts, Notifications & Audio Synthesizer */}
      <div className="set-card">
        <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: 800 }}>Smart Reminders & Chime</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '15px' }}>
          Dual Encouraging Alerts: 60m prep notification + 10m urgent motivational alert before every ritual.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn-primary"
            onClick={async () => {
              const granted = await notificationService.requestPermission();
              if (granted) showIsland('✅ Notifications Active');
              else showIsland('Permission Denied');
            }}
          >
            🔔 Enable Notifications
          </button>

          <button
            className="btn-secondary"
            style={{ borderColor: 'var(--success)', color: 'var(--success)' }}
            onClick={() => notificationService.testNotification(nextUpcomingTask, showIsland)}
          >
            🧪 Test Alert (5s Delay)
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '1px solid var(--border-glass)'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-1)' }}>
            Task Success Synthesizer Chime
          </span>
          <div className="mini-switch" style={{ width: '120px', marginBottom: 0 }}>
            <button
              className={`mini-opt ${profileForm.chimeEnabled ? 'active on' : ''}`}
              onClick={() => {
                setProfileForm({ ...profileForm, chimeEnabled: true });
                updateUserProfile({ chimeEnabled: true });
              }}
            >
              ON
            </button>
            <button
              className={`mini-opt ${!profileForm.chimeEnabled ? 'active off' : ''}`}
              onClick={() => {
                setProfileForm({ ...profileForm, chimeEnabled: false });
                updateUserProfile({ chimeEnabled: false });
              }}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* 6. Schedule Editor */}
      <div className="set-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Schedule Config</h3>
          <select
            value={selectedEditorDay}
            onChange={(e) => handleDaySelectChange(e.target.value as DayName)}
            style={{
              background: 'var(--border)',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.9rem',
              outline: 'none',
              borderRadius: '10px',
              padding: '6px 12px'
            }}
          >
            <option value="mon">Monday</option>
            <option value="tue">Tuesday</option>
            <option value="wed">Wednesday</option>
            <option value="thu">Thursday</option>
            <option value="fri">Friday</option>
            <option value="sat">Saturday</option>
            <option value="sun">Sunday</option>
          </select>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '15px' }}>
          Tap an item to expand. Food suggestions automatically autocomplete based on the activity name.
        </p>

        {/* Datalists for autocompletion */}
        <datalist id="list-breakfast">
          <option value="Moong Dal Chilla (2) + Mint Chutney" />
          <option value="Besan Chilla + Grated Paneer" />
          <option value="Oats Veggie Chilla (2) + Curd" />
          <option value="Ragi Dosa (2) + Tomato Chutney" />
          <option value="Veg Poha (60g) + Sprouts + Peanuts" />
          <option value="2 Idli + Thick Dal Sambhar" />
          <option value="Grilled Paneer Sandwich (Brown Bread)" />
          <option value="Vegetable Dalia Porridge + Chaas" />
        </datalist>

        <datalist id="list-lunch">
          <option value="2 Roti + Rajma (150g) + Cucumber Salad" />
          <option value="1 Roti + Chole + 1 Bowl Curd" />
          <option value="Palak Paneer + 2 Rotis + Salad" />
          <option value="Kala Chana Curry + 2 Rotis + Beet Salad" />
          <option value="2 Roti + Soya Chunks Sabzi + Salad" />
          <option value="1 Cup Rice + Dal Tadka + Curd + Salad" />
          <option value="1 Roti + Mix Veg Sabzi + Dal" />
          <option value="Moong Dal Khichdi + 1 tsp Ghee + Curd" />
        </datalist>

        <datalist id="list-dinner">
          <option value="Paneer Bhurji (100g) + Spinach" />
          <option value="Tofu Bhurji (120g) + Bell Peppers" />
          <option value="Grilled Paneer (100g) + Vegetable Soup" />
          <option value="Methi Paneer (100g) + Sautéed Zucchini" />
          <option value="Stir Fry Veggies + Sautéed Paneer (80g)" />
          <option value="Bhindi Fry + Yellow Moong Dal" />
          <option value="Besan Chilla (2) + Salad" />
        </datalist>

        <datalist id="list-snack">
          <option value="1 Banana + Black Coffee + Flaxseeds" />
          <option value="1 Scoop Whey Protein + Water" />
          <option value="Chana Sattu Drink (40g) + Jeera + Lemon" />
          <option value="Steamed Moong Sprouts Chaat (100g)" />
          <option value="5 Soaked Almonds + 1 Walnut" />
          <option value="Chia Seed Lime Hydrator" />
          <option value="Roasted Makhana (Foxnuts 30g)" />
        </datalist>

        <datalist id="list-workout">
          <option value="Full Body: Squats, Pushups, Lat Pulldown, Press" />
          <option value="Push Day: Bench Press, Incline DB Press, Lateral Raise" />
          <option value="Pull Day: Romanian Deadlift, Cable Rows, Curls" />
          <option value="Legs & Core: Leg Press, Lunges, Plank" />
          <option value="Home Calisthenics: Pushups, Bodyweight Squats, Dips" />
          <option value="Yoga & Mobility Routine (20 Mins)" />
        </datalist>

        <datalist id="list-general">
          <option value="500ml Warm Water + ½ Lemon + ACV" />
          <option value="Sleep in Pitch Black Room (Screens Away)" />
          <option value="Deep Focus Block (No Phone Distractions)" />
          <option value="Lights Out for 8 Hours Recovery" />
        </datalist>

        {/* Accordion Editor List */}
        <div className="editor-list">
          {editorTasks.map((item, index) => {
            const isOpen = openAccordionIdx === index;
            const datalistId = getSuggestionDatalistId(item.act);

            return (
              <div key={item.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                <div
                  className="accordion-header"
                  onClick={() => {
                    haptics.tap();
                    setOpenAccordionIdx(isOpen ? null : index);
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--primary)', marginRight: '10px' }}>{item.t}</span>
                    {item.act}
                  </div>
                  <div>{isOpen ? '▲' : '▼'}</div>
                </div>

                {isOpen && (
                  <div className="accordion-body fade-in" style={{ padding: '15px' }}>
                    <span className="sm-label">Time (e.g. 08:00 AM)</span>
                    <input
                      className="sm-input"
                      value={item.t}
                      onChange={(e) => handleTaskFieldChange(index, 't', e.target.value)}
                    />

                    <span className="sm-label">Activity Name</span>
                    <input
                      className="sm-input"
                      value={item.act}
                      onChange={(e) => handleTaskFieldChange(index, 'act', e.target.value)}
                    />

                    <span className="sm-label">Instruction / Meal</span>
                    <input
                      className="sm-input"
                      value={item.instr}
                      list={datalistId}
                      onChange={(e) => handleTaskFieldChange(index, 'instr', e.target.value)}
                      placeholder="What to do or eat?"
                    />

                    <span className="sm-label">Rule / Motivation</span>
                    <input
                      className="sm-input"
                      value={item.rule || ''}
                      onChange={(e) => handleTaskFieldChange(index, 'rule', e.target.value)}
                    />

                    <span className="sm-label">Type</span>
                    <select
                      className="sm-input"
                      value={item.type}
                      onChange={(e) => handleTaskFieldChange(index, 'type', e.target.value as TaskType)}
                      style={{ padding: '10px' }}
                    >
                      <option value="hack">Bio-Hack</option>
                      <option value="meal">Meal</option>
                      <option value="workout">Workout</option>
                      <option value="custom">Custom Activity</option>
                    </select>

                    <span className="sm-label">Reminder Notification</span>
                    <div className="mini-switch">
                      <button
                        className={`mini-opt ${item.reminder ? 'active on' : ''}`}
                        onClick={() => handleTaskFieldChange(index, 'reminder', true)}
                      >
                        ON
                      </button>
                      <button
                        className={`mini-opt ${!item.reminder ? 'active off' : ''}`}
                        onClick={() => handleTaskFieldChange(index, 'reminder', false)}
                      >
                        OFF
                      </button>
                    </div>

                    <button
                      className="btn-outline-danger"
                      style={{ marginTop: '12px' }}
                      onClick={() => handleDeleteTask(index)}
                    >
                      Delete Task Slot
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn-secondary" style={{ marginTop: '15px' }} onClick={handleAddNewTaskSlot}>
          + Add New Task Slot
        </button>

        <button className="btn-primary" style={{ marginTop: '12px' }} onClick={handleSaveSchedule}>
          Save Schedule Changes
        </button>
      </div>

      {/* 7. Bulk Operations */}
      <div className="set-card">
        <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: 800 }}>Bulk Operations</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
          Quickly toggle reminders across your entire weekly schedule.
        </p>
        <div className="bulk-grid">
          <button className="bulk-btn" onClick={() => bulkToggleReminders('meal', false)}>
            Mute All Meals
          </button>
          <button className="bulk-btn" onClick={() => bulkToggleReminders('meal', true)}>
            Unmute Meals
          </button>
          <button className="bulk-btn" onClick={() => bulkToggleReminders('hack', false)}>
            Mute All Hacks
          </button>
          <button className="bulk-btn" onClick={() => bulkToggleReminders('workout', false)}>
            Mute Workouts
          </button>
        </div>
      </div>

      {/* 8. Light Day Configuration */}
      <div className="set-card">
        <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: 800 }}>Light Day Configuration</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '12px' }}>
          Select which task types generate notifications on a Light Day.
        </p>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={store.lightDayTypes.includes('workout')}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...store.lightDayTypes, 'workout']
                  : store.lightDayTypes.filter((t) => t !== 'workout');
                updateLightDayTypes(next as TaskType[]);
              }}
            />
            Workouts (Default)
          </label>
          <label>
            <input
              type="checkbox"
              checked={store.lightDayTypes.includes('meal')}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...store.lightDayTypes, 'meal']
                  : store.lightDayTypes.filter((t) => t !== 'meal');
                updateLightDayTypes(next as TaskType[]);
              }}
            />
            Meals
          </label>
          <label>
            <input
              type="checkbox"
              checked={store.lightDayTypes.includes('hack')}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...store.lightDayTypes, 'hack']
                  : store.lightDayTypes.filter((t) => t !== 'hack');
                updateLightDayTypes(next as TaskType[]);
              }}
            />
            Bio-Hacks
          </label>
        </div>
      </div>

      {/* 9. Danger Zone */}
      <div className="set-card" style={{ border: '1px solid var(--danger)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--danger)', fontSize: '1.1rem', fontWeight: 800 }}>Danger Zone</h3>
        <button
          className="btn-primary"
          style={{
            background: 'rgba(255, 149, 0, 0.1)',
            border: '2px solid #FF9500',
            color: '#FF9500',
            marginBottom: '10px'
          }}
          onClick={() => {
            if (confirm("Reset all completion checkboxes for this week?")) {
              resetWeeklyCheckboxes();
            }
          }}
        >
          Reset Week's Checkboxes
        </button>

        <button
          className="btn-outline-danger"
          onClick={() => {
            if (confirm("Factory Reset App? This deletes ALL local data permanently.")) {
              hardResetApp();
            }
          }}
        >
          Factory Reset App
        </button>
      </div>

      {/* Apple-style Auth / Cloud Sync Sheet */}
      <AuthSheet isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};
