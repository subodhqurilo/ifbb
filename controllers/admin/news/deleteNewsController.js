import News from "../../../models/newsModel.js";

const deleteNewsController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.status(200).json({
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete news error:", error);
    return res.status(500).json({ message: "Failed to delete news" });
  }
};

export default deleteNewsController;
