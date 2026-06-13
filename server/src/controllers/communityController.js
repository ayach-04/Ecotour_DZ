const CommunityPost = require("../models/CommunityPost");
const communityPostsData = require("../seed/communityPostsData");
const { sendEmail } = require("../utils/email");
const { isValidEmail, isValidName } = require("../utils/validation");

const typeMap = {
  reflection: "experience",
  observation: "environmental",
  question: "seasonal",
  tip: "responsible",
};
const allowedTypes = ["experience", "environmental", "seasonal", "responsible"];
const normalizeType = (value) => typeMap[value] ?? value;
const IMAGE_CACHE_SECONDS = 60 * 60 * 24;
const COMMUNITY_LINK = (() => {
  const base = String(process.env.APP_BASE_URL || "").trim();
  if (!base) return "";
  const trimmed = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmed}/community`;
})();

const normalizeImage = (input) => {
  if (!input) return null;
  if (typeof input === "string") {
    const src = input.trim();
    return src ? { src } : null;
  }

  if (typeof input === "object") {
    const src = typeof input.src === "string" ? input.src.trim() : "";
    if (!src) return null;
    const alt = typeof input.alt === "string" ? input.alt.trim() : "";
    const title = typeof input.title === "string" ? input.title.trim() : "";
    return {
      src,
      ...(alt ? { alt } : {}),
      ...(title ? { title } : {}),
    };
  }

  return null;
};

const buildImageSummary = (postId, index, image) => {
  if (!postId) return null;
  const alt = typeof image?.alt === "string" ? image.alt.trim() : "";
  const title = typeof image?.title === "string" ? image.title.trim() : "";

  return {
    src: `/api/community/posts/${postId}/images/${index}`,
    ...(alt ? { alt } : {}),
    ...(title ? { title } : {}),
  };
};

const serializePost = (post) => {
  const postId = String(post._id ?? post.id ?? "");
  const imagesArray = Array.isArray(post.images) ? post.images : [];
  const images = imagesArray
    .map((image, index) => buildImageSummary(postId, index, image))
    .filter((image) => Boolean(image));
  const comments = Array.isArray(post.comments) ? post.comments : [];
  const appreciations = Array.isArray(post.appreciations) ? post.appreciations : [];

  let primaryImage = images[0] ?? null;
  if (!primaryImage && post.image) {
    primaryImage = buildImageSummary(postId, 0, post.image);
    if (primaryImage) {
      images.push(primaryImage);
    }
  }

  const normalizedType = normalizeType(post.type);

  return {
    ...post,
    type: normalizedType,
    image: primaryImage,
    images,
    comments,
    appreciations,
  };
};

async function ensureSeeded() {
  const count = await CommunityPost.countDocuments();
  if (count === 0) {
    await CommunityPost.insertMany(communityPostsData);
  }
}

async function getCommunityPosts(_req, res) {
  try {
    await ensureSeeded();
    const posts = await CommunityPost.find()
      .sort({ timestamp: -1, createdAt: -1 })
      .select("-images.src -image.src")
      .lean();
    return res.json(posts.map((post) => serializePost(post)));
  } catch (error) {
    console.error("Error fetching community posts:", error);
    return res.status(500).json({ message: "Failed to fetch community posts" });
  }
}

async function createCommunityPost(req, res) {
  try {
    const { type, username, email, ecosystem, season, content, image, images } = req.body || {};
    const normalizedType = normalizeType(type);

    if (!normalizedType || !allowedTypes.includes(normalizedType)) {
      return res.status(400).json({ message: "Invalid contribution type" });
    }

    if (!username || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!isValidName(username)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (email && (typeof email !== "string" || !isValidEmail(email))) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const cleanedEcosystem = typeof ecosystem === "string" ? ecosystem.trim() : "";
    const cleanedSeason = typeof season === "string" ? season.trim() : "";
    const rawImages = Array.isArray(images) ? images : image ? [image] : [];
    const cleanedImages = rawImages
      .map((item) => normalizeImage(item))
      .filter((item) => Boolean(item));
    const primaryImage = cleanedImages[0];
    const payload = {
      type: normalizedType,
      username,
      email,
      ecosystem: cleanedEcosystem,
      season: cleanedSeason,
      content,
      images: cleanedImages,
      appreciations: [],
      comments: [],
      timestamp: new Date(),
    };

    if (primaryImage) {
      payload.image = primaryImage;
    } else {
      payload.image = null;
    }

    const post = await CommunityPost.create(payload);

    return res.status(201).json(serializePost(post.toObject()));
  } catch (error) {
    console.error("Error creating community post:", error);
    return res.status(500).json({ message: "Failed to create community post" });
  }
}

async function toggleCommunityAppreciation(req, res) {
  try {
    const { postId } = req.params;
    const { name, email } = req.body || {};

    if (!postId) {
      return res.status(400).json({ message: "Post id is required" });
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const trimmedName = name.trim();
    const trimmedEmail = typeof email === "string" ? email.trim() : "";

    if (!isValidName(trimmedName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const post = await CommunityPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!Array.isArray(post.appreciations)) {
      post.appreciations = [];
    }

    const existingIndex = post.appreciations.findIndex((entry) => {
      const entryName = typeof entry?.name === "string" ? entry.name.trim() : "";
      return entryName.toLowerCase() === trimmedName.toLowerCase();
    });

    if (existingIndex >= 0) {
      post.appreciations.splice(existingIndex, 1);
    } else {
      post.appreciations.push({
        name: trimmedName,
        ...(trimmedEmail ? { email: trimmedEmail } : {}),
        createdAt: new Date(),
      });
    }

    post.markModified("appreciations");
    await post.save();

    return res.json(serializePost(post.toObject()));
  } catch (error) {
    console.error("Error toggling appreciation:", error);
    return res.status(500).json({ message: "Failed to update appreciation" });
  }
}

async function addCommunityComment(req, res) {
  try {
    const { postId } = req.params;
    const { text, name, email } = req.body || {};

    if (!postId) {
      return res.status(400).json({ message: "Post id is required" });
    }

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedText = text.trim();

    if (!isValidName(trimmedName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const comment = {
      text: trimmedText,
      publisher: { name: trimmedName, email: trimmedEmail },
      appreciations: [],
      replies: [],
      createdAt: new Date(),
    };

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push(comment);
    await post.save();

    const postEmail = typeof post.email === "string" ? post.email.trim() : "";
    if (postEmail && postEmail.toLowerCase() !== trimmedEmail.toLowerCase()) {
      const emailBody = [
        `Hi ${post.username || "there"},`,
        "",
        `${trimmedName} left a new comment on your community post:`,
        `"${trimmedText}"`,
        "",
        "Visit the community page to respond.",
        COMMUNITY_LINK ? `Community: ${COMMUNITY_LINK}` : "",
      ].join("\n");

      sendEmail({
        to: postEmail,
        subject: "New comment on your community post",
        text: emailBody,
      }).catch((error) => {
        console.error("Comment notification email failed:", error);
      });
    }

    return res.json(serializePost(post.toObject()));
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Failed to add comment" });
  }
}

async function toggleCommunityCommentAppreciation(req, res) {
  try {
    const { postId, commentId } = req.params;
    const { name, email } = req.body || {};

    if (!postId || !commentId) {
      return res.status(400).json({ message: "Post id and comment id are required" });
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const trimmedName = name.trim();
    const trimmedEmail = typeof email === "string" ? email.trim() : "";

    if (!isValidName(trimmedName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!Array.isArray(comment.appreciations)) {
      comment.appreciations = [];
    }

    const existingIndex = comment.appreciations.findIndex((entry) => {
      const entryName = typeof entry?.name === "string" ? entry.name.trim() : "";
      return entryName.toLowerCase() === trimmedName.toLowerCase();
    });

    if (existingIndex >= 0) {
      comment.appreciations.splice(existingIndex, 1);
    } else {
      comment.appreciations.push({
        name: trimmedName,
        ...(trimmedEmail ? { email: trimmedEmail } : {}),
        createdAt: new Date(),
      });
    }

    post.markModified("comments");
    await post.save();

    return res.json(serializePost(post.toObject()));
  } catch (error) {
    console.error("Error toggling comment appreciation:", error);
    return res.status(500).json({ message: "Failed to update comment appreciation" });
  }
}

async function addCommunityCommentReply(req, res) {
  try {
    const { postId, commentId } = req.params;
    const { text, name, email } = req.body || {};

    if (!postId || !commentId) {
      return res.status(400).json({ message: "Post id and comment id are required" });
    }

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ message: "Reply text is required" });
    }

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedText = text.trim();

    if (!isValidName(trimmedName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies = comment.replies || [];
    comment.replies.push({
      text: trimmedText,
      publisher: { name: trimmedName, email: trimmedEmail },
      createdAt: new Date(),
    });
    post.markModified("comments");
    await post.save();

    const commentEmail =
      typeof comment.publisher?.email === "string" ? comment.publisher.email.trim() : "";
    if (commentEmail && commentEmail.toLowerCase() !== trimmedEmail.toLowerCase()) {
      const emailBody = [
        `Hi ${comment.publisher?.name || "there"},`,
        "",
        `${trimmedName} replied to your comment:`,
        `"${trimmedText}"`,
        "",
        "Visit the community page to continue the conversation.",
        COMMUNITY_LINK ? `Community: ${COMMUNITY_LINK}` : "",
      ].join("\n");

      sendEmail({
        to: commentEmail,
        subject: "New reply to your comment",
        text: emailBody,
      }).catch((error) => {
        console.error("Reply notification email failed:", error);
      });
    }

    return res.json(serializePost(post.toObject()));
  } catch (error) {
    console.error("Error adding reply:", error);
    return res.status(500).json({ message: "Failed to add reply" });
  }
}

async function getCommunityPostImage(req, res) {
  try {
    const { postId, index } = req.params;
    const imageIndex = Number.parseInt(index, 10);

    if (!postId || Number.isNaN(imageIndex) || imageIndex < 0) {
      return res.status(400).json({ message: "Invalid image request" });
    }

    const post = await CommunityPost.findById(postId)
      .select({ images: { $slice: [imageIndex, 1] }, image: 1 })
      .lean();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let imageEntry = null;
    if (Array.isArray(post.images) && post.images.length > 0) {
      imageEntry = post.images[0];
    } else if (imageIndex === 0 && post.image) {
      imageEntry = post.image;
    }

    const src =
      typeof imageEntry === "string" ? imageEntry : imageEntry?.src;

    if (!src || typeof src !== "string") {
      return res.status(404).json({ message: "Image not found" });
    }

    if (src.startsWith("data:")) {
      const match = /^data:([^;]+);base64,(.+)$/.exec(src);
      if (!match) {
        return res.status(400).json({ message: "Invalid image data" });
      }
      const mimeType = match[1];
      const buffer = Buffer.from(match[2], "base64");
      res.set("Content-Type", mimeType);
      res.set("Cache-Control", `public, max-age=${IMAGE_CACHE_SECONDS}`);
      return res.send(buffer);
    }

    if (src.startsWith("http://") || src.startsWith("https://")) {
      return res.redirect(src);
    }

    return res.status(400).json({ message: "Unsupported image source" });
  } catch (error) {
    console.error("Error serving community image:", error);
    return res.status(500).json({ message: "Failed to load image" });
  }
}

module.exports = {
  getCommunityPosts,
  createCommunityPost,
  toggleCommunityAppreciation,
  addCommunityComment,
  toggleCommunityCommentAppreciation,
  addCommunityCommentReply,
  getCommunityPostImage,
};
