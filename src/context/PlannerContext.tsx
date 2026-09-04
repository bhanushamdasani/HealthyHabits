import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  AppDataStore,
  DayMode,
  DayReason,
  ScheduleTask,
  DayName,
  TaskType,
  UserProfile,
  CuratedMeal
} from '../types';
import { storageService, defaultUserProfile } from '../services/storageService';
import { formatDateKey, DAYS_OF_WEEK, getDayName, addDays } from '../utils/dateUtils';
import { soundService } from '../services/soundService';
import { haptics } from '../utils/haptics';
import { notificationService, ActiveTimerInfo } from '../services/notificationService';
import { generateSevenDayDietPlan, replaceMealInPlan, replaceSingleDayMeal, getMealPlanForDate } from '../services/dietPlannerEngine';

interface PlannerContextType {
  store: AppDataStore;
  loading: boolean;
  viewedDate: Date;
  activeDayTab: DayName;
  currentView: 'dashboard' | 'diet' | 'workout' | 'analytics' | 'settings';
  islandMessage: string | null;
  activeTimers: ActiveTimerInfo[];
  confettiTrigger: number;
  // Actions
  setViewedDate: (date: Date) => void;
  changeDateByOffset: (offset: number) => void;
  setActiveDayTab: (day: DayName) => void;
  setCurrentView: (view: 'dashboard' | 'diet' | 'workout' | 'analytics' | 'settings') => void;
  showIsland: (msg: string) => void;
  toggleTask: (taskId: string) => void;
  setDayMode: (mode: DayMode) => void;
  setDayReason: (reason: DayReason) => void;
  applyModeToNextDays: (count?: number) => void;
  updateWater: (amountDelta: number) => void;
  logWeight: (type: 'am' | 'pm', value: number | string) => void;
  logSleep: (bedtime: string, waketime: string) => void;
  addOneOffTask: (task: Omit<ScheduleTask, 'id' | 'isRecurring'>) => void;
  deleteOneOffTask: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  saveCustomSchedule: (day: DayName, tasks: ScheduleTask[]) => void;
  bulkToggleReminders: (type: TaskType, state: boolean) => void;
  updateLightDayTypes: (types: TaskType[]) => void;
  generateNewDietPlan: () => void;
  replaceDietMeal: (day: DayName, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', replacement: CuratedMeal, snackIdx?: number, targetDate?: Date) => void;
  resetWeeklyCheckboxes: () => void;
  hardResetApp: () => void;
  triggerConfettiAnimation: () => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<AppDataStore>({
    user: defaultUserProfile,
    schedule: {} as any,
    history: {},
    dayModes: {},
    dayReasons: {},
    lightDayTypes: ['workout'],
    weights: {},
    sleepLogs: {},
    dateTasks: {},
    milestonesSeen: {}
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [viewedDate, setViewedDateState] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<'dashboard' | 'diet' | 'workout' | 'analytics' | 'settings'>('dashboard');
  const [islandMessage, setIslandMessage] = useState<string | null>(null);
  const [islandTimeoutId, setIslandTimeoutId] = useState<number | null>(null);
  const [activeTimers, setActiveTimers] = useState<ActiveTimerInfo[]>([]);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(0);

  // Initial Load from Storage / IndexedDB
  useEffect(() => {
    storageService.loadAppState().then((loaded) => {
      setStore(loaded);
      setLoading(false);
    });
  }, []);

  const showIsland = useCallback((msg: string) => {
    setIslandMessage(msg);
    if (islandTimeoutId) clearTimeout(islandTimeoutId);
    const tid = window.setTimeout(() => {
      setIslandMessage(null);
    }, 3000);
    setIslandTimeoutId(tid);
  }, [islandTimeoutId]);

  // Rebuild notification queue when schedule, mode, or history changes
  useEffect(() => {
    if (!loading && store.schedule) {
      const timers = notificationService.rebuildQueue(
        store.schedule,
        store.history,
        store.dayModes,
        store.lightDayTypes,
        store.dateTasks,
        showIsland
      );
      setActiveTimers(timers);
    }
  }, [store.schedule, store.history, store.dayModes, store.lightDayTypes, store.dateTasks, loading, showIsland]);

  const updateAndSaveStore = useCallback((updater: (prev: AppDataStore) => AppDataStore) => {
    setStore((prev) => {
      const updated = updater(prev);
      storageService.saveAppState(updated);
      return updated;
    });
  }, []);

  const setViewedDate = useCallback((d: Date) => {
    haptics.light();
    setViewedDateState(d);
  }, []);

  const changeDateByOffset = useCallback((offset: number) => {
    haptics.tap();
    setViewedDateState((prev) => addDays(prev, offset));
  }, []);

  const activeDayTab = useMemo(() => {
    return getDayName(viewedDate);
  }, [viewedDate]);

  const setActiveDayTab = useCallback((dayName: DayName) => {
    haptics.tap();
    const currentIdx = viewedDate.getDay();
    const targetIdx = DAYS_OF_WEEK.indexOf(dayName);
    const diff = targetIdx - currentIdx;
    if (diff !== 0) {
      setViewedDateState((prev) => addDays(prev, diff));
    }
  }, [viewedDate]);

  const triggerConfettiAnimation = useCallback(() => {
    setConfettiTrigger((prev) => prev + 1);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    const dateKey = formatDateKey(viewedDate);
    const uid = `${dateKey}-${taskId}`;

    updateAndSaveStore((prev) => {
      const current = !!prev.history[uid];
      const next = !current;

      if (next) {
        haptics.success();
        if (prev.user.chimeEnabled) soundService.playSuccessChime(true);
      } else {
        haptics.cancel();
      }

      return {
        ...prev,
        history: {
          ...prev.history,
          [uid]: next
        }
      };
    });
  }, [viewedDate, updateAndSaveStore]);

  const setDayMode = useCallback((mode: DayMode) => {
    haptics.tap();
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => {
      const newModes = { ...prev.dayModes, [dateKey]: mode };
      const newReasons = { ...prev.dayReasons };
      if (mode === 'active') delete newReasons[dateKey];
      return {
        ...prev,
        dayModes: newModes,
        dayReasons: newReasons
      };
    });
  }, [viewedDate, updateAndSaveStore]);

  const setDayReason = useCallback((reason: DayReason) => {
    haptics.tap();
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => {
      if (prev.dayModes[dateKey] === 'active') return prev;
      return {
        ...prev,
        dayReasons: {
          ...prev.dayReasons,
          [dateKey]: reason
        }
      };
    });
  }, [viewedDate, updateAndSaveStore]);

  const applyModeToNextDays = useCallback((count: number = 6) => {
    haptics.medium();
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => {
      const mode = prev.dayModes[dateKey] || 'active';
      const reason = prev.dayReasons[dateKey];
      const newModes = { ...prev.dayModes };
      const newReasons = { ...prev.dayReasons };

      let iter = new Date(viewedDate);
      for (let i = 1; i <= count; i++) {
        iter = addDays(iter, 1);
        const k = formatDateKey(iter);
        newModes[k] = mode;
        if (reason) newReasons[k] = reason;
        else delete newReasons[k];
      }

      return {
        ...prev,
        dayModes: newModes,
        dayReasons: newReasons
      };
    });
    showIsland(`Applied mode to next ${count} days`);
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const updateWater = useCallback((amountDelta: number) => {
    haptics.medium();
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => {
      const dayWeight = prev.weights[dateKey] || { water: 0, waterLogs: [] };
      const currentWater = dayWeight.water || 0;
      const nextWater = Math.max(currentWater + amountDelta, 0);

      const logs = [...(dayWeight.waterLogs || [])];
      if (amountDelta > 0) {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        logs.push({ time: timeStr, amount: amountDelta });
      } else if (amountDelta < 0 && logs.length > 0) {
        logs.pop();
      }

      return {
        ...prev,
        weights: {
          ...prev.weights,
          [dateKey]: {
            ...dayWeight,
            water: nextWater,
            waterLogs: logs
          }
        }
      };
    });

    if (amountDelta > 0) {
      showIsland(`Water Added (+${amountDelta}ml)`);
    }
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const logWeight = useCallback((type: 'am' | 'pm', value: number | string) => {
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => {
      const dayWeight = prev.weights[dateKey] || { water: 0, waterLogs: [] };
      return {
        ...prev,
        weights: {
          ...prev.weights,
          [dateKey]: {
            ...dayWeight,
            [type]: value
          }
        }
      };
    });
    if (value) showIsland('Weight Logged');
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const logSleep = useCallback((bedtime: string, waketime: string) => {
    haptics.tap();
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => ({
      ...prev,
      sleepLogs: {
        ...prev.sleepLogs,
        [dateKey]: { bedtime, waketime }
      }
    }));
    showIsland('Sleep Logged');
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const addOneOffTask = useCallback((taskData: Omit<ScheduleTask, 'id' | 'isRecurring'>) => {
    haptics.medium();
    const dateKey = formatDateKey(viewedDate);
    const newTask: ScheduleTask = {
      ...taskData,
      id: `oneoff_${Date.now()}`,
      isRecurring: false
    };

    updateAndSaveStore((prev) => {
      const existing = prev.dateTasks[dateKey] || [];
      return {
        ...prev,
        dateTasks: {
          ...prev.dateTasks,
          [dateKey]: [...existing, newTask]
        }
      };
    });
    showIsland("Today's Task Added");
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const deleteOneOffTask = useCallback((id: string) => {
    haptics.delete();
    const dateKey = formatDateKey(viewedDate);
    updateAndSaveStore((prev) => {
      const existing = prev.dateTasks[dateKey] || [];
      return {
        ...prev,
        dateTasks: {
          ...prev.dateTasks,
          [dateKey]: existing.filter((t) => t.id !== id)
        }
      };
    });
    showIsland('Task Deleted');
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const updateUserProfile = useCallback((profileUpdates: Partial<UserProfile>) => {
    haptics.tap();
    updateAndSaveStore((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...profileUpdates
      }
    }));
    showIsland('Profile Saved');
  }, [updateAndSaveStore, showIsland]);

  const saveCustomSchedule = useCallback((day: DayName, tasks: ScheduleTask[]) => {
    haptics.medium();
    updateAndSaveStore((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: tasks
      }
    }));
    showIsland('Schedule Saved & Sorted');
  }, [updateAndSaveStore, showIsland]);

  const bulkToggleReminders = useCallback((type: TaskType, state: boolean) => {
    haptics.medium();
    let count = 0;
    updateAndSaveStore((prev) => {
      const updatedSchedule = { ...prev.schedule };
      Object.keys(updatedSchedule).forEach((dayKey) => {
        const day = dayKey as DayName;
        updatedSchedule[day] = updatedSchedule[day].map((t) => {
          if (t.type === type && t.reminder !== state) {
            count++;
            return { ...t, reminder: state };
          }
          return t;
        });
      });
      return {
        ...prev,
        schedule: updatedSchedule
      };
    });
    showIsland(`${state ? 'Unmuted' : 'Muted'} ${count} ${type}s`);
  }, [updateAndSaveStore, showIsland]);

  const updateLightDayTypes = useCallback((types: TaskType[]) => {
    haptics.tap();
    updateAndSaveStore((prev) => ({
      ...prev,
      lightDayTypes: types
    }));
  }, [updateAndSaveStore]);

  const generateNewDietPlan = useCallback(() => {
    haptics.triumph();
    updateAndSaveStore((prev) => {
      const plan = generateSevenDayDietPlan(prev.user);
      return {
        ...prev,
        dietPlan: plan
      };
    });
    showIsland('Personalized 7-Day Diet Generated!');
  }, [updateAndSaveStore, showIsland]);

  const replaceDietMeal = useCallback((
    day: DayName,
    slot: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    replacement: CuratedMeal,
    snackIdx: number = 0,
    targetDate?: Date
  ) => {
    haptics.success();
    const dateToUse = targetDate || viewedDate;
    const dateKey = formatDateKey(dateToUse);

    updateAndSaveStore((prev) => {
      // 1. Update single day plan for the viewed date
      const currentDayPlan = getMealPlanForDate(dateToUse, prev.user, prev.dietPlan, prev.dateDietOverrides);
      const updatedDayPlan = replaceSingleDayMeal(currentDayPlan, slot, replacement, snackIdx);
      const newOverrides = {
        ...(prev.dateDietOverrides || {}),
        [dateKey]: updatedDayPlan
      };

      // 2. Also update 7-day base plan if present
      let updatedPlan = prev.dietPlan;
      if (updatedPlan) {
        updatedPlan = replaceMealInPlan(updatedPlan, day, slot, replacement, snackIdx);
      }

      return {
        ...prev,
        dietPlan: updatedPlan,
        dateDietOverrides: newOverrides
      };
    });
    showIsland('Meal Swapped & Macros Updated');
  }, [viewedDate, updateAndSaveStore, showIsland]);

  const resetWeeklyCheckboxes = useCallback(() => {
    haptics.delete();
    updateAndSaveStore((prev) => ({
      ...prev,
      history: {}
    }));
    showIsland("Week's Checkboxes Reset");
  }, [updateAndSaveStore, showIsland]);

  const hardResetApp = useCallback(() => {
    haptics.delete();
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <PlannerContext.Provider
      value={{
        store,
        loading,
        viewedDate,
        activeDayTab,
        currentView,
        islandMessage,
        activeTimers,
        confettiTrigger,
        setViewedDate,
        changeDateByOffset,
        setActiveDayTab,
        setCurrentView,
        showIsland,
        toggleTask,
        setDayMode,
        setDayReason,
        applyModeToNextDays,
        updateWater,
        logWeight,
        logSleep,
        addOneOffTask,
        deleteOneOffTask,
        updateUserProfile,
        saveCustomSchedule,
        bulkToggleReminders,
        updateLightDayTypes,
        generateNewDietPlan,
        replaceDietMeal,
        resetWeeklyCheckboxes,
        hardResetApp,
        triggerConfettiAnimation
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
