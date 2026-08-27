import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  gender: string;
  heightCm: number;
  startWeightKg: number;
  currentWeightKg: number;
  goalWeightKg?: number;
  bloodGroup?: string;
  activityLevel: number;
  lifestyle: string;
  goal: string;
  cookingEffort: string;
  dislikedFoods: string[];
  allergies: string[];
  femaleConsiderations: string[];
  wakeTime: string;
  sleepTime: string;
  workoutDays: string[];
  workoutDurationMins: number;
  preferredWorkoutTime: string;
  accentTheme: string;
  chimeEnabled: boolean;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    name: { type: String, default: 'Warrior' },
    age: { type: Number, default: 24 },
    gender: { type: String, default: 'male' },
    heightCm: { type: Number, default: 170 },
    startWeightKg: { type: Number, default: 65 },
    currentWeightKg: { type: Number, default: 65 },
    goalWeightKg: { type: Number },
    bloodGroup: { type: String },
    activityLevel: { type: Number, default: 1.375 },
    lifestyle: { type: String, default: 'working_professional' },
    goal: { type: String, default: 'consistency' },
    cookingEffort: { type: String, default: 'moderate' },
    dislikedFoods: [{ type: String }],
    allergies: [{ type: String }],
    femaleConsiderations: [{ type: String }],
    wakeTime: { type: String, default: '06:00 AM' },
    sleepTime: { type: String, default: '10:00 PM' },
    workoutDays: [{ type: String }],
    workoutDurationMins: { type: Number, default: 45 },
    preferredWorkoutTime: { type: String, default: 'evening' },
    accentTheme: { type: String, default: 'classic' },
    chimeEnabled: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
