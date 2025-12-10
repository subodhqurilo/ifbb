import express from 'express';
import { getUploader } from '../../utils/multer.js';
import { addCourseController } from '../../controllers/admin/course/addCourseController.js';
import { addModuleController } from '../../controllers/admin/course/addModuleController.js';
import { changeCourseVisibility } from '../../controllers/admin/course/changeCourseVisibilityController.js';
import { getOneCourseController } from '../../controllers/admin/course/getOneCourseController.js';
import { deleteCourseController } from '../../controllers/admin/course/deleteCourseController.js';
import { editCourseController } from '../../controllers/admin/course/editCourseController.js';
import adminAuthMiddlware from '../../middleware/adminAuthMiddleware.js';
import { deleteModuleController } from '../../controllers/admin/course/deleteModuleController.js';
// import { adminCreateCourseValidator } from '../../validators/adminCreateCourseValidator.js';
const router = express.Router();

router.post('/create-course', getUploader('memory').single('thumbnail'), addCourseController);
router.post(
  '/add-module-to-course/:courseId',
  getUploader('disk').single('asset'),
  adminAuthMiddlware,
  addModuleController
);


router.post('/change-course-visibility/:courseId', adminAuthMiddlware, changeCourseVisibility);

router.get('/get-course/:courseId', adminAuthMiddlware, getOneCourseController);

router.delete('/delete-course/:courseId', adminAuthMiddlware, deleteCourseController);

router.delete('/delete-module/:moduleId', adminAuthMiddlware, deleteModuleController);

router.patch('/edit-course/:courseId', adminAuthMiddlware, editCourseController);
export default router;
