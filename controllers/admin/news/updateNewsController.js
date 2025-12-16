import News from "../../../models/newsModel.js";

const updateNewsController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.status(200).json({
      message: "News updated successfully",
      news: updatedNews,
    });
  } catch (error) {
    console.error("Update news error:", error);
    return res.status(500).json({ message: "Failed to update news" });
  }
};

export default updateNewsController;
