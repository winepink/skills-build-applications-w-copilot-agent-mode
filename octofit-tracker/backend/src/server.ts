import express, { type ErrorRequestHandler, type RequestHandler } from 'express';
import mongoose, { type Model } from 'mongoose';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

export const app = express();
const port = Number(process.env.PORT || 8000);
export const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(process.env.CODESPACE_NAME
    ? [`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`]
    : []),
]);

app.use((request, response, next) => {
  const origin = request.get('origin');
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

const list = <T>(resource: Model<T>): RequestHandler => async (_request, response) => {
  response.json(await resource.find().lean());
};

const create = <T>(resource: Model<T>): RequestHandler => async (request, response) => {
  if (request.body === null || typeof request.body !== 'object' || Array.isArray(request.body)) {
    response.status(400).json({ error: 'Request body must be a JSON object' });
    return;
  }

  const document = await resource.create(request.body);
  response.status(201).json(document);
};

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', list(User));
app.post('/api/users/', create(User));
app.get('/api/teams/', list(Team));
app.post('/api/teams/', create(Team));
app.get('/api/activities/', list(Activity));
app.post('/api/activities/', create(Activity));
app.get(
  '/api/leaderboard/',
  async (_request, response) => {
    response.json(
      await Leaderboard.find()
        .sort({ points: -1 })
        .populate('user', 'name')
        .populate('team', 'name')
        .lean(),
    );
  },
);
app.post('/api/leaderboard/', create(Leaderboard));
app.get('/api/workouts/', list(Workout));
app.post('/api/workouts/', create(Workout));

const handleError: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message });
    return;
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error.status === 400 || error.status === 413)
  ) {
    response.status(error.status).json({
      error: error.status === 413 ? 'Request body is too large' : 'Invalid JSON request body',
    });
    return;
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  ) {
    response.status(409).json({ error: 'A record with that unique value already exists' });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(handleError);

export function startServer() {
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on ${baseUrl}`);
      resolve();
    });
    server.once('error', reject);
  });
}
