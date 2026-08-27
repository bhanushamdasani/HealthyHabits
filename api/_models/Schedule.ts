import mongoose, { Schema, Document } from 'mongoose';

const TaskItemSchema = new Schema({
  id: { type: String, required: true },
  t: { type: String, required: true },
  act: { type: String, required: true },
  instr: { type: String, default: '' },
  rule: { type: String, default: '' },
  type: { type: String, enum: ['hack', 'meal', 'workout', 'custom'], default: 'hack' },
  reminder: { type: Boolean, default: true },
  isRecurring: { type: Boolean, default: true }
}, { _id: false });

export interface ISchedule extends Document {
  userId: mongoose.Types.ObjectId;
  weeklySchedule: Record<string, any[]>;
  lightDayTypes: string[];
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    weeklySchedule: {
      mon: [TaskItemSchema],
      tue: [TaskItemSchema],
      wed: [TaskItemSchema],
      thu: [TaskItemSchema],
      fri: [TaskItemSchema],
      sat: [TaskItemSchema],
      sun: [TaskItemSchema]
    },
    lightDayTypes: [{ type: String, default: 'workout' }]
  },
  {
    timestamps: true
  }
);

export const Schedule = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
