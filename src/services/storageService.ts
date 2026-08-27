import { openDB, IDBPDatabase } from 'idb';
import { AppDataStore, UserProfile, WeeklySchedule, ScheduleTask } from '../types';
import { defaultSchedule } from '../data/defaultSchedule';
import { formatDateKey } from '../utils/dateUtils';
import { generateSevenDayDietPlan } from './dietPlannerEngine';

const DB_NAME = 'healthyhabits_protocol_db';
const DB_VERSION = 1;
const LEGACY_STORAGE_KEY = 'metabolic_os_v13';

export const defaultUserProfile: UserProfile = {
  name: 'Warrior',
  age: 24,
  gender: 'male',
  heightCm: 170,
  startWeightKg: 65,
  currentWeightKg: 65,
  goalWeightKg: 62,
  bloodGroup: 'B+',
  activityLevel: 1.375,
  lifestyle: 'working_professional',
  goal: 'consistency',
  cookingEffort: 'moderate',
  dislikedFoods: [],
  allergies: [],
  femaleConsiderations: [],
  wakeTime: '06:00 AM',
  sleepTime: '10:00 PM',
  workoutDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
  workoutDurationMins: 45,
  preferredWorkoutTime: 'evening',
  accentTheme: 'classic',
  chimeEnabled: true
};

class StorageService {
  private dbPromise: Promise<IDBPDatabase> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initDB();
    }
  }

  private initDB(): Promise<IDBPDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('app_state')) {
            db.createObjectStore('app_state');
          }
          if (!db.objectStoreNames.contains('sync_queue')) {
            db.createObjectStore('sync_queue', { keyPath: 'id' });
          }
        }
      });
    }
    return this.dbPromise;
  }

  /**
   * Loads full app state. If not yet in IndexedDB, parses and migrates legacy localStorage format.
   */
  public async loadAppState(): Promise<AppDataStore> {
    try {
      const db = await this.initDB();
      const stored = await db.get('app_state', 'current_state');
      if (stored) {
        return stored as AppDataStore;
      }
    } catch {
      // Fallback to localStorage on private browsing restrictions
    }

    // Attempt migration from legacy localStorage key
    const legacyJson = typeof window !== 'undefined' ? localStorage.getItem(LEGACY_STORAGE_KEY) : null;
    if (legacyJson) {
      try {
        const legacyData = JSON.parse(legacyJson);
        const migrated = this.migrateLegacyData(legacyData);
        await this.saveAppState(migrated);
        return migrated;
      } catch (e) {
        console.warn('Error parsing legacy localStorage data', e);
      }
    }

    // Default initial fresh state
    const todayKey = formatDateKey(new Date());
    const initialStore: AppDataStore = {
      user: defaultUserProfile,
      schedule: JSON.parse(JSON.stringify(defaultSchedule)),
      history: {},
      dayModes: {},
      dayReasons: {},
      lightDayTypes: ['workout'],
      weights: {
        [todayKey]: { am: 65, pm: '', water: 0, waterLogs: [] }
      },
      sleepLogs: {},
      dateTasks: {},
      milestonesSeen: {},
      dietPlan: generateSevenDayDietPlan(defaultUserProfile)
    };

    await this.saveAppState(initialStore);
    return initialStore;
  }

  /**
   * Persists updated app state to both IndexedDB and localStorage (for double reliability).
   */
  public async saveAppState(store: AppDataStore): Promise<void> {
    try {
      const db = await this.initDB();
      await db.put('app_state', store, 'current_state');
    } catch {
      // Fallback
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(store));
      } catch {
        // Quota exceeded safe catch
      }
    }
  }

  /**
   * Migrates legacy appData object into strict AppDataStore structure.
   */
  public migrateLegacyData(legacy: any): AppDataStore {
    const todayKey = formatDateKey(new Date());
    const user: UserProfile = {
      ...defaultUserProfile,
      name: legacy.user || defaultUserProfile.name,
      heightCm: Number(legacy.height) || defaultUserProfile.heightCm,
      startWeightKg: Number(legacy.startW) || defaultUserProfile.startWeightKg,
      currentWeightKg: Number(legacy.startW) || defaultUserProfile.currentWeightKg,
      age: Number(legacy.age) || defaultUserProfile.age,
      gender: legacy.gender || defaultUserProfile.gender,
      activityLevel: Number(legacy.activity) as any || defaultUserProfile.activityLevel,
      accentTheme: legacy.accentTheme || 'classic',
      chimeEnabled: legacy.chimeEnabled !== false
    };

    const schedule: WeeklySchedule = legacy.schedule || JSON.parse(JSON.stringify(defaultSchedule));

    // Ensure all tasks have unique persistent IDs
    Object.keys(schedule).forEach((dayKey) => {
      const day = dayKey as keyof WeeklySchedule;
      (schedule[day] || []).forEach((task: ScheduleTask, idx: number) => {
        if (!task.id) {
          task.id = `t_${day}_${idx}`;
        }
      });
    });

    const history: Record<string, boolean> = {};
    if (legacy.history) {
      Object.keys(legacy.history).forEach((oldKey) => {
        // Migrate legacy numeric index keys (YYYY-MM-DD-0) to stable ID keys
        const match = oldKey.match(/^(\d{4}-\d{2}-\d{2})-(\d+)$/);
        if (match) {
          const dateStr = match[1];
          const idx = parseInt(match[2], 10);
          const [y, m, d] = dateStr.split('-').map(Number);
          const dateObj = new Date(y, m - 1, d, 12, 0, 0);
          const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
          const dayName = days[dateObj.getDay()];
          const newKey = `${dateStr}-t_${dayName}_${idx}`;
          history[newKey] = legacy.history[oldKey];
        } else {
          history[oldKey] = legacy.history[oldKey];
        }
      });
    }

    return {
      user,
      schedule,
      history,
      dayModes: legacy.dayModes || {},
      dayReasons: legacy.dayReasons || {},
      lightDayTypes: legacy.lightDayTypes || ['workout'],
      weights: legacy.weights || { [todayKey]: { am: user.startWeightKg, water: 0, waterLogs: [] } },
      sleepLogs: legacy.sleepLogs || {},
      dateTasks: legacy.dateTasks || {},
      milestonesSeen: legacy.milestonesSeen || {},
      dietPlan: legacy.dietPlan || generateSevenDayDietPlan(user)
    };
  }

  /**
   * Generates a downloadable JSON protocol backup.
   */
  public exportBackupJson(data: AppDataStore): string {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Validates and imports a JSON protocol backup.
   */
  public validateAndImportBackup(jsonString: string): AppDataStore {
    const parsed = JSON.parse(jsonString);
    if (!parsed || (!parsed.user && !parsed.schedule)) {
      throw new Error('Invalid HealthyHabits protocol backup file.');
    }
    return this.migrateLegacyData(parsed);
  }
}

export const storageService = new StorageService();
