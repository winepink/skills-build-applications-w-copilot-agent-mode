import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    period: { type: String, required: true, default: 'weekly' },
    points: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true },
);

leaderboardSchema.index({ user: 1, team: 1, period: 1 }, { unique: true });

export default model('Leaderboard', leaderboardSchema);
