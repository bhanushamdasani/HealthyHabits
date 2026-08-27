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
      if (this.firedNotificationKeys.has(uid)) return;

      const taskMins = timeToMinutes(task.t);
      const alertMins = taskMins - 30; // 30 mins early reminder

      if (alertMins > nowMins) {
        const exactTimeMs = msUntilTime(task.t);
        const notifyTimeMs = exactTimeMs - 30 * 60 * 1000;

        if (notifyTimeMs > 0) {
          const timeoutId = window.setTimeout(() => {
            this.fireNotification(task, uid, onIslandNotify);
          }, notifyTimeMs);

          this.activeTimers.push({
            id: timeoutId,
            task,
            time: task.t
          });
        }
      } else if (alertMins <= nowMins && taskMins > nowMins && !this.firedNotificationKeys.has(uid)) {
        this.firedNotificationKeys.add(uid);
        setTimeout(() => this.fireNotification(task, uid, onIslandNotify), 500);
      }
    });

    this.activeTimers.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    return this.activeTimers;
  }

  public fireNotification(task: ScheduleTask, uid: string, onIslandNotify?: (msg: string) => void): void {
    if (this.firedNotificationKeys.has(uid)) return;
    this.firedNotificationKeys.add(uid);

    const alertData = getMotivationalAlert(task);

    // 1. Try Native Service Worker ShowNotification (iOS 16.4+ Lock Screen & Android Notification Shade)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification(alertData.title, {
            body: alertData.body,
            tag: uid,
            icon: '/icon.png',
            badge: '/icon.png',
            vibrate: [200, 100, 200]
          } as NotificationOptions);
        })
        .catch(() => {
          this.fallbackNativeNotification(alertData.title, alertData.body, uid);
        });
    } else {
      this.fallbackNativeNotification(alertData.title, alertData.body, uid);
    }

    if (onIslandNotify) {
      onIslandNotify(`🔥 ${task.act} in 30 min`);
    }
    haptics.triumph();
  }

  private fallbackNativeNotification(title: string, body: string, tag: string): void {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          tag,
          icon: '/icon.png'
        });
      } catch (e) {
        console.warn('Native notification fallback failed', e);
      }
    }
  }

  public testNotification(nextTask?: ScheduleTask, onIslandNotify?: (msg: string) => void): void {
    haptics.medium();
    if (onIslandNotify) onIslandNotify('Firing native test alert in 5s...');

    setTimeout(() => {
      let alertData;
      if (nextTask) {
        alertData = getMotivationalAlert(nextTask);
        alertData.title = `🔔 Preview: ${alertData.title}`;
      } else {
        alertData = {
          title: '🏆 You crushed today!',
          body: "All rituals complete. Rest, recover, and come back stronger tomorrow. You're building a real streak."
        };
      }

      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.showNotification(alertData.title, {
              body: alertData.body,
              tag: 'test-alert',
              icon: '/icon.png',
              badge: '/icon.png',
              vibrate: [200, 100, 200]
            } as NotificationOptions);
          })
          .catch(() => {
            this.fallbackNativeNotification(alertData.title, alertData.body, 'test-alert');
          });
      } else {
        this.fallbackNativeNotification(alertData.title, alertData.body, 'test-alert');
      }

      if (onIslandNotify) {
        onIslandNotify(`🔔 ${alertData.title}: ${alertData.body.slice(0, 45)}...`);
      }
      haptics.triumph();
    }, 5000);
  }
}

export const notificationService = new NotificationService();
