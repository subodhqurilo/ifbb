import express from 'express';
import adminSignUpController from '../../controllers/admin/auth/adminSignUpController.js';
import adminLoginController from '../../controllers/admin/auth/adminLoginController.js';
import adminLogOutController from '../../controllers/admin/auth/adminLogOutController.js';
import { adminSignUpValidator } from '../../validators/adminSignUpValidator.js';
import { adminLoginValidator } from '../../validators/adminLoginValidator.js';
import uploadAffiliationController from '../../controllers/admin/affiliation/uploadAffiliationController.js';
import upload from '../../middleware/multer.js';

const router = express.Router();

router.post('/admin-sign-up', adminSignUpValidator, adminSignUpController);
router.post('/admin-log-in', adminLoginValidator, adminLoginController);
router.post('/admin-log-out', adminLogOutController);
router.post(
  '/upload-affiliation',
  upload.single('image'),
  uploadAffiliationController
);
export default router;
