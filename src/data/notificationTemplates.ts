import { ScheduleTask } from '../types';

export interface NotificationPayload {
  title: string;
  body: string;
}

export function getMotivationalAlert(task: ScheduleTask): NotificationPayload {
  const act = (task.act || '').toLowerCase();
  const food = task.instr || '';
  const type = task.type || '';
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = days[new Date().getDay()];
  const hour = new Date().getHours();
  const timeGreet = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  let title = '';
  let body = '';

  if (act.includes('wake') || act.includes('alarm')) {
    title = `🌅 Rise up, it's ${todayDay}!`;
    const opts = [
      `Your body just spent 8 hours repairing. Now move it. Start with: ${food}.`,
      `Morning cortisol peak = maximum fat burn. Get up and seize it! ${food} awaits.`,
      `Every champion wakes before their excuses do. Your ${todayDay} starts NOW.`
    ];
    body = opts[Math.floor(Math.random() * opts.length)];
  } else if (act.includes('sleep') || act.includes('bed') || act.includes('lights')) {
    title = `🌙 ${todayDay} Wind-Down`;
    const opts = [
      `Growth hormone releases when you sleep — don't skip recovery. Lights out: ${food}.`,
      `Your ${todayDay} was earned. Now let your muscles repair. Sleep tight.`,
      `Tomorrow's performance is built tonight. Follow: ${food}. Sleep is the real gain.`
    ];
    body = opts[Math.floor(Math.random() * opts.length)];
  } else if (
    type === 'meal' ||
    act.includes('breakfast') ||
    act.includes('lunch') ||
    act.includes('dinner') ||
    act.includes('snack') ||
    act.includes('meal')
  ) {
    title = `🍽️ ${todayDay}'s Fuel Block`;
    const opts = [
      `Your kitchen > Zomato 🔥 Chef you is plating "${food}" right now. No delivery fee. No junk oils. Pure gains.`,
      `"${food}" loading in 30 mins. Rated ⭐⭐⭐⭐⭐ by your metabolism. Swiggy can't touch this.`,
      `Skip the delivery app today. "${food}" is the real high-performance meal for this ${timeGreet}. Fuel up! 🥗`
    ];
    body = opts[Math.floor(Math.random() * opts.length)];
  } else if (
    type === 'workout' ||
    act.includes('gym') ||
    act.includes('cardio') ||
    act.includes('run') ||
    act.includes('walk') ||
    act.includes('yoga')
  ) {
    title = `💪 ${todayDay} Sweat Block`;
    const opts = [
      `"${food}" — the only ${todayDay} rep that counts. No shortcuts. No excuses. Just results.`,
      `Your future self is watching you right now. Will you show up for "${food}"? 30 mins. Go.`,
      `Dopamine, serotonin, endorphins — all unlocked by "${food}". Your ${todayDay} reward starts after this.`
    ];
    body = opts[Math.floor(Math.random() * opts.length)];
  } else if (
    act.includes('water') ||
    act.includes('lemon') ||
    act.includes('acv') ||
    act.includes('hydrat')
  ) {
    title = `💧 Hydration Check`;
    const opts = [
      `Your cells are 70% water. Don't let them shrivel on a ${todayDay}. Drink: ${food}.`,
      `Dehydrated brain = foggy thinking. 30 second fix: "${food}". Do it now.`,
      `Optimal blood flow, clear skin, fast metabolism — all from sipping "${food}" consistently.`
    ];
    body = opts[Math.floor(Math.random() * opts.length)];
  } else {
    title = `⚡ Ritual Unlocked`;
    const opts = [
      `"${task.act}" in 30 mins. Small daily wins compound into massive life results. Ready?`,
      `This ${todayDay} ${timeGreet} block matters: "${task.act} — ${food}". Show up.`,
      `Discipline is choosing your future self over your present comfort. Time: ${task.t}. Task: ${task.act}.`
    ];
    body = opts[Math.floor(Math.random() * opts.length)];
  }

  return { title, body };
}
