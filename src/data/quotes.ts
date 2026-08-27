export const MOTIVATIONAL_QUOTES = [
  "Discipline equals freedom.",
  "Small disciplines repeated with consistency every day lead to great achievements.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "Don't wait for inspiration. You have to go after it with a club.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The successful warrior is the average man, with laser-like focus.",
  "First we make our habits, then our habits make us.",
  "What you do every day matters more than what you do once in a while.",
  "The magic you are looking for is in the work you're avoiding.",
  "Win the morning, win the day.",
  "Your future is found in your daily routine."
];

export function getRandomQuote(): string {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}
