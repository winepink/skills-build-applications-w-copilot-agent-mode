import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'walk', 'cycle', 'swim', 'strength', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    performedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
