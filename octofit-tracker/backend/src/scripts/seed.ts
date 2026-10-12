import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';
import { connectDatabase } from '../config/database';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    let user = await User.findOne({ email: 'mona@example.com' });
    if (!user) {
      user = await User.create({ name: 'Mona', email: 'mona@example.com' });
    }

    let team = await Team.findOne({ name: 'Octocats' });
    if (!team) {
      team = await Team.create({ name: 'Octocats' });
    }
    team.members = [user._id];
    team.points = 120;
    await team.save();
    user.team = team._id;
    await user.save();

    const performedAt = new Date('2026-01-01T09:00:00.000Z');
    let activity = await Activity.findOne({ user: user._id, type: 'run', performedAt });
    if (!activity) {
      activity = await Activity.create({
        user: user._id,
        type: 'run',
        durationMinutes: 30,
        distanceKm: 5,
        performedAt,
      });
    }

    let leaderboard = await Leaderboard.findOne({
      user: user._id,
      team: team._id,
      period: 'weekly',
    });
    if (!leaderboard) {
      leaderboard = await Leaderboard.create({
        user: user._id,
        team: team._id,
        period: 'weekly',
        points: 120,
      });
    }

    let workout = await Workout.findOne({ name: 'Interval Run' });
    if (!workout) {
      workout = await Workout.create({
        name: 'Interval Run',
        description: 'Alternate steady running with short, faster intervals.',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 30,
      });
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
