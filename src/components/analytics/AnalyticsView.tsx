import React, { useState, useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { calculateBMI } from '../../services/bmiEngine';
import { calculateStreak } from '../../services/streakEngine';
import { calculateNutritionTargets } from '../../services/personalizationEngine';
import { formatDateKey, DAYS_OF_WEEK, addDays } from '../../utils/dateUtils';
import { haptics } from '../../utils/haptics';
import { DayName } from '../../types';

export const AnalyticsView: React.FC = () => {
  const { store, viewedDate, setViewedDate, setCurrentView } = usePlanner();
  const [calDate, setCalDate] = useState<Date>(new Date());
  const [selectedCalDay, setSelectedCalDay] = useState<{
    dateKey: string;
    dayName: string;
    dayNum: number;
  } | null>(null);

  const dateKey = formatDateKey(viewedDate);
  const targets = useMemo(() => calculateNutritionTargets(store.user), [store.user]);
  const waterTotal = store.weights[dateKey]?.water || 0;

  // 1. Current Weight & BMI Calculation
  const startW = store.user.startWeightKg || 60;
  const currentW = parseFloat(String(store.weights[dateKey]?.am || store.user.currentWeightKg || startW));
  const goalW = store.user.goalWeightKg || (store.user.goal === 'fat_loss' ? startW - 5 : store.user.goal === 'muscle_gain' ? startW + 3 : startW);
  const bmiResult = useMemo(() => calculateBMI(currentW, store.user.heightCm), [currentW, store.user.heightCm]);

  // 2. Goal Timeline Projection
  const goalProjection = useMemo(() => {
    const isFatLoss = store.user.goal === 'fat_loss';
    const isMuscleGain = store.user.goal === 'muscle_gain';
    const weightToChange = Math.abs(currentW - goalW);

    if (weightToChange === 0) {
      return { weeks: 0, ratePerWeek: '0 kg', status: 'Goal Achieved! 🎉', progressPct: 100 };
    }

    // Standard safe physiological rate: 0.5 kg/week for fat loss, 0.25 kg/week for muscle gain
    const rate = isFatLoss ? 0.5 : isMuscleGain ? 0.25 : 0.35;
    const estWeeks = Math.ceil(weightToChange / rate);

    const totalTargetDiff = Math.abs(startW - goalW) || 1;
    const currentProgress = Math.min(100, Math.max(0, Math.round((Math.abs(startW - currentW) / totalTargetDiff) * 100)));

    return {
      weeks: estWeeks,
      ratePerWeek: `~${rate} kg/week`,
      status: `${estWeeks} Weeks to Target (${goalW} kg)`,
      progressPct: currentProgress
    };
  }, [currentW, goalW, startW, store.user.goal]);

  // 3. 7-Day Consistency & Macro Adherence
  const past7DaysData = useMemo(() => {
    const list = [];
    let totalTasksScheduled = 0;
    let totalTasksCompleted = 0;
    let daysWithFullHydration = 0;
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const d = addDays(today, -i);
      const k = formatDateKey(d);
      const dayName = DAYS_OF_WEEK[d.getDay()];
      const recurring = store.schedule[dayName] || [];
      const oneOff = store.dateTasks[k] || [];
      const allTasks = [...recurring, ...oneOff];

      let completed = 0;
      allTasks.forEach((t) => {
        if (store.history[`${k}-${t.id}`]) completed++;
      });

      totalTasksScheduled += allTasks.length;
      totalTasksCompleted += completed;

      const water = store.weights[k]?.water || 0;
      if (water >= 2500) daysWithFullHydration++;

      const completionPct = allTasks.length > 0 ? (completed / allTasks.length) * 100 : 0;
      list.push({
        dateKey: k,
        dayLabel: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
        completionPct,
        completed,
        total: allTasks.length
      });
    }

    const weeklyScore = totalTasksScheduled > 0 ? Math.round((totalTasksCompleted / totalTasksScheduled) * 100) : 0;
    return {
      dailyBars: list,
      weeklyScore,
      totalCompleted: totalTasksCompleted,
      totalScheduled: totalTasksScheduled,
      daysWithFullHydration
    };
  }, [store.schedule, store.dateTasks, store.history, store.weights]);

  // 4. Unified Streak Calculation
  const streakInfo = useMemo(() => calculateStreak(store.history, store.schedule, store.dayModes, store.dateTasks, 0), [store.history, store.schedule, store.dayModes, store.dateTasks]);

  // 5. 30-Day Activity Calendar
  const calendarData = useMemo(() => {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = formatDateKey(new Date());

    let perfectCount = 0;
    let totalCompleted = 0;
    let totalTasks = 0;

    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ empty: true, key: `empty_${i}` });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const iter = new Date(year, month, i, 12, 0, 0);
      const k = formatDateKey(iter);
      const dayName = DAYS_OF_WEEK[iter.getDay()];
      const recurring = store.schedule[dayName] || [];
      const oneOff = store.dateTasks[k] || [];
      const tasks = [...recurring, ...oneOff];

      let done = 0;
      tasks.forEach((t) => {
        if (store.history[`${k}-${t.id}`]) done++;
      });

      if (iter <= new Date() && tasks.length > 0) {
        totalTasks += tasks.length;
        totalCompleted += done;
      }

      let levelClass = 'cal-level-0';
      if (tasks.length > 0 && done > 0) {
        const pct = done / tasks.length;
        if (pct === 1) {
          levelClass = 'cal-level-3';
          perfectCount++;
        } else if (pct >= 0.5) {
          levelClass = 'cal-level-2';
        } else {
          levelClass = 'cal-level-1';
        }
      }

      cells.push({
        empty: false,
        key: k,
        dayNum: i,
        dayName,
        isToday: k === todayStr,
        levelClass
      });
    }

    const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
    return {
      monthLabel: calDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      cells,
      perfectCount,
      completionRate
    };
  }, [calDate, store.schedule, store.dateTasks, store.history]);

  // 6. Actionable Protocol Coaching Recommendations
  const coachingTips = useMemo(() => {
    const tips: { icon: string; title: string; desc: string; type: 'success' | 'warn' | 'info' }[] = [];

    // Consistency tip
    if (past7DaysData.weeklyScore >= 80) {
      tips.push({
        icon: '🏆',
        title: 'Elite Protocol Adherence',
        desc: `You’ve completed ${past7DaysData.totalCompleted} habits this week. Your metabolic rhythm is locked in!`,
        type: 'success'
      });
    } else {
      tips.push({
        icon: '🎯',
        title: 'Habit Consistency Focus',
        desc: 'Focus on completing your morning wakeup & first meal on schedule to boost circadian compliance above 85%.',
        type: 'warn'
      });
    }

    // Nutrition / Goal Tip
    if (store.user.goal === 'fat_loss') {
      tips.push({
        icon: '🔥',
        title: 'High Thermic Protein Pacing',
        desc: `Targeting ${targets.targetProteinGrams}g daily protein increases satiety and elevates the thermic effect of food (TEF) by up to 25%.`,
        type: 'info'
      });
    } else if (store.user.goal === 'muscle_gain') {
      tips.push({
        icon: '💪',
        title: 'Hypertrophy Recovery Window',
        desc: `Ensure ${Math.round(targets.targetProteinGrams / 4)}g protein is consumed within 90 minutes post-training for maximal muscle protein synthesis.`,
        type: 'info'
      });
    } else {
      tips.push({
        icon: '🥗',
        title: 'Plant Micronutrient Diversity',
        desc: 'Incorporate at least 3 distinct vegetable colors daily to nourish gut microbiome diversity.',
        type: 'info'
      });
    }

    // Hydration / Sleep Tip
    if (waterTotal < 2000) {
      tips.push({
        icon: '💧',
        title: 'Front-Load Daytime Hydration',
        desc: 'Drink 1.5L before 2 PM to maintain peak cognitive focus and avoid midnight sleep disruptions.',
        type: 'warn'
      });
    } else {
      tips.push({
        icon: '💤',
        title: 'Circadian Sleep Window Locked',
        desc: `Maintaining your ${store.user.wakeTime || '06:30 AM'} wake-up time keeps cortisol and melatonin cycles in sync.`,
        type: 'success'
      });
    }

    return tips;
  }, [past7DaysData, store.user.goal, targets.targetProteinGrams, waterTotal, store.user.wakeTime]);

  return (
    <div style={{ paddingTop: '12px', width: '100%' }}>
      {/* 1. Top Health Intelligence Hero Gauge */}
      <div className="set-card" style={{ margin: '0 20px 14px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Health Intelligence Suite
            </div>
            <h2 style={{ margin: '2px 0 0 0', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-1)' }}>
              Metabolic Discipline
            </h2>
          </div>

          <span
            style={{
              background: past7DaysData.weeklyScore >= 75 ? 'rgba(52, 199, 89, 0.15)' : 'var(--primary-dim)',
              color: past7DaysData.weeklyScore >= 75 ? '#34C759' : 'var(--primary)',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: 800
            }}
          >
            {past7DaysData.weeklyScore >= 80 ? '🌟 Elite Tier' : past7DaysData.weeklyScore >= 50 ? '📈 Consistent' : '🌱 Building'}
          </span>
        </div>

        {/* 3 Core Metric Rings Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {/* Weekly Habit Completion */}
          <div
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-glass)',
              borderRadius: '18px',
              padding: '12px 10px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--primary)' }}>
              {past7DaysData.weeklyScore}%
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', marginTop: '2px' }}>
              7D HABITS
            </div>
          </div>

          {/* Active Streak */}
          <div
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-glass)',
              borderRadius: '18px',
              padding: '12px 10px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FF9500' }}>
              {streakInfo.streak}d
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', marginTop: '2px' }}>
              STREAK 🔥
            </div>
          </div>

          {/* Hydration Consistency */}
          <div
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-glass)',
              borderRadius: '18px',
              padding: '12px 10px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#007AFF' }}>
              {past7DaysData.daysWithFullHydration}/7
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-2)', marginTop: '2px' }}>
              HYDRO DAYS
            </div>
          </div>
        </div>
      </div>

      {/* 2. Goal Trajectory & Timeline Projection Card */}
      <div className="set-card" style={{ margin: '0 20px 14px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
              Goal Trajectory • {store.user.goal?.replace('_', ' ').toUpperCase()}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-1)', marginTop: '2px' }}>
              {goalProjection.status}
            </div>
          </div>
          <span style={{ fontSize: '1.3rem' }}>🎯</span>
        </div>

        {/* Progress Bar */}
        <div style={{ margin: '12px 0 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-2)', marginBottom: '4px' }}>
            <span>Start: {startW} kg</span>
            <span style={{ color: 'var(--primary)' }}>Current: {currentW} kg</span>
            <span>Target: {goalW} kg</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--surface-2)', borderRadius: '6px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${goalProjection.progressPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary), #34C759)',
                borderRadius: '6px',
                transition: 'width 0.5s ease'
              }}
            />
          </div>
        </div>

        {/* BMI & Stats Pill */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
            <strong>BMI:</strong> {bmiResult.bmiString} ({bmiResult.status})
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800 }}>
            Pacing: {goalProjection.ratePerWeek}
          </div>
        </div>
      </div>

      {/* 3. 7-Day Consistency Bar Chart */}
      <div className="set-card" style={{ margin: '0 20px 14px', padding: '18px 20px' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', marginBottom: '10px' }}>
          7-Day Ritual Completion Flow
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '110px', paddingTop: '10px' }}>
          {past7DaysData.dailyBars.map((bar) => {
            const h = bar.total > 0 ? Math.max(12, (bar.completionPct / 100) * 80) : 6;
            const isFull = bar.completionPct === 100;
            return (
              <div key={bar.dateKey} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: isFull ? '#34C759' : 'var(--text-2)' }}>
                  {bar.completed}/{bar.total}
                </div>
                <div
                  style={{
                    width: '24px',
                    height: `${h}px`,
                    borderRadius: '8px',
                    background: isFull
                      ? 'linear-gradient(180deg, #34C759, #30D158)'
                      : bar.completionPct > 0
                      ? 'linear-gradient(180deg, var(--primary), var(--primary-dim))'
                      : 'var(--border)',
                    boxShadow: isFull ? '0 0 10px rgba(52, 199, 89, 0.4)' : 'none',
                    transition: 'all 0.4s ease'
                  }}
                />
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-1)' }}>
                  {bar.dayLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Actionable AI Protocol Coaching Insights */}
      <div className="set-card" style={{ margin: '0 20px 14px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '1rem' }}>💡</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Actionable Protocol Insights
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {coachingTips.map((tip, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border-glass)',
                borderRadius: '16px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}
            >
              <span style={{ fontSize: '1.25rem', marginTop: '2px' }}>{tip.icon}</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-1)', marginBottom: '2px' }}>
                  {tip.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-2)', lineHeight: 1.4 }}>
                  {tip.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 30-Day Activity Heatmap Grid */}
      <div className="set-card" style={{ margin: '0 20px 14px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button
            onClick={() => {
              haptics.tap();
              setCalDate((prev) => {
                const n = new Date(prev);
                n.setMonth(n.getMonth() - 1);
                return n;
              });
            }}
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-glass)', borderRadius: '50%', width: '30px', height: '30px', color: 'var(--text-1)', cursor: 'pointer', fontWeight: 800 }}
          >
            ←
          </button>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--text-1)' }}>{calendarData.monthLabel}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 800 }}>
              {calendarData.perfectCount} Perfect Days ({calendarData.completionRate}%)
            </div>
          </div>

          <button
            onClick={() => {
              haptics.tap();
              setCalDate((prev) => {
                const n = new Date(prev);
                n.setMonth(n.getMonth() + 1);
                return n;
              });
            }}
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-glass)', borderRadius: '50%', width: '30px', height: '30px', color: 'var(--text-1)', cursor: 'pointer', fontWeight: 800 }}
          >
            →
          </button>
        </div>

        {/* Heatmap Grid */}
        <div className="cal-grid">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className="cal-day-name" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-3)' }}>
              {d}
            </div>
          ))}

          {calendarData.cells.map((cell) => {
            if (cell.empty || !cell.dayName || cell.dayNum === undefined) {
              return <div key={cell.key} className="cal-cell cal-empty" />;
            }
            return (
              <div
                key={cell.key}
                className={`cal-cell ${cell.levelClass} ${cell.isToday ? 'cal-today' : ''}`}
                onClick={() => {
                  haptics.tap();
                  setSelectedCalDay({
                    dateKey: cell.key,
                    dayName: cell.dayName!,
                    dayNum: cell.dayNum!
                  });
                }}
              >
                {cell.dayNum}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Day Detail Drilldown Panel */}
      {selectedCalDay && (
        <div className="set-card fade-in" style={{ margin: '0 20px 24px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 900, color: 'var(--text-1)' }}>
              {selectedCalDay.dayName.toUpperCase()} — {selectedCalDay.dateKey}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="apply-week-btn"
                onClick={() => {
                  const parts = selectedCalDay.dateKey.split('-');
                  setViewedDate(new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
                  setCurrentView('dashboard');
                }}
              >
                Go to Date ↗
              </button>
              <button
                onClick={() => setSelectedCalDay(null)}
                style={{
                  background: 'var(--border)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  fontWeight: 700,
                  color: 'var(--text-2)',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.8 }}>
            {(() => {
              const recurring = store.schedule[selectedCalDay.dayName as DayName] || [];
              const oneOff = store.dateTasks[selectedCalDay.dateKey] || [];
              const tasks = [...recurring, ...oneOff];
              const waterLogged = store.weights[selectedCalDay.dateKey]?.water || 0;

              if (tasks.length === 0) return <span>No rituals scheduled.</span>;

              return (
                <>
                  {tasks.map((t) => {
                    const done = store.history[`${selectedCalDay.dateKey}-${t.id}`];
                    return (
                      <div
                        key={t.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 0',
                          borderBottom: '1px solid var(--border-glass)'
                        }}
                      >
                        <span>{done ? '✅' : '▫️'}</span>
                        <span style={{ color: 'var(--text-1)', fontWeight: 700 }}>
                          {t.t} — {t.act}
                        </span>
                      </div>
                    );
                  })}
                  <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-2)', fontWeight: 800 }}>
                    💧 Water Logged: {(waterLogged / 1000).toFixed(1)}L
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
