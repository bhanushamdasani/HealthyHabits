import mongoose, { Schema, Document } from 'mongoose';

export interface IDietPlan extends Document {
  userId: mongoose.Types.ObjectId;
  targetDailyCalories: number;
  targetDailyProteinGrams: number;
  days: Record<string, any>;
  varietyScore: number;
  active: boolean;
}

const DietPlanSchema = new Schema<IDietPlan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    targetDailyCalories: { type: Number, required: true },
    targetDailyProteinGrams: { type: Number, required: true },
    days: { type: Schema.Types.Mixed, required: true },
    varietyScore: { type: Number, default: 90 },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export const DietPlan = mongoose.models.DietPlan || mongoose.model<IDietPlan>('DietPlan', DietPlanSchema);
