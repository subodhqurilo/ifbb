import fs from "fs";
import Course from "../../../models/courseModel.js";
import cloudinary from "../../../utils/cloudinaryConfig.js";

export const addModuleController = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, type } = req.body;
  const file = req.file;

  console.log("\n======== MULTER DEBUG ========");
  console.log("REQ.FILE =>", file);
  console.log("PATH =>", file?.path);
  console.log("EXISTS =>", fs.existsSync(file?.path || ""));
  console.log("======== END DEBUG ========\n");

  if (!file || !title || !description || !type) {
    return res.status(400).json({ message: "All module fields and file are required" });
  }

  if (!["video", "pdf"].includes(type)) {
    return res.status(400).json({ message: "Invalid module type" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found" });

    let uploadResult;
    try {
      uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "module_data",
        resource_type: type === "video" ? "video" : "raw",

        // 🚀 BIG FIX: Enable chunk upload for large files
        chunk_size: 6 * 1024 * 1024,  // 6MB chunks

        timeout: 180000,
        use_filename: true,
        unique_filename: false,
      });

      console.log("CLOUDINARY RESPONSE =>", uploadResult);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return res.status(500).json({
        message: "Cloudinary upload failed",
        error: err?.message || err,
      });
    }

    // Delete temp file AFTER upload is complete
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    if (!uploadResult?.secure_url) {
      return res.status(500).json({ message: "Upload failed: no URL returned" });
    }

    const newModule = {
      title,
      description,
      type,
      assetLink: uploadResult.secure_url,
    };

    course.modules.push(newModule);
    await course.save();

    return res.status(201).json({
      message: "Module added successfully",
      module: newModule,
    });

  } catch (error) {
    console.error("Add module error:", error);
    return res.status(500).json({ message: "Internal error", error });
  }
};
