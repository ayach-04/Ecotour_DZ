const dotenv = require("dotenv");
const connectDB = require("../config/db");
const CommunityPost = require("../models/CommunityPost");
const communityPostsData = require("./communityPostsData");

dotenv.config();

async function seed() {
  try {
    await connectDB();
    await CommunityPost.deleteMany({});
    await CommunityPost.insertMany(communityPostsData);
    console.log("Community posts seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding community posts:", error);
    process.exit(1);
  }
}

seed();
