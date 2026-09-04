import React, { useState, useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { MealCard } from './MealCard';
import { MealAlternativeModal } from './MealAlternativeModal';
import { CuratedMeal, DayName } from '../../types';
import { calculateNutritionTargets } from '../../services/personalizationEngine';
import { getMealPlanForDate } from '../../services/dietPlannerEngine';
import { addDays, formatDateKey, getRelativeDateLabel, getDayName } from '../../utils/dateUtils';
import { timeToMinutes, minutesToTime, getTimeWindowStatus } from '../../utils/timeUtils';
import { haptics } from '../../utils/haptics';

interface DietPlanViewProps {
  onOpenGroceryModal?: () => void;
}

export const DietPlanView: React.FC<DietPlanViewProps> = ({ onOpenGroceryModal }) => {
  const { store, viewedDate, setViewedDate, replaceDietMeal, generateNewDietPlan, toggleTask } = usePlanner();

  const [activeSwapTarget, setActiveSwapTarget] = useState<{
    meal: CuratedMeal;
    slot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    snackIdx?: number;
  } | null>(null);

  const targets = calculateNutritionTargets(store.user);
  const isPcos = (store.user.femaleConsiderations || []).includes('pcos') || (store.user.femaleConsiderations || []).includes('pcod');
  const isIron = (store.user.femaleConsiderations || []).includes('iron_focus');

  // Compute 15-day continuous horizon starting from today
  const fifteenDaysHorizon = useMemo(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const list: { date: Date; key: string; label: string; dayNum: number; isToday: boolean }[] = [];

    for (let i = 0; i < 15; i++) {
      const d = addDays(today, i);
      const k = formatDateKey(d);
      const isToday = i === 0;
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      list.push({
        date: d,
        key: k,
        label: isToday ? 'Today' : dayLabel,
        dayNum: d.getDate(),
        isToday
      });
    }
    return list;
  }, []);

  const activeDateKey = formatDateKey(viewedDate);
  const activeDayName: DayName = getDayName(viewedDate);
  const { statusLabel, dateLabel, isToday } = getRelativeDateLabel(viewedDate);

  // Dynamic 15-day non-repeating meal plan for currently viewed calendar date
  const dayPlan = useMemo(() => {
    return getMealPlanForDate(viewedDate, store.user, store.dietPlan);
  }, [viewedDate, store.user, store.dietPlan]);

  // Fetch scheduled meal tasks from user's active schedule for the viewed day
  const dayScheduleTasks = store.schedule[activeDayName] || [];
  const oneOffTasks = store.dateTasks[activeDateKey] || [];
  const allDayTasks = [...dayScheduleTasks, ...oneOffTasks];

  const wakeMins = store.user.wakeTime ? timeToMinutes(store.user.wakeTime) : 360;
  const sleepMins = store.user.sleepTime ? timeToMinutes(store.user.sleepTime) : 1320;

  // Extract scheduled times or fallback to calculated biological windows
  const breakfastTask = allDayTasks.find((t) => t.type === 'meal' && t.act.toLowerCase().includes('breakfast')) ||
    allDayTasks.find((t) => t.act.toLowerCase().includes('breakfast'));
  const lunchTask = allDayTasks.find((t) => t.type === 'meal' && t.act.toLowerCase().includes('lunch')) ||
    allDayTasks.find((t) => t.act.toLowerCase().includes('lunch'));
  const dinnerTask = allDayTasks.find((t) => t.type === 'meal' && t.act.toLowerCase().includes('dinner')) ||
    allDayTasks.find((t) => t.act.toLowerCase().includes('dinner'));
  const snackTasks = allDayTasks.filter((t) => t.type === 'meal' && (t.act.toLowerCase().includes('snack') || t.act.toLowerCase().includes('fuel')));

  const breakfastTime = breakfastTask?.t || minutesToTime(wakeMins + 90);
  const lunchTime = lunchTask?.t || minutesToTime(wakeMins + 330);
  const dinnerTime = dinnerTask?.t || minutesToTime(Math.min(sleepMins - 120, wakeMins + 720));
  const snackTime1 = snackTasks[0]?.t || minutesToTime(wakeMins + 540);
  const snackTime2 = snackTasks[1]?.t || minutesToTime(wakeMins + 660);

  // Status windows
  const bfWindow = getTimeWindowStatus(breakfastTime, isToday);
  const lunchWindow = getTimeWindowStatus(lunchTime, isToday);
  const dinnerWindow = getTimeWindowStatus(dinnerTime, isToday);
  const snackWindow1 = getTimeWindowStatus(snackTime1, isToday);
  const snackWindow2 = getTimeWindowStatus(snackTime2, isToday);

  // Task completion statuses
  const isBfDone = breakfastTask ? !!store.history[`${activeDateKey}-${breakfastTask.id}`] : false;
  const isLunchDone = lunchTask ? !!store.history[`${activeDateKey}-${lunchTask.id}`] : false;
  const isDinnerDone = dinnerTask ? !!store.history[`${activeDateKey}-${dinnerTask.id}`] : false;

  // Contextual Daily Nutrition Tip
  const dailyTip = useMemo(() => {
    const dayIndex = Math.abs(viewedDate.getDate() + viewedDate.getMonth() * 30) % 5;
    const tips = [
      '💡 Fiber-First Rule: Eat fresh cucumber/salad 5 mins before meals to blunt glucose absorption by up to 35%.',
      '💡 Chewing Architecture: Chew each bite 20-25 times to stimulate cephalic GLP-1 and satiety peptides.',
      '💡 Post-Meal Walk: A brisk 10-minute walk after lunch/dinner clears up to 40% of postprandial glucose spike.',
      '💡 Hydration Buffer: Avoid drinking large glasses of chilled water during meals; hydrate 30 mins before or after.',
      '💡 Casein Window: Dairy casein and tofu at dinner provide slow-release amino acids throughout your sleep cycle.'
    ];
    return tips[dayIndex];
  }, [viewedDate]);

  return (
    <div style={{ paddingTop: '12px', width: '100%' }}>
      {/* 1. Target & Variety Banner */}
      <div className="set-card" style={{ marginBottom: '15px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <div className="brand-gradient" style={{ fontSize: '1.2rem', fontWeight: 900 }}>
              15-Day Indian Vegetarian Protocol
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginTop: '2px' }}>
              Target: ~{targets.targetCalories} kcal • {targets.targetProteinGrams}g Protein
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#34C759' }}>
              100%
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-2)' }}>
              15-DAY VARIETY
            </div>
          </div>
        </div>

        {/* PCOS / Iron Active Filter Pill */}
        {isPcos && (
          <div
            style={{
              background: 'rgba(255, 45, 85, 0.12)',
              border: '1px solid rgba(255, 45, 85, 0.3)',
              color: '#FF2D55',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🌸</span>
            <span>PCOS / PCOD Protocol Active: Low Glycemic Index • Insulin Balancing</span>
          </div>
        )}

        {isIron && (
          <div
            style={{
              background: 'rgba(255, 59, 48, 0.12)',
              border: '1px solid rgba(255, 59, 48, 0.3)',
              color: '#FF3B30',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🩸</span>
            <span>Iron-Boost Active: Spinach, Beetroot & Legume Focus with Vitamin C</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button
            onClick={() => {
              haptics.medium();
              if (onOpenGroceryModal) onOpenGroceryModal();
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              background: 'var(--primary-dim)',
              border: '1px solid var(--primary-glow)',
              color: 'var(--primary)',
              borderRadius: '16px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>🛒</span>
            <span>Smart Grocery List</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => {
              generateNewDietPlan();
              haptics.triumph();
            }}
            style={{ flex: 1, padding: '10px' }}
          >
            🔄 Refresh Variety
          </button>
        </div>
      </div>

      {/* 2. 15-Day Horizontal Calendar Day Strip */}
      <div style={{ padding: '0 20px 8px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-2)' }}>
        15-DAY CALENDAR SCHEDULE (NO REPEATS)
      </div>
      <div
        className="tabs"
        style={{
          display: 'flex',
          gap: '8px',
          padding: '0 20px 14px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory'
        }}
      >
        {fifteenDaysHorizon.map((day) => {
          const isSelected = day.key === activeDateKey;
          return (
            <button
              key={day.key}
              onClick={() => {
                haptics.tap();
                setViewedDate(day.date);
              }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: 'start',
                minWidth: '58px',
                padding: '10px 8px',
                borderRadius: '16px',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                background: isSelected ? 'var(--primary)' : 'var(--surface)',
                color: isSelected ? '#ffffff' : 'var(--text-1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 15px var(--primary-dim)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', opacity: isSelected ? 1 : 0.7 }}>
                {day.label}
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>
                {day.dayNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Daily Context Tip Card */}
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
        {dailyTip}
      </div>

      {/* 4. Selected Day's Meals */}
      <div style={{ padding: '0 20px calc(140px + env(safe-area-inset-bottom))' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: 'var(--text-2)',
            fontWeight: 800,
            margin: '4px 4px 14px'
          }}
        >
          <span>{statusLabel}, {dateLabel}</span>
          <span style={{ color: 'var(--primary)' }}>
            ~{dayPlan.totalCalories} kcal • {dayPlan.totalProtein}g Protein
          </span>
        </div>

        {/* Breakfast Card */}
        <MealCard
          slotTitle="Breakfast"
          scheduledTime={breakfastTime}
          meal={dayPlan.breakfast}
          windowStatus={bfWindow}
          isCompleted={isBfDone}
          onToggleCompleted={breakfastTask ? () => toggleTask(breakfastTask.id) : undefined}
          onOpenSwapModal={() =>
            setActiveSwapTarget({
              meal: dayPlan.breakfast,
              slot: 'breakfast'
            })
          }
        />

        {/* Lunch Card */}
        <MealCard
          slotTitle="Lunch"
          scheduledTime={lunchTime}
          meal={dayPlan.lunch}
          windowStatus={lunchWindow}
          isCompleted={isLunchDone}
          onToggleCompleted={lunchTask ? () => toggleTask(lunchTask.id) : undefined}
          onOpenSwapModal={() =>
            setActiveSwapTarget({
              meal: dayPlan.lunch,
              slot: 'lunch'
            })
          }
        />

        {/* Dinner Card */}
        <MealCard
          slotTitle="Dinner"
          scheduledTime={dinnerTime}
          meal={dayPlan.dinner}
          windowStatus={dinnerWindow}
          isCompleted={isDinnerDone}
          onToggleCompleted={dinnerTask ? () => toggleTask(dinnerTask.id) : undefined}
          onOpenSwapModal={() =>
            setActiveSwapTarget({
              meal: dayPlan.dinner,
              slot: 'dinner'
            })
          }
        />

        {/* Snack Cards */}
        {(dayPlan.snacks || []).map((snack, idx) => {
          const sTime = idx === 0 ? snackTime1 : snackTime2;
          const sWindow = idx === 0 ? snackWindow1 : snackWindow2;
          const sTask = snackTasks[idx];
          const isSnackDone = sTask ? !!store.history[`${activeDateKey}-${sTask.id}`] : false;

          return (
            <MealCard
              key={idx}
              slotTitle={`Mid-Day / Evening Fuel ${idx + 1}`}
              scheduledTime={sTime}
              meal={snack}
              windowStatus={sWindow}
              isCompleted={isSnackDone}
              onToggleCompleted={sTask ? () => toggleTask(sTask.id) : undefined}
              onOpenSwapModal={() =>
                setActiveSwapTarget({
                  meal: snack,
                  slot: 'snack',
                  snackIdx: idx
                })
              }
            />
          );
        })}
      </div>

      {/* Alternative Swap Modal */}
      {activeSwapTarget && (
        <MealAlternativeModal
          currentMeal={activeSwapTarget.meal}
          day={activeDayName}
          slot={activeSwapTarget.slot}
          snackIdx={activeSwapTarget.snackIdx}
          onSelectAlternative={(replacement) => {
            replaceDietMeal(
              activeDayName,
              activeSwapTarget.slot,
              replacement,
              activeSwapTarget.snackIdx
            );
            setActiveSwapTarget(null);
          }}
          onClose={() => setActiveSwapTarget(null)}
        />
      )}
    </div>
  );
};

