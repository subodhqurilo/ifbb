import express from 'express';
import userSignUpController from '../../controllers/user/auth/userSignupController.js';
import userLoginController from '../../controllers/user/auth/userLoginController.js';
import { useSignUpValidator } from '../../validators/userSignUpValidator.js';
import { userLoginValidator } from '../../validators/userLogInValidator.js';
import { authenticateUser } from '../../utils/middlwares.js';

const router = express.Router();

router.post('/user-sign-up',useSignUpValidator, userSignUpController);
router.post('/user-log-in', userLoginValidator, userLoginController);

export default router;
