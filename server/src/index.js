const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const homeRoutes = require("./routes/homeRoutes");
const communityRoutes = require("./routes/communityRoutes");
const contactRoutes = require("./routes/contactRoutes");
const CommunityPost = require("./models/CommunityPost");
const communityPostsData = require("./seed/communityPostsData");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", homeRoutes);
app.use("/api/community", communityRoutes);
app.use("/api", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const seedCommunityPostsIfEmpty = async () => {
  const count = await CommunityPost.countDocuments();
  if (count === 0) {
    await CommunityPost.insertMany(communityPostsData);
    console.log("Community posts seeded");
  }
};

connectDB().then(async () => {
  await seedCommunityPostsIfEmpty();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
