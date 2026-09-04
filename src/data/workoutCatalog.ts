import { WorkoutRoutine } from '../types';

export const CURATED_WORKOUT_DATABASE: Record<string, WorkoutRoutine> = {
  // ==========================================
  // 🏡 HOME WORKOUT PROTOCOLS (Light & Bodyweight)
  // ==========================================
  home_fat_loss_hiit: {
    id: 'w_home_fat_loss_hiit',
    name: '🔥 Home Metabolic Fat Burn & Core Circuit',
    splitType: 'home_calisthenics',
    estimatedDurationMins: 30,
    warmup: [
      '2 mins Arm Circles & Torso Twists',
      '2 mins High Knees & Butt Kicks',
      '15 Bodyweight Air Squats'
    ],
    exercises: [
      {
        id: 'ex_hiit_air_squat',
        name: 'Tempo Air Squats (Explosive Ascend)',
        targetMuscle: 'Quadriceps, Glutes, Heart Rate',
        equipment: 'bodyweight',
        sets: 4,
        reps: '15-20 reps',
        restSeconds: 45,
        instructions: [
          'Stand tall with feet shoulder-width apart.',
          'Lower hips back and down to parallel in 2 seconds.',
          'Explode upwards through heels and squeeze glutes at the top.'
        ],
        techniqueTips: ['Keep chest lifted and gaze forward', 'Continuous rhythmic breathing'],
        commonMistakes: ['Knees caving inward', 'Rounding upper back'],
        easierAlternative: 'Chair Tap Squats',
        harderProgression: 'Jump Squats'
      },
      {
        id: 'ex_hiit_mountain_climbers',
        name: 'Cross-Body Mountain Climbers',
        targetMuscle: 'Transverse Abdominis, Obliques, Cardio',
        equipment: 'bodyweight',
        sets: 4,
        reps: '30-40 secs',
        restSeconds: 45,
        instructions: [
          'Start in high plank position with wrists directly beneath shoulders.',
          'Drive right knee toward left elbow, return, then left knee toward right elbow.',
          'Maintain a rapid, controlled cadence while keeping hips level.'
        ],
        techniqueTips: ['Do not let hips bounce in the air', 'Keep shoulders stacked directly over palms'],
        commonMistakes: ['Bouncing hips violently', 'Holding breath'],
        easierAlternative: 'Elevated Tabletop Climbers',
        harderProgression: 'Spiderman Plank Climbers'
      },
      {
        id: 'ex_hiit_pushup_walkout',
        name: 'Inchworm Hand-Walkouts + Pushup',
        targetMuscle: 'Pectorals, Anterior Deltoids, Hamstrings',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-10 reps',
        restSeconds: 60,
        instructions: [
          'Stand tall, hinge at hips, touch floor with hands.',
          'Walk hands out to plank, perform 1 crisp push-up.',
          'Walk hands back to feet and stand tall.'
        ],
        techniqueTips: ['Keep legs as straight as mobility allows during the walkout'],
        commonMistakes: ['Sagging lower spine in plank'],
        easierAlternative: 'Knee Pushup Walkout',
        harderProgression: 'Walkout + Decline Pushup'
      },
      {
        id: 'ex_hiit_glute_bridge',
        name: 'Glute Bridge March with Core Hold',
        targetMuscle: 'Glutes, Hamstrings, Pelvic Floor',
        equipment: 'bodyweight',
        sets: 3,
        reps: '12 per leg',
        restSeconds: 45,
        instructions: [
          'Lie on back with knees bent and feet flat on floor.',
          'Lift hips until body forms straight line from knees to shoulders.',
          'Alternate lifting one knee toward chest while stabilizing opposite glute.'
        ],
        techniqueTips: ['Squeeze glutes at top of bridge', 'Do not hyperextend lower back'],
        commonMistakes: ['Dropping hips as foot lifts'],
        easierAlternative: 'Standard Bilateral Glute Bridge',
        harderProgression: 'Single-Leg Elevated Glute Bridge'
      }
    ],
    cooldown: [
      '2 mins Child’s Pose with Deep Breathing',
      '2 mins Standing Hamstring & Quad Stretch',
      '1 min Cobra Abdominal Stretch'
    ]
  },

  home_muscle_calisthenics: {
    id: 'w_home_muscle_calisthenics',
    name: '💪 Home Calisthenics Muscle Builder',
    splitType: 'home_calisthenics',
    estimatedDurationMins: 35,
    warmup: [
      '2 mins Wrist & Shoulder Circles',
      '2 mins Arm Swings & Cat-Cow Flow',
      '10 Scapular Pushups'
    ],
    exercises: [
      {
        id: 'ex_home_prog_pushup',
        name: 'Controlled Tempo Push-Ups (3s Down)',
        targetMuscle: 'Pectorals, Anterior Delts, Triceps',
        equipment: 'bodyweight',
        sets: 4,
        reps: '10-15 reps',
        restSeconds: 75,
        instructions: [
          'Set hands slightly wider than shoulder width.',
          'Lower body smoothly for 3 seconds until chest grazes floor.',
          'Pause for 1 second, press floor away forcefully.'
        ],
        techniqueTips: ['Elbows at 45-degree arrow angle', 'Lock core and glutes rigid'],
        commonMistakes: ['Flaring elbows wide', 'Sagging hips'],
        easierAlternative: 'Incline Desk / Knee Pushup',
        harderProgression: 'Feet-Elevated Decline / Diamond Pushup'
      },
      {
        id: 'ex_home_bulgarian_squat',
        name: 'Bulgarian Split Squats (Couch / Chair)',
        targetMuscle: 'Quadriceps, Glutes, Adductors',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-12 per leg',
        restSeconds: 60,
        instructions: [
          'Place rear foot elevated on a chair or couch behind you.',
          'Descend into lunge until front thigh is parallel to ground.',
          'Drive through front heel to return to top.'
        ],
        techniqueTips: ['Keep 80% of weight on front foot', 'Torso slightly pitched forward'],
        commonMistakes: ['Pushing front knee excessively past toes'],
        easierAlternative: 'Static Forward Lunge',
        harderProgression: 'Tempo Pause Split Squat'
      },
      {
        id: 'ex_home_pike_pushup',
        name: 'Pike Push-Ups (Shoulder Focus)',
        targetMuscle: 'Deltoids, Upper Chest, Triceps',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12 reps',
        restSeconds: 75,
        instructions: [
          'Form an inverted V (downward dog) shape with hips high in the air.',
          'Lower head down and slightly forward between hands.',
          'Press back upward through palms to lock shoulders.'
        ],
        techniqueTips: ['Look back towards feet to keep neck neutral'],
        commonMistakes: ['Allowing hips to drop flat into plank'],
        easierAlternative: 'High Incline Pike Pushup',
        harderProgression: 'Feet-Elevated Pike Pushup'
      },
      {
        id: 'ex_home_chair_dips',
        name: 'Bench / Chair Tricep Dips',
        targetMuscle: 'Triceps, Front Deltoids',
        equipment: 'bodyweight',
        sets: 3,
        reps: '12-15 reps',
        restSeconds: 60,
        instructions: [
          'Grip edge of sturdy chair or bed with hands next to hips.',
          'Lower hips down with elbows bending straight backward to 90 degrees.',
          'Press down to lockout triceps.'
        ],
        techniqueTips: ['Keep back close to edge of chair', 'Do not shrug shoulders up'],
        commonMistakes: ['Flaring elbows out to sides'],
        easierAlternative: 'Bent Knee Dips',
        harderProgression: 'Straight Legs / Elevated Feet Dips'
      }
    ],
    cooldown: [
      '2 mins Overhead Tricep Stretch',
      '2 mins Doorframe Chest Stretch',
      '1 min Seated Forward Fold'
    ]
  },

  home_light_mobility: {
    id: 'w_home_light_mobility',
    name: '🌸 Home Light Mobility & PCOS Low-Cortisol Flow',
    splitType: 'cardio_mobility',
    estimatedDurationMins: 25,
    warmup: [
      '3 mins Deep Diaphragmatic Box Breathing',
      '2 mins Gentle Neck & Shoulder Rolls',
      '2 mins Cat-Cow Spinal Waves'
    ],
    exercises: [
      {
        id: 'ex_mobility_cat_cow',
        name: 'Cat-Cow Spinal Articulation + Child’s Pose',
        targetMuscle: 'Spine, Pelvic Floor, Parasympathetic Reset',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10 slow breaths',
        restSeconds: 30,
        instructions: [
          'On hands and knees, inhale as you arch back and look up (Cow).',
          'Exhale as you round spine up towards ceiling and tuck chin (Cat).',
          'Sink hips back onto heels into Child’s Pose.'
        ],
        techniqueTips: ['Move seamlessly with breath tempo'],
        commonMistakes: ['Rushing movements without full spinal flex']
      },
      {
        id: 'ex_mobility_pigeon',
        name: 'Pigeon Pose / Glute & Hip Opener',
        targetMuscle: 'Glutes, Hip Flexors, Sciatic Nerve',
        equipment: 'bodyweight',
        sets: 2,
        reps: '60s per side',
        restSeconds: 30,
        instructions: [
          'Bring right knee forward behind right wrist, shin angled across floor.',
          'Extend left leg straight back with top of foot on mat.',
          'Lower torso down onto forearms and breathe deeply.'
        ],
        techniqueTips: ['Keep hips square to the ground', 'Relax facial and jaw muscles'],
        commonMistakes: ['Rolling onto side hip']
      },
      {
        id: 'ex_mobility_deadbug',
        name: 'Slow Controlled Deadbugs',
        targetMuscle: 'Deep Core, Transverse Abdominis',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10 per side',
        restSeconds: 45,
        instructions: [
          'Lie on back with arms pointing up and knees at 90 degrees.',
          'Press lower back flat into floor (zero arch).',
          'Slowly lower opposite arm and leg toward floor, then return.'
        ],
        techniqueTips: ['Lower back must NEVER leave the floor'],
        commonMistakes: ['Arching lumbar spine as limbs descend'],
        easierAlternative: 'Heel Taps Only',
        harderProgression: 'Straight Leg Lowering'
      }
    ],
    cooldown: [
      '3 mins Legs Up The Wall (Viparita Karani)',
      '2 mins Savasana Corpse Pose'
    ]
  },

  // ==========================================
  // 🏋️ GYM PROTOCOLS (Weights & Machines)
  // ==========================================
  gym_fat_loss_push_pull: {
    id: 'w_gym_fat_loss_push_pull',
    name: '🔥 Gym Metabolic Compound & Fat Burn Split',
    splitType: 'full_body',
    estimatedDurationMins: 45,
    warmup: [
      '5 mins Incline Treadmill Walk (12% Incline, 4.5 km/h)',
      'Arm Circles & Bodyweight Air Squats'
    ],
    exercises: [
      {
        id: 'ex_gym_db_squat_press',
        name: 'Dumbbell Thruster (Squat to Overhead Press)',
        targetMuscle: 'Full Body, Quads, Shoulders, High Caloric Burn',
        equipment: 'dumbbells',
        sets: 4,
        reps: '10-12 reps',
        restSeconds: 60,
        instructions: [
          'Hold dumbbells at shoulder height with neutral grip.',
          'Squat down to parallel with chest proud.',
          'Drive up forcefully using momentum to press dumbbells directly overhead.'
        ],
        techniqueTips: ['One fluid transition from squat to press'],
        commonMistakes: ['Pausing at bottom or pressing before standing'],
        easierAlternative: 'Goblet Squat (No Press)',
        harderProgression: 'Barbell Thruster'
      },
      {
        id: 'ex_gym_lat_pulldown_superset',
        name: 'Wide-Grip Lat Pulldown',
        targetMuscle: 'Latissimus Dorsi, Biceps, Upper Back',
        equipment: 'gym_machines',
        sets: 4,
        reps: '12-15 reps',
        restSeconds: 60,
        instructions: [
          'Grip wide bar, sit upright with thighs locked under pads.',
          'Pull elbows straight down to ribcage, pulling bar to collarbone.',
          'Slow 2-second release on the way up.'
        ],
        techniqueTips: ['Lead with elbows, squeeze shoulder blades together'],
        commonMistakes: ['Swinging torso back excessively'],
        easierAlternative: 'Seated Cable Row',
        harderProgression: 'Weighted Strict Pull-Up'
      },
      {
        id: 'ex_gym_romanian_deadlift',
        name: 'Dumbbell / Barbell Romanian Deadlift (RDL)',
        targetMuscle: 'Hamstrings, Glutes, Lower Back',
        equipment: 'dumbbells',
        sets: 3,
        reps: '10-12 reps',
        restSeconds: 75,
        instructions: [
          'Hold weights in front of thighs with soft micro-bend in knees.',
          'Push hips back towards wall as if closing a car door with hips.',
          'Lower weights down shins until deep hamstring stretch, drive hips forward to lockout.'
        ],
        techniqueTips: ['Keep bar/dumbbells glued close to shins', 'Flat neutral spine at all times'],
        commonMistakes: ['Rounding back', 'Turning it into a squat'],
        easierAlternative: 'Single-Dumbbell RDL',
        harderProgression: 'Barbell RDL'
      },
      {
        id: 'ex_gym_incline_walk',
        name: 'Incline Treadmill / Stairmaster Interval Finish',
        targetMuscle: 'Cardiovascular, Glutes, Calves',
        equipment: 'gym_machines',
        sets: 1,
        reps: '10-12 mins',
        restSeconds: 60,
        instructions: [
          'Set treadmill incline to 10-12% and speed to 4.5-5.0 km/h.',
          'Walk with long strides without holding onto the handrails.'
        ],
        techniqueTips: ['Maintain upright posture, breathe through nose when possible']
      }
    ],
    cooldown: [
      '2 mins Standing Hamstring Stretch',
      '2 mins Hanging Bar Decompression Stretch'
    ]
  },

  ppl_push: {
    id: 'w_ppl_push',
    name: 'Push Day (Chest, Shoulders, Triceps)',
    splitType: 'push_pull_legs',
    estimatedDurationMins: 50,
    warmup: ['Arm Circles', 'Shoulder Rotations', 'Light Incline Pushups'],
    exercises: [
      {
        id: 'ex_bench_press',
        name: 'Flat Barbell / Dumbbell Bench Press',
        targetMuscle: 'Pectoralis Major, Anterior Deltoids, Triceps',
        equipment: 'dumbbells',
        sets: 4,
        reps: '8-10',
        restSeconds: 90,
        instructions: [
          'Lie flat with eyes under bar, retract and pin shoulder blades into bench.',
          'Lower bar with control to lower chest/nipple line.',
          'Drive feet into floor and press bar up to full lockout.'
        ],
        techniqueTips: ['Maintain slight arch in lumbar spine', 'Keep wrists straight above elbows'],
        commonMistakes: ['Flaring elbows at 90 degrees', 'Bouncing bar off sternum'],
        easierAlternative: 'Dumbbell Floor Press',
        harderProgression: 'Pause Bench Press (1s on chest)'
      },
      {
        id: 'ex_incline_db_press',
        name: 'Incline Dumbbell Press (30-Degree Angle)',
        targetMuscle: 'Clavicular Upper Chest, Front Delts',
        equipment: 'dumbbells',
        sets: 3,
        reps: '10-12',
        restSeconds: 75,
        instructions: [
          'Set bench at 30 degrees.',
          'Press dumbbells up in a gentle triangle arc over upper chest.'
        ],
        techniqueTips: ['Do not set incline too steep (keep at 30 deg to avoid over-activating delts)'],
        commonMistakes: ['Flaring elbows out excessively'],
        easierAlternative: 'Incline Machine Chest Press',
        harderProgression: 'Incline Dumbbell Press with 3s eccentric'
      },
      {
        id: 'ex_lateral_raise',
        name: 'Dumbbell Lateral Raise (Side Delts)',
        targetMuscle: 'Lateral Deltoids (Capped Shoulders)',
        equipment: 'dumbbells',
        sets: 4,
        reps: '12-15',
        restSeconds: 60,
        instructions: [
          'Stand with slight forward lean.',
          'Raise dumbbells outward in scapular plane (30 deg forward) to shoulder level.'
        ],
        techniqueTips: ['Lead with elbows and turn pinkies slightly up', 'Controlled descent'],
        commonMistakes: ['Shrugging traps or swinging momentum'],
        easierAlternative: 'Cable Lateral Raise',
        harderProgression: '1.5-Rep Lateral Raises'
      },
      {
        id: 'ex_tricep_rope',
        name: 'Cable Tricep Rope Pushdown',
        targetMuscle: 'Lateral & Medial Triceps Heads',
        equipment: 'gym_machines',
        sets: 3,
        reps: '12-15',
        restSeconds: 60,
        instructions: [
          'Keep elbows pinned tight to sides.',
          'Extend arms straight down and spread rope apart at bottom.'
        ],
        techniqueTips: ['Lock out triceps with 1s squeeze at bottom'],
        commonMistakes: ['Elbows drifting forward on the way up'],
        easierAlternative: 'Straight Bar Pushdown',
        harderProgression: 'Overhead Cable Rope Extension'
      }
    ],
    cooldown: ['Doorway Chest Stretch', 'Overhead Tricep Stretch']
  },

  ppl_pull: {
    id: 'w_ppl_pull',
    name: 'Pull Day (Back, Biceps, Rear Delts)',
    splitType: 'push_pull_legs',
    estimatedDurationMins: 50,
    warmup: ['Band Pull-Aparts', 'Cat-Cow', 'Lat Stretch'],
    exercises: [
      {
        id: 'ex_barbell_row',
        name: 'Bent-Over Barbell / Dumbbell Row',
        targetMuscle: 'Lats, Rhomboids, Middle Trapezius',
        equipment: 'dumbbells',
        sets: 4,
        reps: '8-10',
        restSeconds: 90,
        instructions: [
          'Hinge hips back at 45 degrees with flat spine.',
          'Pull weight towards belly button, driving elbows straight back.'
        ],
        techniqueTips: ['Keep core braced and spine neutral', 'Do not yank with upper body'],
        commonMistakes: ['Rounding lower back'],
        easierAlternative: 'Chest-Supported Dumbbell Row',
        harderProgression: 'Pendlay Row (from floor each rep)'
      },
      {
        id: 'ex_lat_pulldown_gym',
        name: 'Seated Cable Lat Pulldown',
        targetMuscle: 'Latissimus Dorsi (Back Width)',
        equipment: 'gym_machines',
        sets: 3,
        reps: '10-12',
        restSeconds: 75,
        instructions: ['Grip wide, depress scapula, drive elbows down to chest pockets.'],
        techniqueTips: ['Squeeze lats hard at bottom'],
        commonMistakes: ['Leaning back 45 degrees']
      },
      {
        id: 'ex_face_pull',
        name: 'Cable Face Pull (Postural Health)',
        targetMuscle: 'Rear Deltoids, Rotator Cuff',
        equipment: 'gym_machines',
        sets: 3,
        reps: '15-20',
        restSeconds: 60,
        instructions: [
          'Set cable at eye level with rope attachment.',
          'Pull rope towards forehead, rotating hands backwards.'
        ],
        techniqueTips: ['Crucial for fixing rounded computer shoulders'],
        commonMistakes: ['Using too much weight and using back momentum']
      },
      {
        id: 'ex_bicep_curls',
        name: 'Incline Dumbbell / Barbell Bicep Curls',
        targetMuscle: 'Biceps Brachii',
        equipment: 'dumbbells',
        sets: 3,
        reps: '10-12',
        restSeconds: 60,
        instructions: ['Curl dumbbells with controlled tempo, supinating wrists at top.'],
        techniqueTips: ['Full supination (turn pinkies up) at top'],
        commonMistakes: ['Swinging elbows forward']
      }
    ],
    cooldown: ['Kneeling Lat Stretch', 'Seated Hamstring Stretch']
  },

  legs_core: {
    id: 'w_legs_core',
    name: 'Legs & Core Conditioning',
    splitType: 'push_pull_legs',
    estimatedDurationMins: 45,
    warmup: ['Bodyweight Lunges', 'High Knees', 'Glute Activation Bridges'],
    exercises: [
      {
        id: 'ex_leg_press',
        name: 'Leg Press / Barbell Back Squat',
        targetMuscle: 'Quadriceps, Adductors',
        equipment: 'gym_machines',
        sets: 4,
        reps: '10-12',
        restSeconds: 90,
        instructions: [
          'Place feet shoulder-width on platform.',
          'Lower sled until knees bend at 90 degrees. Press through mid-foot.'
        ],
        techniqueTips: ['Do not lock out knees at top'],
        commonMistakes: ['Butt lifting off back pad at bottom']
      },
      {
        id: 'ex_walking_lunges',
        name: 'Dumbbell Walking Lunges',
        targetMuscle: 'Glutes, Quads, Balance',
        equipment: 'dumbbells',
        sets: 3,
        reps: '12 per leg',
        restSeconds: 75,
        instructions: ['Step forward into a lunge with both knees reaching 90 degrees.'],
        techniqueTips: ['Keep torso upright and stable']
      },
      {
        id: 'ex_plank',
        name: 'Hardstyle Forearm Plank',
        targetMuscle: 'Transverse Abdominis, Core Stabilizers',
        equipment: 'bodyweight',
        sets: 3,
        reps: '45-60s',
        restSeconds: 60,
        instructions: ['Rest on forearms and toes. Actively pull elbows towards toes.'],
        techniqueTips: ['Breathe steadily into abdomen'],
        commonMistakes: ['Hips sagging']
      }
    ],
    cooldown: ['Pigeon Pose (1 min per side)', 'Cobra Stretch for Abdominals']
  },

  full_body_starter: {
    id: 'w_full_body_starter',
    name: 'Full Body Foundational Split',
    splitType: 'full_body',
    estimatedDurationMins: 45,
    warmup: [
      '3 mins Arm Circles & Shoulder Dislocates',
      '2 mins Bodyweight Torso Twists & Hip Openers',
      '20 Bodyweight Air Squats'
    ],
    exercises: [
      {
        id: 'ex_squat',
        name: 'Barbell / Goblet Squat',
        targetMuscle: 'Quadriceps, Glutes, Core',
        equipment: 'dumbbells',
        sets: 3,
        reps: '10-12',
        restSeconds: 90,
        instructions: [
          'Stand with feet shoulder-width apart, toes pointed slightly outward.',
          'Hinge hips backward and push knees outward in line with toes.'
        ],
        techniqueTips: ['Keep chest proud and spine neutral']
      },
      {
        id: 'ex_pushup',
        name: 'Dumbbell Bench Press / Push-Up',
        targetMuscle: 'Pectorals, Anterior Deltoids, Triceps',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-15',
        restSeconds: 60,
        instructions: ['Lower chest until it hovers 1 inch above floor with elbows tucked at 45 degrees.'],
        techniqueTips: ['Squeeze glutes and brace abs throughout']
      },
      {
        id: 'ex_lat_pulldown',
        name: 'Lat Pulldown / Cable Row',
        targetMuscle: 'Latissimus Dorsi, Biceps',
        equipment: 'gym_machines',
        sets: 3,
        reps: '12-15',
        restSeconds: 75,
        instructions: ['Grip wide bar, pull elbows straight down towards back pockets.'],
        techniqueTips: ['Control the eccentric return under tension for 2-3 seconds.']
      }
    ],
    cooldown: ['2 mins Overhead Lat Stretch', '2 mins Standing Quad Stretch']
  },

  // ==========================================
  // 🌸 PCOS / PCOD HORMONE & INSULIN PROTOCOLS
  // ==========================================
  home_pcos_hormone_balance: {
    id: 'w_home_pcos_hormone_balance',
    name: '🌸 PCOS/PCOD Low-Cortisol Strength & Hormone Balance (Home)',
    splitType: 'home_calisthenics',
    estimatedDurationMins: 30,
    warmup: [
      '2 mins Cat-Cow & Pelvic Tilts (Relieves pelvic tension)',
      '2 mins Standing Hip Openers & Gentle March',
      '15 Bodyweight Glute Bridges'
    ],
    exercises: [
      {
        id: 'ex_pcos_glute_bridge',
        name: 'Single-Leg & Double Glute Bridge (Slow Tempo)',
        targetMuscle: 'Glutes, Hamstrings, Pelvic Floor',
        equipment: 'bodyweight',
        sets: 3,
        reps: '15-18 reps (2s hold)',
        restSeconds: 45,
        instructions: [
          'Lie on back with knees bent and feet flat on floor hip-width apart.',
          'Drive through heels to lift hips until thighs and torso align.',
          'Hold and squeeze glutes at the top for 2 full seconds before lowering.'
        ],
        techniqueTips: ['Do not hyperextend lower back', 'Keep ribs pulled down'],
        easierAlternative: 'Standard Glute Bridge',
        harderProgression: 'Elevated Feet Glute Bridge'
      },
      {
        id: 'ex_pcos_goblet_squat',
        name: 'Tempo Goblet / Chair Squats',
        targetMuscle: 'Quadriceps, Glutes, Core (Insulin Receptor Activation)',
        equipment: 'dumbbells',
        sets: 3,
        reps: '12-15 reps',
        restSeconds: 60,
        instructions: [
          'Hold a light dumbbell or water bottle at chest level.',
          'Sit hips back and down to chair height in a controlled 3-second descent.',
          'Drive up smoothly without jarring the joints.'
        ],
        techniqueTips: ['Keep heels grounded', 'Breathe out on the way up'],
        easierAlternative: 'Bodyweight Box Squats',
        harderProgression: '1.5 Rep Pause Squats'
      },
      {
        id: 'ex_pcos_band_pullaparts',
        name: 'Band / Towel Scapular Retractions',
        targetMuscle: 'Upper Back, Rhomboids, Postural Chains',
        equipment: 'resistance_bands',
        sets: 3,
        reps: '15 reps',
        restSeconds: 45,
        instructions: [
          'Hold resistance band or towel at shoulder height with straight arms.',
          'Pull outward by squeezing shoulder blades together behind your heart.',
          'Return slowly under control.'
        ],
        techniqueTips: ['Keep shoulders away from ears', 'No shrugging'],
        easierAlternative: 'Wall Angels',
        harderProgression: 'Prone Cobra Holds'
      },
      {
        id: 'ex_pcos_deadbug',
        name: 'Pelvic-Braced Deadbug (Low-Cortisol Core)',
        targetMuscle: 'Deep Transverse Abdominis, Pelvic Stability',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10 reps each side',
        restSeconds: 45,
        instructions: [
          'Lie flat on back with arms extended up and knees bent at 90 degrees.',
          'Slowly lower opposite arm and leg toward floor while keeping lower back pressed flat.',
          'Return and repeat on opposite side.'
        ],
        techniqueTips: ['Never let lower back arch off the mat', 'Exhale during extension'],
        easierAlternative: 'Toe Taps on Floor',
        harderProgression: 'Deadbug with Yoga Block Squeeze'
      }
    ],
    cooldown: [
      '2 mins Child’s Pose with Deep Diaphragmatic Breathing',
      '2 mins Reclined Butterfly Pose (Supta Baddha Konasana)',
      '1 min Supine Spinal Twist each side'
    ]
  },

  gym_pcos_insulin_sensitize: {
    id: 'w_gym_pcos_insulin_sensitize',
    name: '🌸 PCOS/PCOD Resistance & GLUT-4 Translocation (Gym)',
    splitType: 'full_body',
    estimatedDurationMins: 40,
    warmup: [
      '5 mins Incline Treadmill Steady Walk (Zone 2)',
      '2 mins World’s Greatest Stretch',
      '15 Bodyweight Air Squats'
    ],
    exercises: [
      {
        id: 'ex_pcos_leg_press',
        name: 'Leg Press / Dumbbell Romanian Deadlift',
        targetMuscle: 'Glutes, Hamstrings, Major Skeletal Muscle Mass',
        equipment: 'gym_machines',
        sets: 3,
        reps: '12-15 reps (Moderate Load)',
        restSeconds: 75,
        instructions: [
          'Position feet shoulder-width on platform.',
          'Lower sled smoothly to 90-degree knee bend, avoiding rounding the lower back.',
          'Drive through whole foot to press up without locking knees.'
        ],
        techniqueTips: ['Moderate weights that allow smooth control', 'Keeps cortisol low while maximizing GLUT-4 receptors']
      },
      {
        id: 'ex_pcos_lat_pulldown',
        name: 'Neutral-Grip Lat Pulldown',
        targetMuscle: 'Latissimus Dorsi, Rhomboids, Biceps',
        equipment: 'gym_machines',
        sets: 3,
        reps: '12 reps',
        restSeconds: 60,
        instructions: [
          'Grip attachment, sit tall with chest lifted.',
          'Drive elbows straight down to ribcage level and squeeze shoulder blades.'
        ],
        techniqueTips: ['Control the upward return for 3 seconds']
      },
      {
        id: 'ex_pcos_seated_cable_row',
        name: 'Seated Cable Row to Belly Button',
        targetMuscle: 'Mid-Back, Trapezius, Core',
        equipment: 'gym_machines',
        sets: 3,
        reps: '12-15 reps',
        restSeconds: 60,
        instructions: [
          'Sit tall with knees slightly bent, pull handle toward navel.',
          'Hold contraction for 1 second before extending arms.'
        ],
        techniqueTips: ['Keep torso upright without swinging']
      }
    ],
    cooldown: [
      '3 mins Low-Intensity Steady Incline Walk',
      '2 mins Hamstring & Hip Flexor Stretches'
    ]
  }
};
