/**
 * Triggers device haptic feedback vibration patterns when available in browser.
 */
export function triggerHaptic(pattern: number | number[] = 15): void {
  if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore unsupported haptic permissions
    }
  }
}

export const haptics = {
  tap: () => triggerHaptic(15),
  light: () => triggerHaptic(10),
  medium: () => triggerHaptic(25),
  success: () => triggerHaptic([30, 50, 30]),
  cancel: () => triggerHaptic(30),
  triumph: () => triggerHaptic([50, 100, 50, 100, 50]),
  delete: () => triggerHaptic([30, 30])
};
