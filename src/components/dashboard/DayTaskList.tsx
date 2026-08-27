import React, { useMemo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { TaskCard } from './TaskCard';
import { formatDateKey } from '../../utils/dateUtils';
import { timeToMinutes } from '../../utils/timeUtils';
import { getMealPlanForDate } from '../../services/dietPlannerEngine';
import { DayName, ScheduleTask } from '../../types';

interface DayTaskListProps {
  onOpenOneOffSheet: () => void;
  onOpenTaskSupport: (task: ScheduleTask) => void;
}

export const DayTaskList: React.FC<DayTaskListProps> = ({
  onOpenOneOffSheet,
  onOpenTaskSupport
}) => {
  const {
    store,
    viewedDate,
    activeDayTab,
    setActiveDayTab,
    toggleTask,
    deleteOneOffTask
  } = usePlanner();

  const dateKey = formatDateKey(viewedDate);
  const todayKey = formatDateKey(new Date());
  const isViewingToday = dateKey === todayKey;
  const dayMode = store.dayModes[dateKey] || 'active';

  const weekdays: { id: DayName; label: string }[] = [
    { id: 'mon', label: 'Mon' },
    { id: 'tue', label: 'Tue' },
    { id: 'wed', label: 'Wed' },
    { id: 'thu', label: 'Thu' },
    { id: 'fri', label: 'Fri' },
    { id: 'sat', label: 'Sat' },
    { id: 'sun', label: 'Sun' }
  ];

  const recurringTasks = store.schedule[activeDayTab] || [];
  const oneOffTasks = store.dateTasks[dateKey] || [];

  // Seamlessly fetch today's exact 15-day / PCOS tailored diet plan
  const dayDiet = useMemo(() => {
    return getMealPlanForDate(viewedDate, store.user);
  }, [viewedDate, store.user]);

  const isPcos = (store.user.femaleConsiderations || []).includes('pcos') || (store.user.femaleConsiderations || []).includes('pcod');

  // Dynamically blend the personalized diet plan directly into the daily tasks timeline
  const combinedTasks = useMemo(() => {
    const combined = [
      ...recurringTasks.map((t) => {
        const taskCopy = { ...t, isRecurring: true };
        const actLower = t.act.toLowerCase();

        if (t.type === 'meal' || actLower.includes('breakfast') || actLower.includes('lunch') || actLower.includes('dinner') || actLower.includes('snack')) {
          if (actLower.includes('breakfast') || actLower.includes('bf')) {
            taskCopy.act = 'Breakfast';
            taskCopy.instr = `${dayDiet.breakfast.name} (${dayDiet.breakfast.estimatedNutrition.calories} kcal • ${dayDiet.breakfast.estimatedNutrition.proteinGrams}g P)`;
            taskCopy.rule = isPcos ? '🌸 PCOS Low-GI Protocol' : 'Prime Morning Energy';
          } else if (actLower.includes('lunch')) {
            taskCopy.act = 'Lunch';
            taskCopy.instr = `${dayDiet.lunch.name} (${dayDiet.lunch.estimatedNutrition.calories} kcal • ${dayDiet.lunch.estimatedNutrition.proteinGrams}g P)`;
            taskCopy.rule = isPcos ? '🌸 Low-GI Insulin Balance' : 'Sustained Focus Fuel';
          } else if (actLower.includes('dinner')) {
            taskCopy.act = 'Dinner';
            taskCopy.instr = `${dayDiet.dinner.name} (${dayDiet.dinner.estimatedNutrition.calories} kcal • ${dayDiet.dinner.estimatedNutrition.proteinGrams}g P)`;
            taskCopy.rule = isPcos ? '🌸 Zero Glucose Spike Dinner' : 'Slow Casein Rest';
          } else if (actLower.includes('snack') || actLower.includes('pre') || actLower.includes('post') || actLower.includes('nap')) {
            const snack = dayDiet.snacks[0];
            if (snack) {
              taskCopy.act = 'Mid-Day Fuel';
              taskCopy.instr = `${snack.name} (${snack.estimatedNutrition.calories} kcal)`;
              taskCopy.rule = isPcos ? '🌸 Hormonal Stability' : 'Metabolic Energy';
            }
          }
        }
        return taskCopy;
      }),
      ...oneOffTasks.map((t) => ({ ...t, isRecurring: false }))
    ];

    return combined.sort((a, b) => timeToMinutes(a.t) - timeToMinutes(b.t));
  }, [recurringTasks, oneOffTasks, dayDiet, isPcos]);

  // Determine live active task index today
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  let liveTaskId: string | null = null;
  if (isViewingToday) {
    for (const t of combinedTasks) {
      if (timeToMinutes(t.t) > nowMins) {
        liveTaskId = t.id;
        break;
      }
    }
  }

  return (
    <div className="task-list-section">
      {/* Weekday Tabs */}
      <div className="tabs">
        {weekdays.map((w) => (
          <button
            key={w.id}
            className={`tab-btn ${activeDayTab === w.id ? 'active' : ''}`}
            onClick={() => setActiveDayTab(w.id)}
          >
            {w.label}
          </button>
        ))}
      </div>

      {/* Header & Add One-off task */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 clamp(12px, 3.5vw, 18px) 10px',
          marginTop: '4px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.3px', margin: 0 }}>
            Today's Rituals
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-2)', fontWeight: 600 }}>
            {combinedTasks.filter((t) => store.history[`${dateKey}-${t.id}`]).length} of {combinedTasks.length} Completed
          </span>
        </div>

        <button
          onClick={onOpenOneOffSheet}
          style={{
            background: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '16px',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px var(--primary-dim)'
          }}
        >
          + Add Today's Task
        </button>
      </div>

      {/* Task Cards List */}
      <div className="task-list" style={{ paddingBottom: '20px' }}>
        {combinedTasks.map((task) => {
          const isDone = !!store.history[`${dateKey}-${task.id}`];
          return (
            <TaskCard
              key={task.id}
              task={task}
              isDone={isDone}
              dateKey={dateKey}
              dayMode={dayMode}
              lightDayTypes={store.lightDayTypes}
              isLiveActive={task.id === liveTaskId}
              onToggle={() => toggleTask(task.id)}
              onDeleteOneOff={!task.isRecurring ? () => deleteOneOffTask(task.id) : undefined}
              onOpenTaskSupport={() => onOpenTaskSupport(task)}
            />
          );
        })}

        {combinedTasks.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '30px 20px',
              color: 'var(--text-2)',
              fontSize: '0.9rem'
            }}
          >
            No scheduled tasks for this day. Tap "+ Add Today's Task" to schedule an activity!
          </div>
        )}
      </div>
    </div>
  );
};
