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

const PORT = process.env.PORT || 5003;

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5002",
      "http://localhost:5003",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://ifbb-1.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/user/', userAuthRoutes);
app.use('/api/user/', userDataRoutes);

// Public admin route (login)
app.use('/api/admin/', adminAuthRoutes);

// Protected admin routes
app.use('/api/admin', adminAuthMiddleware, adminCourseRoutes);
app.use('/api/admin', adminAuthMiddleware, adminDataRoutes);

// Auth check API
app.get("/api/admin/check-auth", adminAuthMiddleware, (req, res) => {
  res.status(200).json({ loggedIn: true });
});

app.use('/api/payments/', paymentRoutes);

// Root
app.get("/", (req, res) => {
  res.send("IFBB Backend Running Successfully 🚀");
});

// Start server
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.green(`🚀 Server started on PORT: ${PORT}`));
  });
});
