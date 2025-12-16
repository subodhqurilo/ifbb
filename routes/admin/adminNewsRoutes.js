import express from "express";
import adminAuthMiddleware from "../../middleware/adminAuthMiddleware.js";

import createNewsController from "../../controllers/admin/news/createNewsController.js";
import updateNewsController from "../../controllers/admin/news/updateNewsController.js";
import deleteNewsController from "../../controllers/admin/news/deleteNewsController.js";

const router = express.Router();

router.post("/news", adminAuthMiddleware, createNewsController);
router.put("/news/:id", adminAuthMiddleware, updateNewsController);
router.delete("/news/:id", adminAuthMiddleware, deleteNewsController);

export default router;
