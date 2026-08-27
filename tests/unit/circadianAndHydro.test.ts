import { describe, it, expect } from 'vitest';
import { calculateCircadianConsistency } from '../../src/services/circadianEngine';
import { calculateHydrationEfficiency } from '../../src/services/hydrationEngine';
import { storageService } from '../../src/services/storageService';

describe('Circadian Consistency Engine', () => {
  it('returns insufficient data if fewer than 3 sleep logs are recorded', () => {
    const res = calculateCircadianConsistency({
      '2026-08-25': { bedtime: '22:30', waketime: '06:30' },
      '2026-08-26': { bedtime: '22:35', waketime: '06:35' }
    });
    expect(res.score).toBe('--');
    expect(res.label).toBe('CALC');
  });

  it('calculates EXCELLENT consistency when bedtime standard deviation is <= 30 mins', () => {
    const res = calculateCircadianConsistency({
      '2026-08-20': { bedtime: '22:30', waketime: '06:30' },
      '2026-08-21': { bedtime: '22:35', waketime: '06:35' },
      '2026-08-22': { bedtime: '22:25', waketime: '06:25' },
      '2026-08-23': { bedtime: '22:30', waketime: '06:30' }
    });
    expect(res.label).toBe('EXCELLENT');
    expect(res.color).toBe('#34C759');
  });
});

describe('Hydration Efficiency Engine', () => {
  it('returns 0% when no water is logged', () => {
    const res = calculateHydrationEfficiency([], 0);
    expect(res.score).toBe('0%');
    expect(res.label).toBe('NO INTAKE');
  });

  it('awards optimal rating for spaced intake throughout the day reaching 3000ml', () => {
    const logs = [
      { time: '07:00', amount: 500 },
      { time: '10:00', amount: 500 },
      { time: '13:00', amount: 500 },
      { time: '16:00', amount: 500 },
      { time: '19:00', amount: 500 },
      { time: '21:00', amount: 500 }
    ];
    const res = calculateHydrationEfficiency(logs, 3000);
    expect(res.label).toBe('OPTIMAL');
    expect(res.color).toBe('#34C759');
  });
});

describe('Legacy Storage & Migration Engine', () => {
  it('migrates legacy metabolic_os_v13 format to modern AppDataStore schema', () => {
    const legacy = {
      user: 'Praveen',
      height: '175',
      startW: '68',
      age: '25',
      history: {
        '2026-08-25-0': true,
        '2026-08-25-1': true
      },
      dayModes: { '2026-08-25': 'light' }
    };

    const migrated = storageService.migrateLegacyData(legacy);
    expect(migrated.user.name).toBe('Praveen');
    expect(migrated.user.heightCm).toBe(175);
    expect(migrated.user.startWeightKg).toBe(68);
    expect(migrated.dayModes['2026-08-25']).toBe('light');
    expect(Object.keys(migrated.history).length).toBeGreaterThanOrEqual(1);
  });
});
