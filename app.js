// app.js
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
app.use(cookieParser());

// ⭐ FIXED CORS (LOCALHOST + VERCEL allowed)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5001",
      "http://localhost:5002",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "https://ifbb-1.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// ⭐ Root Route — Fix for "Cannot GET /"
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running on Vercel" });
});

// ROUTES
app.use('/api/user/', userAuthRoutes);
app.use('/api/user/', userDataRoutes);
app.use('/api/admin/', adminAuthRoutes);
app.use('/api/admin', adminCourseRoutes);
app.use('/api/admin', adminDataRoutes);
app.use('/api/payments/', paymentRoutes);

export default app;
