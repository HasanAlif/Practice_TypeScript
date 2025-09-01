import express from 'express';
import type { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './connection/db';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello World! E-Commerce API is running 🚀</h1>`);
});

// Start server and connect to database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
/* The code block below is setting up event listeners for the `SIGINT` and `SIGTERM` signals in
Node.js. */
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});

startServer();
