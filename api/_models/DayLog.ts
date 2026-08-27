import mongoose, { Schema, Document } from 'mongoose';

export interface IDayLog extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  mode: string;
  reason?: string;
  morningWeight?: number;
  eveningWeight?: number;
  waterIntakeMl: number;
  waterLogs: { time: string; amount: number }[];
  sleepLog?: { bedtime: string; waketime: string };
  completedTaskIds: string[];
}

const DayLogSchema = new Schema<IDayLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: String,
      required: true,
      index: true
    },
    mode: { type: String, enum: ['active', 'light', 'silent'], default: 'active' },
    reason: { type: String },
    morningWeight: { type: Number },
    eveningWeight: { type: Number },
    waterIntakeMl: { type: Number, default: 0 },
    waterLogs: [
      {
        time: { type: String },
        amount: { type: Number, default: 250 }
      }
    ],
    sleepLog: {
      bedtime: { type: String },
      waketime: { type: String }
    },
    completedTaskIds: [{ type: String }]
  },
  {
    timestamps: true
  }
);

DayLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export const DayLog = mongoose.models.DayLog || mongoose.model<IDayLog>('DayLog', DayLogSchema);
