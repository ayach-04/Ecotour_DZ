const HomeContent = require("../models/HomeContent");
const homeContentData = require("../seed/homeContentData");

async function getHomeContent(req, res) {
  try {
    let content = await HomeContent.findOne({ slug: "home" }).lean();
    if (!content) {
      // Auto-seed if missing to avoid 404s in dev/preview
      await HomeContent.deleteMany({ slug: "home" });
      const created = await HomeContent.create(homeContentData);
      content = created.toObject();
    }
    return res.json(content);
  } catch (error) {
    console.error("Error fetching home content:", error);
    return res.status(500).json({ message: "Failed to fetch home content" });
  }
}

module.exports = { getHomeContent };
