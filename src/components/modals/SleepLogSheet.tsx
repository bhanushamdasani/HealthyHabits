import React, { useState, useEffect } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { formatDateKey } from '../../utils/dateUtils';
import { formatTime24h } from '../../utils/timeUtils';

interface SleepLogSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SleepLogSheet: React.FC<SleepLogSheetProps> = ({ isOpen, onClose }) => {
  const { store, viewedDate, logSleep } = usePlanner();
  const dateKey = formatDateKey(viewedDate);
  const existing = store.sleepLogs[dateKey];

  const [bedtime, setBedtime] = useState('22:30');
  const [waketime, setWaketime] = useState('06:30');

  useEffect(() => {
    if (existing) {
      setBedtime(formatTime24h(existing.bedtime || '22:30'));
      setWaketime(formatTime24h(existing.waketime || '06:30'));
    } else {
      setBedtime(formatTime24h(store.user.sleepTime || '22:30'));
      setWaketime(formatTime24h(store.user.wakeTime || '06:30'));
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
      <div className="bottom-sheet active">
        <div className="sheet-drag-handle" />
        <h3 style={{ margin: 0, fontWeight: 800 }}>Log Circadian Sleep</h3>

        <span className="sm-label">Bedtime</span>
        <input
          type="time"
          className="sm-input"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          style={{ padding: '10px' }}
        />

        <span className="sm-label">Wake Up Time</span>
        <input
          type="time"
          className="sm-input"
          value={waketime}
          onChange={(e) => setWaketime(e.target.value)}
          style={{ padding: '10px' }}
        />

        <button className="btn-primary" onClick={handleSave}>
          Save Sleep Log
        </button>
      </div>
    </>
  );
};
