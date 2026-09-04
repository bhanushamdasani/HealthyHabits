import React, { useState, useEffect } from 'react';
import { formatTime12h, formatTime24h, timeToMinutes, minutesToTime } from '../../utils/timeUtils';
import { haptics } from '../../utils/haptics';

interface ModernClockPickerProps {
  value: string; // e.g. "06:00 AM", "22:30", "10:00 PM"
  onChange: (time12h: string) => void;
  label?: string;
  icon?: string;
}

export const ModernClockPicker: React.FC<ModernClockPickerProps> = ({
  value,
  onChange,
  label,
  icon = '⏰'
}) => {
  const formatted12h = formatTime12h(value);

  // Parse initial 12h parts
  const parseParts = (t12: string) => {
    const match = t12.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
    if (match) {
      return {
        hour: match[1].padStart(2, '0'),
        minute: match[2],
        period: match[3].toUpperCase() as 'AM' | 'PM'
      };
    }
    return { hour: '06', minute: '00', period: 'AM' as const };
  };

  const [parts, setParts] = useState(parseParts(formatted12h));

  useEffect(() => {
    setParts(parseParts(formatTime12h(value)));
  }, [value]);

  const updateTime = (newHour: string, newMin: string, newPeriod: 'AM' | 'PM') => {
    haptics.tap();
    const updated12h = `${newHour}:${newMin} ${newPeriod}`;
    setParts({ hour: newHour, minute: newMin, period: newPeriod });
    onChange(updated12h);
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val24 = e.target.value;
    if (val24) {
      const mins = timeToMinutes(val24);
      const t12 = minutesToTime(mins);
      const parsed = parseParts(t12);
      setParts(parsed);
      onChange(t12);
    }
  };

  const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {label && (
        <span
          className="ios-input-label"
          style={{
            display: 'block',
            marginBottom: '4px',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--text-2)'
          }}
        >
          {label}
        </span>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--surface-2)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          padding: '6px 10px',
          gap: '6px',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative'
        }}
      >
        <span style={{ fontSize: '1.2rem', paddingLeft: '2px' }}>{icon}</span>

        {/* Hour Dropdown */}
        <select
          value={parts.hour}
          onChange={(e) => updateTime(e.target.value, parts.minute, parts.period)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-1)',
            fontWeight: 800,
            fontSize: '0.92rem',
            padding: '6px 8px',
            borderRadius: '10px',
            cursor: 'pointer',
            outline: 'none',
            flex: 1,
            textAlign: 'center',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <span style={{ fontWeight: 900, color: 'var(--text-2)', fontSize: '1rem' }}>:</span>

        {/* Minute Dropdown */}
        <select
          value={parts.minute}
          onChange={(e) => updateTime(parts.hour, e.target.value, parts.period)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-1)',
            fontWeight: 800,
            fontSize: '0.92rem',
            padding: '6px 8px',
            borderRadius: '10px',
            cursor: 'pointer',
            outline: 'none',
            flex: 1,
            textAlign: 'center',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* AM / PM Toggle Pill */}
        <div
          style={{
            display: 'flex',
            background: 'var(--surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '10px',
            padding: '2px',
            gap: '2px'
          }}
        >
          <button
            type="button"
            onClick={() => updateTime(parts.hour, parts.minute, 'AM')}
            style={{
              background: parts.period === 'AM' ? 'var(--primary)' : 'transparent',
              color: parts.period === 'AM' ? '#ffffff' : 'var(--text-2)',
              border: 'none',
              borderRadius: '8px',
              padding: '4px 7px',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => updateTime(parts.hour, parts.minute, 'PM')}
            style={{
              background: parts.period === 'PM' ? 'var(--primary)' : 'transparent',
              color: parts.period === 'PM' ? '#ffffff' : 'var(--text-2)',
              border: 'none',
              borderRadius: '8px',
              padding: '4px 7px',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            PM
          </button>
        </div>

        {/* Optional Native Clock Button / Quick Picker */}
        <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input
            type="time"
            value={formatTime24h(value)}
            onChange={handleNativeChange}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
            title="Open system clock wheel"
          />
          <span style={{ fontSize: '1rem', opacity: 0.7, pointerEvents: 'none' }}>⏱️</span>
        </div>
      </div>
    </div>
  );
};
