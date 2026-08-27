import React, { useEffect, useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { calculateStreak } from '../../services/streakEngine';
import { soundService } from '../../services/soundService';
import { Milestone } from '../../types';

export const MilestoneModal: React.FC = () => {
  const { store, triggerConfettiAnimation, updateUserProfile } = usePlanner();
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);

  const milestones: Milestone[] = [
    {
      days: 3,
      emoji: '🔥',
      title: '3-Day Ignition',
      subtitle: '3-Day Consistency Target Achieved!',
      desc: 'Protocol ignited! You have maintained extreme discipline for 3 straight days. The momentum has officially started.'
    },
    {
      days: 7,
      emoji: '🛡️',
      title: '7-Day Foundation',
      subtitle: '7-Day Consistency Target Achieved!',
      desc: 'One full perfect week! You have built a solid foundation. Keep this shield active to protect your daily rituals.'
    },
    {
      days: 21,
      emoji: '🧠',
      title: '21-Day Habit Lock',
      subtitle: '21-Day Consistency Target Achieved!',
      desc: 'Neurological Lock-in! 21 days is the scientific threshold for automatic behaviors. The protocol is becoming part of you.'
    },
    {
      days: 30,
      emoji: '👑',
      title: '30-Day Master',
      subtitle: '30-Day Consistency Target Achieved!',
      desc: 'Protocol Sovereign! You have mastered 30 full days of extreme consistency. You are now in total control of your wellness.'
    }
  ];

  const streakInfo = calculateStreak(
    store.history,
    store.schedule,
    store.dayModes,
    store.dateTasks,
    0
  );

  useEffect(() => {
    const seen = store.milestonesSeen || {};
    for (const m of milestones) {
      if (streakInfo.streak >= m.days && !seen[m.days]) {
        seen[m.days] = true;
        updateUserProfile({} as any); // trigger save of milestone
        setActiveMilestone(m);
        triggerConfettiAnimation();
        if (store.user.chimeEnabled) soundService.playTriumphChime(true);
        break;
      }
    }
  }, [streakInfo.streak, store.milestonesSeen, store.user.chimeEnabled, triggerConfettiAnimation, updateUserProfile]);

  if (!activeMilestone) return null;

  return (
    <>
      <div className="sheet-backdrop active" style={{ zIndex: 3000 }} onClick={() => setActiveMilestone(null)} />
      <div
        className="bottom-sheet active"
        style={{
          zIndex: 3100,
          borderRadius: '30px 30px 0 0',
          textAlign: 'center',
          padding: '35px 25px 25px'
        }}
      >
        <div
          style={{
            fontSize: '4.2rem',
            marginBottom: '12px',
            animation: 'popUpEmoji 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}
        >
          {activeMilestone.emoji}
        </div>
        <div className="brand-gradient" style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '5px' }}>
          {activeMilestone.title}
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            marginBottom: '15px',
            letterSpacing: '0.5px'
          }}
        >
          {activeMilestone.subtitle}
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.45, margin: '0 0 25px 0', padding: '0 10px' }}>
          {activeMilestone.desc}
        </p>
        <button className="btn-primary" onClick={() => setActiveMilestone(null)}>
          Continue Protocol
        </button>
      </div>
    </>
  );
};
