export interface BMIResult {
  bmi: number;
  bmiString: string;
  status: 'UNDERWEIGHT' | 'NORMAL' | 'OVERWEIGHT' | 'OBESE' | 'CALC';
  color: string;
  advice: string;
  indicatorPercent: number;
}

/**
 * Calculates Body Mass Index (BMI) and provides non-prescriptive evidence-based wellness feedback.
 */
export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    return {
      bmi: 0,
      bmiString: '--',
      status: 'CALC',
      color: 'var(--text-2)',
      advice: 'Please log your height and weight to receive personalized biometric feedback.',
      indicatorPercent: 0
    };
  }

  const hM = heightCm / 100;
  const rawBmi = weightKg / (hM * hM);
  const bmi = parseFloat(rawBmi.toFixed(1));

  if (!isFinite(bmi) || bmi <= 0) {
    return {
      bmi: 0,
      bmiString: '--',
      status: 'CALC',
      color: 'var(--text-2)',
      advice: 'Please log your height and weight to receive personalized biometric feedback.',
      indicatorPercent: 0
    };
  }

  let percent = 0;
  if (bmi < 18.5) {
    percent = (bmi / 18.5) * 25;
  } else if (bmi < 25) {
    percent = 25 + ((bmi - 18.5) / 6.5) * 25;
  } else if (bmi < 30) {
    percent = 50 + ((bmi - 25) / 5) * 25;
  } else {
    percent = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
  }

  let status: BMIResult['status'] = 'NORMAL';
  let color = '#34C759';
  let advice = 'Great job! You are in an optimal, healthy weight range. Maintain your current protocol of balanced nutrition and consistent cardiovascular activity.';

  if (bmi < 18.5) {
    status = 'UNDERWEIGHT';
    color = '#5AC8FA';
    advice = 'You are currently underweight. Focus on nutrient-dense meals, complex carbs (like Oats, Dalia, Sweet Potatoes), and steady strength training to build lean muscle mass safely.';
  } else if (bmi >= 25 && bmi <= 29.9) {
    status = 'OVERWEIGHT';
    color = '#FF9500';
    advice = 'You are in the overweight range. Consider adopting a slight caloric deficit and increasing your daily steps (Zone 2 cardio) to sustainably lower body fat while protecting joints.';
  } else if (bmi >= 30) {
    status = 'OBESE';
    color = '#FF3B30';
    advice = 'Your BMI indicates obesity, which can increase long-term metabolic risks. Prioritize whole-food vegetarian nutrition, highly joint-friendly movement (like walking or cycling), and strict sleep hygiene for recovery.';
  }

  return {
    bmi,
    bmiString: bmi.toFixed(1),
    status,
    color,
    advice,
    indicatorPercent: Math.min(Math.max(percent, 0), 100)
  };
}
