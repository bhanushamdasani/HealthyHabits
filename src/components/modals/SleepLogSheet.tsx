import React, { useState, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { formatDateKey } from '../../utils/dateUtils';
import { formatTime12h } from '../../utils/timeUtils';
import { ModernClockPicker } from '../ui/ModernClockPicker';

interface SleepLogSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SleepLogSheet: React.FC<SleepLogSheetProps> = ({ isOpen, onClose }) => {
  const { store, viewedDate, logSleep } = usePlanner();
  const dateKey = formatDateKey(viewedDate);
  const existing = store.sleepLogs[dateKey];

  const [bedtime, setBedtime] = useState('10:30 PM');
  const [waketime, setWaketime] = useState('06:30 AM');

  useEffect(() => {
    if (existing) {
      setBedtime(formatTime12h(existing.bedtime || '10:30 PM'));
      setWaketime(formatTime12h(existing.waketime || '06:30 AM'));
    } else {
      setBedtime(formatTime12h(store.user.sleepTime || '10:00 PM'));
      setWaketime(formatTime12h(store.user.wakeTime || '06:00 AM'));
    }
  }, [existing, isOpen, store.user.sleepTime, store.user.wakeTime]);

  if (!isOpen) return null;

  const handleSave = () => {
    logSleep(bedtime, waketime);
    onClose();
  };

  return (
    <>
      <div className="sheet-backdrop active" onClick={onClose} />
      <div className="bottom-sheet active" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="sheet-drag-handle" style={{ marginBottom: '2px' }} />
        <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.2rem' }}>Log Circadian Sleep</h3>

        <ModernClockPicker
          label="Bedtime (Lights Out)"
          icon="🌙"
          value={bedtime}
          onChange={(t) => setBedtime(t)}
        />

        <ModernClockPicker
          label="Wake Up Time"
          icon="☀️"
          value={waketime}
          onChange={(t) => setWaketime(t)}
        />

        <button className="btn-primary" onClick={handleSave} style={{ marginTop: '6px' }}>
          Save Sleep Log
        </button>
      </div>
    </>
  );
};
