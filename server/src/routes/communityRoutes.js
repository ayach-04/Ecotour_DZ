const express = require("express");
const {
  getCommunityPosts,
  createCommunityPost,
  toggleCommunityAppreciation,
  addCommunityComment,
  toggleCommunityCommentAppreciation,
  addCommunityCommentReply,
  getCommunityPostImage,
} = require("../controllers/communityController");

const router = express.Router();

router.get("/posts", getCommunityPosts);
router.post("/posts", createCommunityPost);
router.post("/posts/:postId/appreciations", toggleCommunityAppreciation);
router.post("/posts/:postId/comments", addCommunityComment);
router.post(
  "/posts/:postId/comments/:commentId/appreciations",
  toggleCommunityCommentAppreciation
);
router.post("/posts/:postId/comments/:commentId/replies", addCommunityCommentReply);
router.get("/posts/:postId/images/:index", getCommunityPostImage);

module.exports = router;
