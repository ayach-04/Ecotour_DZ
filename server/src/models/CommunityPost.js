const mongoose = require("mongoose");

const contributionTypes = ["experience", "environmental", "seasonal", "responsible"];

const CommunityPostSchema = new mongoose.Schema(
  {
    type: { type: String, enum: contributionTypes, required: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    ecosystem: { type: String, trim: true },
    season: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    image: {
      src: { type: String, trim: true },
      alt: { type: String, trim: true },
      title: { type: String, trim: true },
    },
    images: {
      type: [
        {
          src: { type: String, trim: true },
          alt: { type: String, trim: true },
          title: { type: String, trim: true },
        },
      ],
      default: [],
    },
    appreciations: {
      type: [
        {
          name: { type: String, trim: true },
          email: { type: String, trim: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          text: { type: String, required: true, trim: true },
          publisher: {
            name: { type: String, trim: true },
            email: { type: String, trim: true },
          },
          appreciations: {
            type: [
              {
                name: { type: String, trim: true },
                email: { type: String, trim: true },
                createdAt: { type: Date, default: Date.now },
              },
            ],
            default: [],
          },
          replies: {
            type: [
              {
                text: { type: String, required: true, trim: true },
                publisher: {
                  name: { type: String, trim: true },
                  email: { type: String, trim: true },
                },
                createdAt: { type: Date, default: Date.now },
              },
            ],
            default: [],
          },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunityPost", CommunityPostSchema);
