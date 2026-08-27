import { ScheduleTask, DayMode, TaskType } from '../types';
import { getMotivationalAlert } from '../data/notificationTemplates';
import { timeToMinutes, msUntilTime } from '../utils/timeUtils';
import { formatDateKey, DAYS_OF_WEEK } from '../utils/dateUtils';
import { haptics } from '../utils/haptics';

export interface ActiveTimerInfo {
  id: number;
  task: ScheduleTask;
  time: string;
}

class NotificationService {
  private activeTimers: ActiveTimerInfo[] = [];
  private firedNotificationKeys = new Set<string>();

  public getPermissionStatus(): NotificationPermission {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  }

  public async requestPermission(): Promise<boolean> {
    haptics.tap();
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    const res = await Notification.requestPermission();
    return res === 'granted';
  }

  public rebuildQueue(
    schedule: Record<string, ScheduleTask[]>,
    history: Record<string, boolean>,
    dayModes: Record<string, DayMode>,
    lightDayTypes: TaskType[] = ['workout'],
    dateTasks: Record<string, ScheduleTask[]> = {},
    onIslandNotify?: (msg: string) => void
  ): ActiveTimerInfo[] {
    // Clear existing timeouts
    this.activeTimers.forEach((t) => clearTimeout(t.id));
    this.activeTimers = [];

    if (this.getPermissionStatus() !== 'granted') {
      return [];
    }

    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const key = formatDateKey(now);
    const dayName = DAYS_OF_WEEK[now.getDay()];
    const mode = dayModes[key] || 'active';

    if (mode === 'silent') return [];

    const recurring = schedule[dayName] || [];
    const oneOff = dateTasks[key] || [];
    const tasks = [...recurring, ...oneOff];

    tasks.forEach((task) => {
      const uid = `${key}-${task.id}`;

      if (history[uid] === true) return;
      if (!task.reminder) return;
      if (mode === 'light' && !lightDayTypes.includes(task.type)) return;

      const taskMins = timeToMinutes(task.t);
      const exactMs = msUntilTime(task.t);

      // ── NOTIFICATION 1: 60 min early warning ───────────────────────────────
      const earlyUid = `${uid}-early`;
      const earlyMins = taskMins - 60;
      const earlyMs = exactMs - 60 * 60 * 1000;

      if (!this.firedNotificationKeys.has(earlyUid)) {
        if (earlyMs > 0 && earlyMins > nowMins) {
          // schedule future
          const tid = window.setTimeout(() => {
            this.fireNotification(task, earlyUid, 'early', onIslandNotify);
          }, earlyMs);
          this.activeTimers.push({ id: tid, task, time: task.t });
        } else if (earlyMins <= nowMins && taskMins > nowMins) {
          // we're in the 60-min window: fire immediately (once)
          this.firedNotificationKeys.add(earlyUid);
          setTimeout(() => this.fireNotification(task, earlyUid, 'early', onIslandNotify), 500);
        }
      }

      // ── NOTIFICATION 2: 10 min urgent alert ────────────────────────────────
      const urgentUid = `${uid}-urgent`;
      const urgentMins = taskMins - 10;
      const urgentMs = exactMs - 10 * 60 * 1000;

      if (!this.firedNotificationKeys.has(urgentUid)) {
        if (urgentMs > 0 && urgentMins > nowMins) {
          // schedule future
          const tid = window.setTimeout(() => {
            this.fireNotification(task, urgentUid, 'urgent', onIslandNotify);
          }, urgentMs);
          this.activeTimers.push({ id: tid, task, time: task.t });
        } else if (urgentMins <= nowMins && taskMins > nowMins) {
          // we're in the 10-min window: fire immediately (once)
          this.firedNotificationKeys.add(urgentUid);
          setTimeout(() => this.fireNotification(task, urgentUid, 'urgent', onIslandNotify), 1500);
        }
      }
    });

    this.activeTimers.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    return this.activeTimers;
  }

  public fireNotification(
    task: ScheduleTask,
    uid: string,
    stage: 'early' | 'urgent' = 'early',
    onIslandNotify?: (msg: string) => void
  ): void {
    if (this.firedNotificationKeys.has(uid)) return;
    this.firedNotificationKeys.add(uid);

    const alertData = getMotivationalAlert(task, stage);
    const minutesBefore = stage === 'early' ? 60 : 10;

    // Primary: Service Worker showNotification → appears in iOS/Android notification center + lock screen
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification(alertData.title, {
            body: alertData.body,
            tag: uid,
            icon: '/icon.png',
            badge: '/icon.png',
            vibrate: stage === 'urgent' ? [200, 100, 200, 100, 300] : [150, 100, 150],
            requireInteraction: stage === 'urgent', // urgent stays until dismissed
          } as NotificationOptions);
        })
        .catch(() => {
          this.fallbackNotification(alertData.title, alertData.body, uid, stage === 'urgent');
        });
    } else {
      this.fallbackNotification(alertData.title, alertData.body, uid, stage === 'urgent');
    }

    if (onIslandNotify) {
      onIslandNotify(
        stage === 'urgent'
          ? `🚨 ${task.act} in 10 min!`
          : `⏰ ${task.act} in 60 min`
      );
    }

    if (stage === 'urgent') {
      haptics.triumph();
    } else {
      haptics.medium();
    }

    console.log(`[NotificationService] Fired "${stage}" alert (${minutesBefore}min before) for: ${task.act}`);
  }

  private fallbackNotification(title: string, body: string, tag: string, requireInteraction = false): void {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          tag,
          icon: '/icon.png',
          requireInteraction
        });
      } catch (e) {
        console.warn('Fallback Notification failed', e);
      }
    }
  }

  public testNotification(nextTask?: ScheduleTask, onIslandNotify?: (msg: string) => void): void {
    haptics.medium();
    if (onIslandNotify) onIslandNotify('🔔 Test alert fires in 5s (then 10s)...');

    // First alert: early stage at 5s
    setTimeout(() => {
      const earlyData = nextTask
        ? getMotivationalAlert(nextTask, 'early')
        : { title: '⏰ Ritual in 60 min — get ready', body: 'Small wins compound into massive life results. Prepare for your next ritual.' };

      this.showNativeNotification(earlyData.title, earlyData.body, 'test-early', [150, 100, 150], false);
      if (onIslandNotify) onIslandNotify(`⏰ ${earlyData.title}`);
    }, 5000);

    // Second alert: urgent stage at 10s
    setTimeout(() => {
      const urgentData = nextTask
        ? getMotivationalAlert(nextTask, 'urgent')
        : { title: '🚨 Ritual in 10 min — show up!', body: "Discipline is choosing your future self over comfort. Time to act. This is your moment." };

      this.showNativeNotification(urgentData.title, urgentData.body, 'test-urgent', [200, 100, 200, 100, 300], true);
      if (onIslandNotify) onIslandNotify(`🚨 ${urgentData.title}`);
      haptics.triumph();
    }, 10000);
  }

  private showNativeNotification(
    title: string,
    body: string,
    tag: string,
    vibrate: number[],
    requireInteraction: boolean
  ): void {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((reg) => {
          reg.showNotification(title, {
            body,
            tag,
            icon: '/icon.png',
            badge: '/icon.png',
            vibrate,
            requireInteraction
          } as NotificationOptions);
        })
        .catch(() => this.fallbackNotification(title, body, tag, requireInteraction));
    } else {
      this.fallbackNotification(title, body, tag, requireInteraction);
    }
  }
}

export const notificationService = new NotificationService();
