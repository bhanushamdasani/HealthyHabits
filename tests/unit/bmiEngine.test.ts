import { describe, it, expect } from 'vitest';
import { calculateBMI } from '../../src/services/bmiEngine';

describe('BMI Calculation Engine', () => {
  it('correctly calculates normal BMI', () => {
    // 70kg, 175cm -> 70 / (1.75^2) = 22.86 -> 22.9
    const res = calculateBMI(70, 175);
    expect(res.bmi).toBe(22.9);
    expect(res.status).toBe('NORMAL');
    expect(res.color).toBe('#34C759');
  });

  it('correctly categorizes underweight BMI', () => {
    // 50kg, 180cm -> 50 / (1.8^2) = 15.43 -> 15.4
    const res = calculateBMI(50, 180);
    expect(res.bmi).toBe(15.4);
    expect(res.status).toBe('UNDERWEIGHT');
  });

  it('correctly categorizes overweight and obese BMI', () => {
    // Overweight
    const resOver = calculateBMI(85, 175); // 27.8
    expect(resOver.status).toBe('OVERWEIGHT');

    // Obese
    const resObese = calculateBMI(110, 175); // 35.9
    expect(resObese.status).toBe('OBESE');
  });

  it('handles invalid or zero inputs gracefully', () => {
    const resZero = calculateBMI(0, 0);
    expect(resZero.bmiString).toBe('--');
    expect(resZero.status).toBe('CALC');
  });
});
