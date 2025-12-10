import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';

import userAuthRoutes from './routes/user/userAuthRoutes.js';
import adminAuthRoutes from './routes/admin/adminAuthRoutes.js';
import userDataRoutes from './routes/user/userDataRoutes.js';
import adminCourseRoutes from './routes/admin/adminCourseRoutes.js';
import adminDataRoutes from './routes/admin/adminDataRoutes.js';
import paymentRoutes from './routes/payments/paymentRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5001',
      'http://localhost:5002',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3012',
      'http://localhost:3001',
      'http://localhost:5173',
      'https://058wb61p-8080.inc1.devtunnels.ms/',
      'https://localhost:3000',
    ],
    credentials: true,
  })
);

app.use(express.json());

// Custom Morgan Logger
const customMorganFormat = (tokens, req, res) => {
  const status = tokens.status(req, res);
  const statusColor =
    status >= 500
      ? chalk.red
      : status >= 400
      ? chalk.yellow
      : status >= 300
      ? chalk.cyan
      : status >= 200
      ? chalk.green
      : chalk.white;

  return [
    chalk.gray(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    statusColor(status),
    chalk.gray(tokens['response-time'](req, res) + ' ms'),
  ].join(' ');
};

app.use(morgan(customMorganFormat));

// ROUTES
app.use('/api/user/', userAuthRoutes);
app.use('/api/user/', userDataRoutes);
app.use('/api/admin/', adminAuthRoutes);
app.use('/api/admin', adminCourseRoutes);
app.use('/api/admin', adminDataRoutes);
app.use('/api/payments/', paymentRoutes);

// Export app for server.js or index.js
export default app;
