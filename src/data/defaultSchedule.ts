import { WeeklySchedule } from '../types';

export const defaultSchedule: WeeklySchedule = {
  mon: [
    { id: 't_mon_0', t: '06:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + ½ Lemon + 1 tsp ACV', rule: 'Prime Metabolism', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_mon_1', t: '06:30 AM', act: 'Sunlight & Mobility', instr: '15 Mins Morning Sunlight + Joint Warmup', rule: 'Circadian Reset', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_mon_2', t: '08:00 AM', act: 'Breakfast', instr: 'Moong Dal Chilla (2) + Mint Chutney', rule: 'High Protein Fuel', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_mon_3', t: '09:00 AM', act: 'Deep Focus Block 1', instr: 'Work / Study (No Distractions)', rule: 'Hydrate 500ml', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_mon_4', t: '01:00 PM', act: 'Lunch', instr: '2 Roti + Rajma (150g) + Cucumber Salad', rule: 'Eat Salad First', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_mon_5', t: '01:30 PM', act: 'Post-Meal Walk', instr: '10 Mins Shatapavali Walk', rule: 'Blunt Glucose Spike', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_mon_6', t: '04:30 PM', act: 'Mid-Day Fuel', instr: '1 Banana + Black Coffee + Flaxseeds', rule: 'Pre-Workout Load', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_mon_7', t: '05:30 PM', act: 'Workout / Training', instr: 'Push Day: Chest, Shoulders & Triceps', rule: 'Progressive Overload', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_mon_8', t: '08:00 PM', act: 'Dinner', instr: 'Paneer Bhurji (100g) + Sautéed Spinach', rule: 'Zero Glucose Spike', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_mon_9', t: '09:30 PM', act: 'Digital Wind-Down', instr: 'Blue-light off, book / stretch', rule: 'Melatonin Rise', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_mon_10', t: '10:00 PM', act: 'Lights Out & Sleep', instr: '8 Hours Restoration in Pitch Black Room', rule: 'Circadian Repair', type: 'hack', reminder: true, isRecurring: true }
  ],
  tue: [
    { id: 't_tue_0', t: '06:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + ½ Lemon', rule: 'Prime Metabolism', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_tue_1', t: '06:30 AM', act: 'Morning Stretches', instr: '15 Mins Yoga & Mobility', rule: 'Circadian Reset', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_tue_2', t: '08:00 AM', act: 'Breakfast', instr: 'Besan Chilla (2) + Grated Paneer', rule: 'Dual Protein', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_tue_3', t: '09:00 AM', act: 'Deep Focus Block', instr: 'Deep Work / Task Execution', rule: 'Hydrate 500ml', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_tue_4', t: '01:00 PM', act: 'Lunch', instr: '1 Roti + Chole (150g) + 1 Bowl Curd', rule: 'Probiotics', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_tue_5', t: '01:30 PM', act: 'Post-Meal Walk', instr: '10 Mins Shatapavali Walk', rule: 'Blunt Glucose Spike', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_tue_6', t: '04:30 PM', act: 'Mid-Day Fuel', instr: 'Chana Sattu Drink (40g) + Lemon', rule: 'Cooling Plant Energy', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_tue_7', t: '05:30 PM', act: 'Workout / Training', instr: 'Pull Day: Back, Biceps & Rear Delts', rule: 'Show Up & Pull', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_tue_8', t: '08:00 PM', act: 'Dinner', instr: 'Tofu Bhurji (120g) + Bell Peppers', rule: 'Light Digest', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_tue_9', t: '10:00 PM', act: 'Lights Out & Sleep', instr: '8 Hours Restoration', rule: 'Deep Rest', type: 'hack', reminder: true, isRecurring: true }
  ],
  wed: [
    { id: 't_wed_0', t: '06:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + Lemon', rule: 'Prime Metabolism', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_wed_1', t: '08:00 AM', act: 'Breakfast', instr: 'Oats Veggie Chilla (2) + Curd', rule: 'High Fiber', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_wed_2', t: '01:00 PM', act: 'Lunch', instr: '2 Roti + Soya Chunks Sabzi + Salad', rule: '32g Protein Powerhouse', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_wed_3', t: '01:30 PM', act: 'Post-Meal Walk', instr: '10 Mins Walk', rule: 'Active Digestion', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_wed_4', t: '04:30 PM', act: 'Mid-Day Fuel', instr: 'Steamed Moong Sprouts Chaat (100g)', rule: 'Enzyme Rich', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_wed_5', t: '05:30 PM', act: 'Workout / Training', instr: 'Legs & Core Routine (Squats, Lunges, Plank)', rule: 'Never Skip Legs', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_wed_6', t: '08:00 PM', act: 'Dinner', instr: 'Grilled Paneer (100g) + Clear Veg Soup', rule: 'Warm Soothing', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_wed_7', t: '10:00 PM', act: 'Lights Out & Sleep', instr: '8 Hours Rest', rule: 'Muscle Synthesis', type: 'hack', reminder: true, isRecurring: true }
  ],
  thu: [
    { id: 't_thu_0', t: '06:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + Lemon', rule: 'Prime Metabolism', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_thu_1', t: '08:00 AM', act: 'Breakfast', instr: 'Ragi (Finger Millet) Dosa + Tomato Chutney', rule: 'Low-GI Complex Carbs', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_thu_2', t: '01:00 PM', act: 'Lunch', instr: 'Palak Paneer (120g) + 2 Rotis + Salad', rule: 'Iron & Protein', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_thu_3', t: '01:30 PM', act: 'Post-Meal Walk', instr: '10 Mins Walk', rule: 'Digestion', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_thu_4', t: '04:30 PM', act: 'Mid-Day Fuel', instr: '5 Soaked Almonds + 1 Walnut + Coconut Water', rule: 'Electrolytes & Fats', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_thu_5', t: '05:30 PM', act: 'Workout / Training', instr: 'Push Day 2: Incline DB Press & Core', rule: 'Upper Body', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_thu_6', t: '08:00 PM', act: 'Dinner', instr: 'Stir Fry Veggies + Sautéed Paneer (80g)', rule: 'High Heat Wok', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_thu_7', t: '10:00 PM', act: 'Lights Out & Sleep', instr: '8 Hours Sleep', rule: 'Recovery', type: 'hack', reminder: true, isRecurring: true }
  ],
  fri: [
    { id: 't_fri_0', t: '06:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + Lemon', rule: 'Prime Metabolism', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_fri_1', t: '08:00 AM', act: 'Breakfast', instr: 'Veg Poha (60g) + Peanuts + Sprouts', rule: 'Iron-Rich Breakfast', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_fri_2', t: '01:00 PM', act: 'Lunch', instr: 'Kala Chana Curry + 2 Rotis + Beet Salad', rule: 'Iron & Fiber Power', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_fri_3', t: '01:30 PM', act: 'Post-Meal Walk', instr: '10 Mins Walk', rule: 'Active Digestion', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_fri_4', t: '04:30 PM', act: 'Mid-Day Fuel', instr: '1 Crisp Apple + Green Tea + Pumpkin Seeds', rule: 'Antioxidants', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_fri_5', t: '05:30 PM', act: 'Workout / Training', instr: 'Pull Day 2: Romanian Deadlift & Curls', rule: 'Posterior Chain', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_fri_6', t: '08:00 PM', act: 'Dinner', instr: 'Bhindi Fry + Yellow Moong Dal + 1 Roti', rule: 'Digestive Rest', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_fri_7', t: '10:00 PM', act: 'Lights Out & Sleep', instr: '8 Hours Sleep', rule: 'Weekly Recovery', type: 'hack', reminder: true, isRecurring: true }
  ],
  sat: [
    { id: 't_sat_0', t: '07:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + Lemon', rule: 'Weekend Rhythm', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_sat_1', t: '08:30 AM', act: 'Breakfast', instr: 'Methi Thepla (2) + Fresh Curd', rule: 'Insulin Sensitizing', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_sat_2', t: '01:00 PM', act: 'Lunch', instr: 'Moong Dal Khichdi + 1 tsp Ghee + Curd', rule: 'Gut Reset', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_sat_3', t: '05:00 PM', act: 'Home Calisthenics / Yoga', instr: 'Bodyweight Pushups, Squats & Mobility', rule: 'Active Movement', type: 'workout', reminder: true, isRecurring: true },
    { id: 't_sat_4', t: '08:00 PM', act: 'Dinner', instr: 'Besan Chilla (2) + Tomato Onion Salad', rule: 'Light Dinner', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_sat_5', t: '10:30 PM', act: 'Lights Out & Sleep', instr: 'Restorative Sleep', rule: 'Weekly Reset', type: 'hack', reminder: true, isRecurring: true }
  ],
  sun: [
    { id: 't_sun_0', t: '07:00 AM', act: 'Wake Up & Hydrate', instr: '500ml Warm Water + Lemon', rule: 'Weekend Awakening', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_sun_1', t: '08:30 AM', act: 'Breakfast', instr: '2 Idlis + Thick Dal Sambhar + Chutney', rule: 'Fermented Probiotics', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_sun_2', t: '01:00 PM', act: 'Lunch', instr: '1 Cup Rice + Yellow Dal Tadka + Curd + Salad', rule: 'Classic Comfort', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_sun_3', t: '05:00 PM', act: 'Weekly Meal Prep / Walk', instr: 'Gentle Walk & Plan Ahead for the Week', rule: 'Mindset & Clarity', type: 'hack', reminder: true, isRecurring: true },
    { id: 't_sun_4', t: '08:00 PM', act: 'Dinner', instr: 'Large Rainbow Salad + Fresh Curd + Flaxseeds', rule: 'Gut Rest', type: 'meal', reminder: true, isRecurring: true },
    { id: 't_sun_5', t: '10:00 PM', act: 'Lights Out & Sleep', instr: '8 Hours Prime Sleep for Week Ahead', rule: 'Consistency', type: 'hack', reminder: true, isRecurring: true }
  ]
};
