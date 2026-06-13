const dotenv = require("dotenv");
const connectDB = require("../config/db");
const HomeContent = require("../models/HomeContent");
const homeContentData = require("./homeContentData");

dotenv.config();

async function seed() {
  try {
    await connectDB();
    await HomeContent.deleteMany({ slug: "home" });
    await HomeContent.create(homeContentData);
    console.log("Home content seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding home content:", error);
    process.exit(1);
  }
}

seed();
