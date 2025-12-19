import express from "express";
import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";
import { getUploader } from "../../utils/multer.js";

import uploadGalleryController from "../../controllers/admin/gallery/uploadGalleryController.js";
import deleteGalleryController from "../../controllers/admin/gallery/deleteGalleryController.js";

const router = express.Router();

// Upload gallery image
router.post(
  "/gallery",
  adminAuthMiddleware,
  getUploader("disk").single("image"),
  uploadGalleryController
);

// Delete gallery image
router.delete(
  "/gallery/:id",
  adminAuthMiddleware,
  deleteGalleryController
);

export default router;
