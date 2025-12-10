import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import dbConnect from './utils/dbConnection.js';
import userAuthRoutes from './routes/user/userAuthRoutes.js';
import adminAuthRoutes from './routes/admin/adminAuthRoutes.js';
import userDataRoutes from './routes/user/userDataRoutes.js';
import adminCourseRoutes from './routes/admin/adminCourseRoutes.js';
import adminDataRoutes from './routes/admin/adminDataRoutes.js';
import paymentRoutes from './routes/payments/paymentRoutes.js';
import cookieParser from 'cookie-parser';
import userAuthMiddleware from './middleware/userAuthMiddleware.js';
import adminAuthMiddleware from './middleware/adminAuthMiddleware.js';
dotenv.config();
const PORT = process.env.PORT || 5003;

const app = express();

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
    ], // Your frontend URLs
    credentials: true, // CRITICAL: This allows cookies to be sent
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

// Custom Morgan format with chalk colors
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

//User Auth
app.use('/api/user/', userAuthRoutes);

// Get User's Purchased Course
app.use('/api/user/', userDataRoutes);

//Admin Auth
app.use('/api/admin/', adminAuthRoutes);

//Admin Create Course and Add Module
app.use('/api/admin',  adminCourseRoutes);

//Admin getting all the courses data
app.use('/api/admin',  adminDataRoutes);

//Payments
app.use('/api/payments/', paymentRoutes);
(async () => {
  await dbConnect();
  app.listen(5003, () => {
    console.log(chalk.blueBright(`App is running on port ${PORT}`));
  });
})();
