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

const app = express();

// ⭐ MUST USE Render PORT
const PORT = process.env.PORT || 5003;

// Middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5002",   // Admin Panel Local
      "https://ifbb-1.onrender.com", // Example admin domain
      "http://localhost:5003",
      "http://localhost:3000",
      "http://localhost:3001"

    ],
    credentials: true,
  })
);


app.use(express.json());

app.use(morgan("dev"));

// Routes
app.use('/api/user/', userAuthRoutes);
app.use('/api/user/', userDataRoutes);
app.use('/api/admin/', adminAuthRoutes);
app.use('/api/admin', adminAuthMiddleware, adminCourseRoutes);
app.use('/api/admin', adminAuthMiddleware, adminDataRoutes);
app.use('/api/payments/', paymentRoutes);
app.get("/", (req, res) => {
  res.send("IFBB Backend Running Successfully 🚀");
});

// ⭐ CONNECT DB + START SERVER
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.green(`🚀 Server started on PORT: ${PORT}`));
  });
});
