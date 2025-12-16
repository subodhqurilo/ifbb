import News from "../../models/newsModel.js";

const getNewsController = async (req, res) => {
  try {
    const news = await News.find({ published: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error("Get news error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};

export default getNewsController;
