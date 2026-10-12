import { connectDatabase } from './config/database';
import { startServer } from './server';
import mongoose from 'mongoose';

async function main() {
  await connectDatabase();
  await startServer();
}

main().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  mongoose.disconnect().catch((disconnectError: unknown) => {
    console.error('Unable to disconnect from MongoDB:', disconnectError);
  });
  process.exitCode = 1;
});
