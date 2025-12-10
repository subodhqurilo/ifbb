import express from 'express';

import userPurchasedCoursesController from '../../controllers/user/courses/userPurchasedCoursesController.js';

import { getAllCoursesController } from '../../controllers/user/courses/getAllCoursesController.js';
import { getUserProfileController } from '../../controllers/user/data/getUserProfileController.js';
import { getUserOneCourseController } from '../../controllers/user/courses/getUserOneCourseController.js';
import optionalAuthMiddleware from '../../middleware/optionalUserAuthMiddleware.js';
import userAuthMiddleware from '../../middleware/userAuthMiddleware.js';
const router = express.Router();

router.get(
  '/get-user-purchased-course/:userId',
  // userAuthMiddleware,
  userPurchasedCoursesController,
);

router.get('/get-user-profile/:userId', userAuthMiddleware, getUserProfileController);

// TODO: Add Optional Auth Middleware Here
router.get('/get-all-courses', getAllCoursesController);

// TODO: Add userauthmiddleware here
router.get('/get-one-course/:courseId', userAuthMiddleware, getUserOneCourseController);

export default router;
