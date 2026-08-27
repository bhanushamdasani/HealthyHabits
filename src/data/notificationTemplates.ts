import { ScheduleTask } from '../types';

export interface NotificationPayload {
  title: string;
  body: string;
}

/** stage: 'early' = 60 min warning, 'urgent' = 10 min warning */
export function getMotivationalAlert(
  task: ScheduleTask,
  stage: 'early' | 'urgent' = 'early'
): NotificationPayload {
  const act = (task.act || '').toLowerCase();
  const food = task.instr || task.act || '';
  const type = task.type || '';
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = days[new Date().getDay()];
  const hour = new Date().getHours();
  const timeGreet = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  // ─── WAKE UP / ALARM ─────────────────────────────────────────────────────────
  if (act.includes('wake') || act.includes('alarm')) {
    if (stage === 'early') {
      return {
        title: `🌤️ Wake-up in 60 min — ${todayDay} awaits`,
        body: `Start winding down your sleep. Lay out your clothes, fill your water bottle. Today is going to be different.`
      };
    }
    return {
      title: `🌅 10 min to rise — you've got this!`,
      body: `"Win the morning, win the day." Your ${todayDay} protocol starts NOW. First move: ${food}.`
    };
  }

  // ─── SLEEP / BED ─────────────────────────────────────────────────────────────
  if (act.includes('sleep') || act.includes('bed') || act.includes('lights')) {
    if (stage === 'early') {
      return {
        title: `🌙 Wind-down in 60 min`,
        body: `Dim screens, sip warm water, breathe slowly. Growth hormone only releases in quality sleep. Prepare: ${food}.`
      };
    }
    return {
      title: `😴 Time to power down — 10 min left`,
      body: `Your muscles repair, your mind resets, your streak is protected — all in your sleep. Lights out: ${food}.`
    };
  }

  // ─── MEAL ────────────────────────────────────────────────────────────────────
  if (
    type === 'meal' ||
    act.includes('breakfast') ||
    act.includes('lunch') ||
    act.includes('dinner') ||
    act.includes('snack') ||
    act.includes('meal')
  ) {
    if (stage === 'early') {
      return {
        title: `🍽️ Meal prep time — 60 min away`,
        body: `Start prepping "${food}" so you're not reaching for junk. Your metabolism is counting on you this ${timeGreet}.`
      };
    }
    return {
      title: `⚡ 10 min — Fuel your engine`,
      body: `"${food}" is your ${todayDay} performance food. Skip Zomato, own your nutrition, protect your gains. Plate up now! 🥗`
    };
  }

  // ─── WORKOUT ─────────────────────────────────────────────────────────────────
  if (
    type === 'workout' ||
    act.includes('gym') ||
    act.includes('cardio') ||
    act.includes('run') ||
    act.includes('walk') ||
    act.includes('yoga')
  ) {
    if (stage === 'early') {
      return {
        title: `🏋️ Workout in 60 min — get ready`,
        body: `Have your water ready, wear something that makes you feel powerful. "${food}" awaits on ${todayDay}. No negotiation.`
      };
    }
    return {
      title: `💪 Move in 10 min — no excuses now`,
      body: `Dopamine, confidence, strength — all unlocked by "${food}" right now. Your future self will thank you. Let's GO. 🔥`
    };
  }

  // ─── HYDRATION ───────────────────────────────────────────────────────────────
  if (
    act.includes('water') ||
    act.includes('lemon') ||
    act.includes('acv') ||
    act.includes('hydrat')
  ) {
    if (stage === 'early') {
      return {
        title: `💧 Hydration check in 60 min`,
        body: `Every cell in your body is 70% water. Dehydration = brain fog, fatigue, cravings. Fill your bottle: ${food}.`
      };
    }
    return {
      title: `🚰 10 min — Drink up, warrior`,
      body: `"${food}" — 30 seconds, massive payoff. Clearer skin, sharper focus, better metabolism. Right now. Do it.`
    };
  }

  // ─── BREATHING / MEDITATION ──────────────────────────────────────────────────
  if (
    act.includes('breath') ||
    act.includes('meditat') ||
    act.includes('mindful') ||
    act.includes('relax')
  ) {
    if (stage === 'early') {
      return {
        title: `🧘 Mindfulness in 60 min`,
        body: `Find a quiet spot. "${food}" reduces cortisol, sharpens focus, and adds years to your life. Worth it.`
      };
    }
    return {
      title: `🌬️ 10 min — Breathe & reset now`,
      body: `2 minutes of "${food}" activates your parasympathetic system. Stress melts. Clarity returns. Begin.`
    };
  }

  // ─── GENERIC FALLBACK ────────────────────────────────────────────────────────
  if (stage === 'early') {
    return {
      title: `⏰ "${task.act}" in 60 min — prepare`,
      body: `Small habits done consistently build unstoppable momentum. Get ready for this ${todayDay} ${timeGreet} block.`
    };
  }
  return {
    title: `🎯 10 min — Show up for "${task.act}"`,
    body: `Discipline is choosing your future self over your present comfort. Time: ${task.t}. This is your moment.`
  };
}
