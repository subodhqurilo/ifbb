import News from "../../../models/newsModel.js";

const createNewsController = async (req, res) => {
  try {
    const { title, description, imageUrl, published } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const news = await News.create({
      title,
      description,
      imageUrl,
      published,
    });

    return res.status(201).json({
      message: "News created successfully",
      news,
    });
  } catch (error) {
    console.error("Create news error:", error);
    return res.status(500).json({ message: "Failed to create news" });
  }
};

export default createNewsController;
