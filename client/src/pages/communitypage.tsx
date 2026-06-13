import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Leaf,
  Eye,
  HelpCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { RichTextEditor } from "@/components/RichTextEditor";

type ContributionType = "experience" | "environmental" | "seasonal" | "responsible";
type PostImage = { src: string; alt?: string; title?: string };
type Appreciation = { name: string; email?: string; createdAt?: string };
type CommentReply = {
  _id?: string;
  text: string;
  publisher: { name: string; email: string };
  createdAt?: string;
};
type Comment = {
  _id?: string;
  text: string;
  publisher: { name: string; email: string };
  appreciations?: Appreciation[];
  replies?: CommentReply[];
  createdAt?: string;
};

interface Post {
  id: string;
  type: ContributionType;
  username: string;
  ecosystem: string;
  season: string;
  content: string;
  images: PostImage[];
  appreciations: Appreciation[];
  comments: Comment[];
  timestamp: string;
}

interface ApiCommunityPost {
  _id?: string;
  id?: string;
  type: ContributionType;
  username: string;
  email?: string;
  ecosystem: string;
  season: string;
  content: string;
  image?: PostImage | string | null;
  images?: Array<PostImage | string>;
  appreciations?: Appreciation[] | number;
  comments?: Comment[] | number;
  timestamp?: string;
}

const contributionTypes = [
  {
    value: "experience" as const,
    icon: Heart,
    label: "Experience",
    description: "Share your personal experience and what you learned from responsible exploration",
  },
  {
    value: "environmental" as const,
    icon: Eye,
    label: "Environmental",
    description: "Document ecological changes, wildlife sightings, or environmental conditions",
  },
  {
    value: "seasonal" as const,
    icon: HelpCircle,
    label: "Seasonal",
    description: "Ask for advice about seasonal visits or ecosystem-appropriate behavior",
  },
  {
    value: "responsible" as const,
    icon: Lightbulb,
    label: "Responsible",
    description: "Share practical advice for low-impact, sustainable exploration",
  },
];

const ecosystems = ["Forests & Mountains", "Desert & Oases", "Wetlands", "Coastal Areas"];
const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const USER_COOKIE_NAME = "ecotour_user";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isValidName = (value: string) =>
  /^[\p{L}]+(?:\s+[\p{L}]+)*$/u.test(value.trim());
const sanitizeNameInput = (value: string) =>
  value.replace(/[^\p{L}\s]/gu, "").replace(/\s{2,}/g, " ");

const readUserCookie = (): { name: string; email?: string } | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${USER_COOKIE_NAME}=`));
  if (!match) return null;
  try {
    const value = decodeURIComponent(match.split("=")[1]);
    const parsed = JSON.parse(value);
    if (!parsed?.name) return null;
    return {
      name: String(parsed.name),
      ...(parsed.email ? { email: String(parsed.email) } : {}),
    };
  } catch {
    return null;
  }
};

const writeUserCookie = (identity: { name: string; email?: string }) => {
  const payload = {
    name: identity.name,
    ...(identity.email ? { email: identity.email } : {}),
  };
  const value = encodeURIComponent(JSON.stringify(payload));
  document.cookie = `${USER_COOKIE_NAME}=${value}; max-age=31536000; path=/; samesite=lax`;
};

const resolveApiBase = () => {
  const fallbackBase =
    API_BASE_URL ||
    (window.location.origin.includes("localhost:")
      ? "http://localhost:5000"
      : window.location.origin);
  return fallbackBase.endsWith("/") ? fallbackBase.slice(0, -1) : fallbackBase;
};

const normalizeImageSrc = (value: string) => {
  const src = value.trim();
  if (!src) return "";
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  if (src.startsWith("/")) {
    return `${resolveApiBase()}${src}`;
  }
  return src;
};

const normalizePostImage = (input: PostImage | string | null | undefined): PostImage | null => {
  if (!input) return null;
  if (typeof input === "string") {
    const src = normalizeImageSrc(input);
    return src ? { src } : null;
  }

  if (typeof input === "object") {
    const src = typeof input.src === "string" ? normalizeImageSrc(input.src) : "";
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

const normalizePost = (post: ApiCommunityPost): Post => {
  const rawImages = Array.isArray(post.images)
    ? post.images
    : post.image
    ? [post.image]
    : [];
  const images = rawImages
    .map((img) => normalizePostImage(img))
    .filter((img): img is PostImage => Boolean(img));
  const appreciations = Array.isArray(post.appreciations) ? post.appreciations : [];
  const comments = Array.isArray(post.comments) ? post.comments : [];

  return {
    id: String(post.id ?? post._id ?? Date.now()),
    type: post.type,
    username: post.username,
    ecosystem: post.ecosystem,
    season: post.season,
    content: post.content,
    images,
    appreciations,
    comments,
    timestamp: String(post.timestamp ?? new Date().toISOString()),
  };
};

export function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postImageIndex, setPostImageIndex] = useState<Record<string, number>>({});
  const [commentOpen, setCommentOpen] = useState<Record<string, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [commentError, setCommentError] = useState<Record<string, string>>({});
  const [commentSubmitting, setCommentSubmitting] = useState<Record<string, boolean>>({});
  const [commentAppreciateOpen, setCommentAppreciateOpen] = useState<Record<string, boolean>>({});
  const [commentAppreciateDrafts, setCommentAppreciateDrafts] = useState<Record<string, string>>({});
  const [commentAppreciateSubmitting, setCommentAppreciateSubmitting] = useState<Record<string, boolean>>({});
  const [commentAppreciateError, setCommentAppreciateError] = useState<Record<string, string>>({});
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [replyError, setReplyError] = useState<Record<string, string>>({});
  const [replySubmitting, setReplySubmitting] = useState<Record<string, boolean>>({});
  const [appreciateOpen, setAppreciateOpen] = useState<Record<string, boolean>>({});
  const [appreciateDrafts, setAppreciateDrafts] = useState<Record<string, string>>({});
  const [appreciateSubmitting, setAppreciateSubmitting] = useState<Record<string, boolean>>({});
  const [appreciateError, setAppreciateError] = useState<Record<string, string>>({});
  const [showCreateView, setShowCreateView] = useState(false);
  const [userIdentity, setUserIdentity] = useState<{ name: string; email?: string } | null>(null);
  const [identityForm, setIdentityForm] = useState({ name: "", email: "" });
  const [identityEmailTouched, setIdentityEmailTouched] = useState(false);
  const [filterType, setFilterType] = useState<ContributionType | "all">("all");
  const [newPost, setNewPost] = useState({
    type: "experience" as ContributionType,
    ecosystem: "",
    season: "",
    content: "",
    images: [] as PostImage[],
  });

  // Load user identity from cookies
  useEffect(() => {
    const stored = readUserCookie();
    if (stored) {
      setUserIdentity(stored);
      setIdentityForm({ name: stored.name, email: stored.email ?? "" });
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsError(null);
        setPostsLoading(true);
        const base = resolveApiBase();
        const response = await fetch(`${base}/api/community/posts`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error(
            "API_BASE_URL is not pointing to the backend or proxy. Expected JSON response."
          );
        }

        const data = (await response.json()) as ApiCommunityPost[];
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response from community posts API.");
        }

        setPosts(data.map(normalizePost));
      } catch (error) {
        setPostsError(error instanceof Error ? error.message : "Failed to load community posts");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleIdentityChange = (field: "name" | "email", value: string) => {
    const nextValue = field === "name" ? sanitizeNameInput(value) : value;
    setIdentityForm((prev) => ({ ...prev, [field]: nextValue }));
    if (userIdentity) {
      setUserIdentity(null);
    }
  };
  const handleIdentityEmailBlur = () => setIdentityEmailTouched(true);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    try {
      setSubmitError(null);
      const uploads = await Promise.all(
        files.map(
          (file) =>
            new Promise<PostImage>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  src: String(reader.result),
                  alt: "Uploaded image",
                  title: file.name || "Uploaded image",
                });
              reader.onerror = () => reject(new Error("Failed to read image"));
              reader.readAsDataURL(file);
            })
        )
      );
      setNewPost((prev) => ({ ...prev, images: [...prev.images, ...uploads] }));
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to add images.");
    } finally {
      event.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewPost((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const handleImageStep = (postId: string, delta: number, count: number) => {
    if (count <= 1) return;
    setPostImageIndex((prev) => {
      const current = prev[postId] ?? 0;
      const next = (current + delta + count) % count;
      return { ...prev, [postId]: next };
    });
  };

  const submitAppreciation = async (postId: string, name: string) => {
    const finalName = name.trim();
    if (!finalName) return;

    if (!isValidName(finalName)) {
      setAppreciateError((prev) => ({
        ...prev,
        [postId]: "Name should contain letters only.",
      }));
      return;
    }

    setAppreciateSubmitting((prev) => ({ ...prev, [postId]: true }));
    setAppreciateError((prev) => ({ ...prev, [postId]: "" }));

    try {
      const base = resolveApiBase();
      const response = await fetch(`${base}/api/community/posts/${postId}/appreciations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: finalName }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      const updated = (await response.json()) as ApiCommunityPost;
      setPosts((current) =>
        current.map((post) => (post.id === postId ? normalizePost(updated) : post))
      );
      const nextIdentity = {
        name: finalName,
        email: userIdentity?.email || identityForm.email || undefined,
      };
      setUserIdentity(nextIdentity);
      setIdentityForm((prev) => ({
        name: finalName,
        email: prev.email || nextIdentity.email || "",
      }));
      writeUserCookie(nextIdentity);
      setAppreciateOpen((prev) => ({ ...prev, [postId]: false }));
      setAppreciateDrafts((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      setAppreciateError((prev) => ({
        ...prev,
        [postId]: error instanceof Error ? error.message : "Failed to update appreciation.",
      }));
    } finally {
      setAppreciateSubmitting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleToggleAppreciation = (postId: string) => {
    const storedName = (
      userIdentity?.name ??
      identityForm.name ??
      ""
    ).trim();
    if (!storedName) {
      setAppreciateOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
      setAppreciateError((prev) => ({ ...prev, [postId]: "" }));
      return;
    }

    submitAppreciation(postId, storedName);
  };

  const handleAppreciateNameChange = (postId: string, value: string) => {
    const nextValue = sanitizeNameInput(value);
    setAppreciateDrafts((prev) => ({ ...prev, [postId]: nextValue }));
    setAppreciateError((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleSubmitAppreciation = (postId: string) => {
    const name = (appreciateDrafts[postId] ?? "").trim();
    if (!name) {
      setAppreciateError((prev) => ({
        ...prev,
        [postId]: "Please add your name to appreciate this post.",
      }));
      return;
    }

    submitAppreciation(postId, name);
  };

  const toggleComments = (postId: string) => {
    setCommentOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
    setCommentError((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentDrafts((prev) => ({ ...prev, [postId]: value }));
  };

  const buildReplyKey = (postId: string, commentId: string) => `${postId}:${commentId}`;
  const buildCommentKey = (postId: string, commentId: string) => `${postId}:${commentId}`;

  const toggleReply = (postId: string, commentId: string) => {
    if (!commentId) return;
    const key = buildReplyKey(postId, commentId);
    setReplyOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    setReplyError((prev) => ({ ...prev, [key]: "" }));
  };

  const handleReplyChange = (key: string, value: string) => {
    setReplyDrafts((prev) => ({ ...prev, [key]: value }));
  };

  const submitCommentAppreciation = async (postId: string, commentId: string, name: string) => {
    const finalName = name.trim();
    if (!finalName) return;

    if (!isValidName(finalName)) {
      const key = buildCommentKey(postId, commentId);
      setCommentAppreciateError((prev) => ({
        ...prev,
        [key]: "Name should contain letters only.",
      }));
      return;
    }

    const key = buildCommentKey(postId, commentId);
    setCommentAppreciateSubmitting((prev) => ({ ...prev, [key]: true }));
    setCommentAppreciateError((prev) => ({ ...prev, [key]: "" }));

    try {
      const base = resolveApiBase();
      const response = await fetch(
        `${base}/api/community/posts/${postId}/comments/${commentId}/appreciations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: finalName }),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      const updated = (await response.json()) as ApiCommunityPost;
      setPosts((current) =>
        current.map((post) => (post.id === postId ? normalizePost(updated) : post))
      );
      const nextIdentity = {
        name: finalName,
        email: userIdentity?.email || identityForm.email || undefined,
      };
      setUserIdentity(nextIdentity);
      setIdentityForm((prev) => ({
        name: finalName,
        email: prev.email || nextIdentity.email || "",
      }));
      writeUserCookie(nextIdentity);
      setCommentAppreciateOpen((prev) => ({ ...prev, [key]: false }));
      setCommentAppreciateDrafts((prev) => ({ ...prev, [key]: "" }));
    } catch (error) {
      setCommentAppreciateError((prev) => ({
        ...prev,
        [key]: error instanceof Error ? error.message : "Failed to update appreciation.",
      }));
    } finally {
      setCommentAppreciateSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleToggleCommentAppreciation = (postId: string, commentId: string) => {
    if (!commentId) return;
    const key = buildCommentKey(postId, commentId);
    const storedName = (userIdentity?.name ?? identityForm.name ?? "").trim();
    if (!storedName) {
      setCommentAppreciateOpen((prev) => ({ ...prev, [key]: !prev[key] }));
      setCommentAppreciateError((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    submitCommentAppreciation(postId, commentId, storedName);
  };

  const handleCommentAppreciateNameChange = (key: string, value: string) => {
    const nextValue = sanitizeNameInput(value);
    setCommentAppreciateDrafts((prev) => ({ ...prev, [key]: nextValue }));
    setCommentAppreciateError((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmitCommentAppreciation = (postId: string, commentId: string) => {
    const key = buildCommentKey(postId, commentId);
    const name = (commentAppreciateDrafts[key] ?? "").trim();
    if (!name) {
      setCommentAppreciateError((prev) => ({
        ...prev,
        [key]: "Please add your name to appreciate this comment.",
      }));
      return;
    }

    submitCommentAppreciation(postId, commentId, name);
  };

  const handleSubmitComment = async (postId: string) => {
    const text = (commentDrafts[postId] ?? "").trim();
    const name = (userIdentity?.name ?? identityForm.name).trim();
    const email = ((userIdentity?.email ?? "").trim() || identityForm.email.trim());

    if (!name) {
      setCommentError((prev) => ({
        ...prev,
        [postId]: "Please add your name to comment.",
      }));
      return;
    }

    if (!isValidName(name)) {
      setCommentError((prev) => ({
        ...prev,
        [postId]: "Name should contain letters only.",
      }));
      return;
    }

    if (!email) {
      setCommentError((prev) => ({
        ...prev,
        [postId]: "Please add your email to comment.",
      }));
      return;
    }

    if (!isValidEmail(email)) {
      setCommentError((prev) => ({
        ...prev,
        [postId]: "Please enter a valid email address.",
      }));
      return;
    }

    if (!text) {
      setCommentError((prev) => ({
        ...prev,
        [postId]: "Write a comment before posting.",
      }));
      return;
    }

    setCommentSubmitting((prev) => ({ ...prev, [postId]: true }));
    setCommentError((prev) => ({ ...prev, [postId]: "" }));

    try {
      const base = resolveApiBase();
      const response = await fetch(`${base}/api/community/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, name, email }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      const updated = (await response.json()) as ApiCommunityPost;
      const normalized = normalizePost(updated);
      const optimisticComment: Comment = {
        text,
        publisher: { name, email },
        replies: [],
        appreciations: [],
        createdAt: new Date().toISOString(),
      };
      setPosts((current) =>
        current.map((post) => {
          if (post.id !== postId) return post;
          if (normalized.comments.length <= post.comments.length) {
            return { ...normalized, comments: [...post.comments, optimisticComment] };
          }
          return normalized;
        })
      );
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
      setCommentOpen((prev) => ({ ...prev, [postId]: true }));
      const identity = { name, email };
      setUserIdentity(identity);
      setIdentityForm(identity);
      writeUserCookie(identity);
    } catch (error) {
      setCommentError((prev) => ({
        ...prev,
        [postId]: error instanceof Error ? error.message : "Failed to add comment.",
      }));
    } finally {
      setCommentSubmitting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleSubmitReply = async (postId: string, commentId: string) => {
    if (!commentId) return;
    const key = buildReplyKey(postId, commentId);
    const text = (replyDrafts[key] ?? "").trim();
    const name = (userIdentity?.name ?? identityForm.name).trim();
    const email = ((userIdentity?.email ?? "").trim() || identityForm.email.trim());

    if (!name) {
      setReplyError((prev) => ({
        ...prev,
        [key]: "Please add your name to reply.",
      }));
      return;
    }

    if (!isValidName(name)) {
      setReplyError((prev) => ({
        ...prev,
        [key]: "Name should contain letters only.",
      }));
      return;
    }

    if (!email) {
      setReplyError((prev) => ({
        ...prev,
        [key]: "Please add your email to reply.",
      }));
      return;
    }

    if (!isValidEmail(email)) {
      setReplyError((prev) => ({
        ...prev,
        [key]: "Please enter a valid email address.",
      }));
      return;
    }

    if (!text) {
      setReplyError((prev) => ({
        ...prev,
        [key]: "Write a reply before posting.",
      }));
      return;
    }

    setReplySubmitting((prev) => ({ ...prev, [key]: true }));
    setReplyError((prev) => ({ ...prev, [key]: "" }));

    try {
      const base = resolveApiBase();
      const response = await fetch(
        `${base}/api/community/posts/${postId}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, name, email }),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      const updated = (await response.json()) as ApiCommunityPost;
      setPosts((current) =>
        current.map((post) => (post.id === postId ? normalizePost(updated) : post))
      );
      setReplyDrafts((prev) => ({ ...prev, [key]: "" }));
      setReplyOpen((prev) => ({ ...prev, [key]: false }));
      const identity = { name, email };
      setUserIdentity(identity);
      setIdentityForm(identity);
      writeUserCookie(identity);
    } catch (error) {
      setReplyError((prev) => ({
        ...prev,
        [key]: error instanceof Error ? error.message : "Failed to add reply.",
      }));
    } finally {
      setReplySubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleConfirmIdentity = () => {
    const name = identityForm.name.trim();
    const email = identityForm.email.trim();
    if (!name || !email) return;
    if (!isValidName(name) || !isValidEmail(email)) return;
    setUserIdentity({ name, email });
  };

  const handleSubmitPost = async () => {
    const name = (userIdentity?.name ?? identityForm.name).trim();
    const email = ((userIdentity?.email ?? "").trim() || identityForm.email.trim());
    if (!name || !email || !newPost.content.trim()) {
      return;
    }

    if (!isValidName(name)) {
      setSubmitError("Name should contain letters only.");
      return;
    }

    if (!isValidEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    const identity = { name, email };
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const base = resolveApiBase();
      const payload = {
        type: newPost.type,
        username: identity.name,
        email: identity.email,
        ecosystem: newPost.ecosystem,
        season: newPost.season,
        content: newPost.content,
        image: newPost.images[0],
        images: newPost.images.length ? newPost.images : undefined,
      };

      const response = await fetch(`${base}/api/community/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      if (!contentType.includes("application/json")) {
        throw new Error(
          "API_BASE_URL is not pointing to the backend or proxy. Expected JSON response."
        );
      }

      const created = (await response.json()) as ApiCommunityPost;
      setPosts((current) => [normalizePost(created), ...current]);
      setNewPost({
        type: "experience",
        ecosystem: "",
        season: "",
        content: "",
        images: [],
      });
      setUserIdentity(identity);
      setIdentityForm(identity);
      writeUserCookie(identity);
      setShowCreateView(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to publish post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isIdentityReady = Boolean(
    isValidName(identityForm.name) && isValidEmail(identityForm.email)
  );
  const isPublishDisabled = isSubmitting || !isIdentityReady || !newPost.content.trim();
  const identityEmailInvalid =
    identityEmailTouched && identityForm.email.trim() && !isValidEmail(identityForm.email);
  const filteredPosts = filterType === "all" ? posts : posts.filter((p) => p.type === filterType);

  const getIcon = (type: ContributionType) => {
    const item = contributionTypes.find((t) => t.value === type);
    return item ? item.icon : Heart;
  };

  return (
    <main className="pb-16">
      {showCreateView ? (
        <section className="bg-white pt-12 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between gap-4 mb-6 w-full">
              <div>
                <h1 className="text-4xl sm:text-5xl text-stone-900 font-normal">
                  Create Contribution
                </h1>
                  <p className="text-base text-stone-600 mt-2">
                    Share your experience, environmental notes, seasonal questions, or responsible travel tips.
                  </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateView(false)}
                className="bg-emerald-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 font-medium transition-colors hover:bg-emerald-800 whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Community
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={identityForm.name}
                    onChange={(e) => handleIdentityChange("name", e.target.value)}
                    className="w-full px-4 py-2 border border-emerald-100 rounded-lg bg-zinc-50 text-zinc-900 transition-colors"
                    placeholder="How you want to appear"
                  />
                </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-zinc-700">
                      Email (private)
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={identityForm.email}
                      onChange={(e) => handleIdentityChange("email", e.target.value)}
                      onBlur={handleIdentityEmailBlur}
                      className="w-full px-4 py-2 border border-emerald-100 rounded-lg bg-zinc-50 text-zinc-900 transition-colors"
                      placeholder="For notifications only"
                    />
                    {identityEmailInvalid ? (
                      <p className="mt-1 text-xs text-red-600">
                        Please enter a valid email address.
                      </p>
                    ) : null}
                  </div>
                </div>
              {userIdentity ? (
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <span>
                    Posting as{" "}
                    <span className="text-zinc-900 font-medium">{userIdentity.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setUserIdentity(null)}
                    className="text-emerald-700 hover:text-emerald-600 transition-colors"
                  >
                    Change
                  </button>
                </div>
              ) : null}
              <div>
                <label className="block text-sm font-medium mb-3 text-zinc-700">
                  Contribution Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {contributionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setNewPost({ ...newPost, type: type.value })}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                          newPost.type === type.value
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-emerald-100 bg-white text-zinc-600 hover:border-emerald-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{type.label.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700">
                    Ecosystem
                  </label>
                  <select
                    value={newPost.ecosystem}
                    onChange={(e) => setNewPost({ ...newPost, ecosystem: e.target.value })}
                    className="w-full px-4 py-2 border border-emerald-100 rounded-lg bg-white text-zinc-900 transition-colors"
                  >
                    <option value="">Not specified</option>
                    {ecosystems.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700">Season</label>
                  <select
                    value={newPost.season}
                    onChange={(e) => setNewPost({ ...newPost, season: e.target.value })}
                    className="w-full px-4 py-2 border border-emerald-100 rounded-lg bg-white text-zinc-900 transition-colors"
                  >
                    <option value="">Not specified</option>
                    {seasons.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700">
                  Your Contribution
                </label>
                <RichTextEditor
                  value={newPost.content}
                  onChange={(value) => setNewPost({ ...newPost, content: value })}
                />
              </div>
              <div className="rounded-lg border border-emerald-100 bg-zinc-50 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-sm font-medium text-zinc-700">Photos (optional)</span>
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-600 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Add Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="min-h-[110px] flex flex-wrap gap-3">
                  {newPost.images.length === 0 ? (
                      <div className="flex items-center justify-center w-full min-h-[90px] rounded-lg border border-dashed border-emerald-100 text-xs text-zinc-500">
                        No photos yet. You can publish without photos.
                      </div>
                  ) : (
                    newPost.images.map((image, index) => (
                      <div
                        key={`${image.src}-${index}`}
                        className="relative w-[90px] h-[90px]"
                      >
                        <img
                          src={image.src}
                          alt={image.alt ?? `Upload preview ${index + 1}`}
                          title={image.title}
                          className="w-full h-full object-cover rounded-lg border border-emerald-100"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-stone-200 text-stone-600 shadow-sm hover:bg-stone-50 flex items-center justify-center"
                          aria-label="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="mb-12">
                <button
                  type="button"
                  onClick={handleSubmitPost}
                  disabled={isPublishDisabled}
                  className={`w-full bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium ${
                    isPublishDisabled ? "opacity-50" : "hover:bg-emerald-800"
                  }`}
                >
                  {isSubmitting ? "Publishing..." : "Publish"}
                </button>
                {submitError ? (
                  <p className="mt-3 text-sm text-red-600">{submitError}</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Header */}
          <section className="bg-gradient-to-b from-emerald-50 to-white pt-12 ">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4 text-stone-900 font-normal mt-12">
                  Community
                </h1>
                  <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto mb-8">
                    A shared space for experiences, seasonal questions, and environmental awareness
                  </p>

                {/* Community Principles as Tags */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    Respect nature
                  </span>
                  <span className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    Protect communities
                  </span>
                  <span className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm">
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    Share responsibly
                  </span>
                </div>

                {/* Start Contributing Button */}
                <button
                  type="button"
                  onClick={() => setShowCreateView(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-sm transition-colors inline-flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Start Contributing
                </button>
              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filters Section */}
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateView(true)}
                  className="bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors font-medium inline-flex items-center gap-2 text-base"
                >
                  <Plus className="w-5 h-5" />
                  Share Contribution
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-4 py-2 rounded-full text-sm transition-colors font-medium ${
                      filterType === "all"
                        ? "bg-green-100 text-green-700"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    All
                  </button>
                  {contributionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setFilterType(type.value)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors inline-flex items-center gap-2 font-medium ${
                          filterType === type.value
                            ? "bg-green-100 text-green-700"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{type.label.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Posts Feed */}
              {postsLoading ? (
                <div className="py-12 text-center text-stone-500">Loading posts...</div>
              ) : postsError ? (
                <div className="py-12 text-center text-red-600">{postsError}</div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-12 text-center text-stone-500">
                  No posts yet. Be the first to share.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post, index) => {
                    const Icon = getIcon(post.type);
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white border border-stone-200 rounded-sm p-6 hover:border-green-200 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-green-700" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-stone-900">{post.username}</span>
                              {post.ecosystem && (
                                <>
                                  <span className="text-xs text-stone-400">|</span>
                                  <span className="text-xs text-stone-500">{post.ecosystem}</span>
                                </>
                              )}
                              {post.season && (
                                <>
                                  <span className="text-xs text-stone-400">|</span>
                                  <span className="text-xs text-stone-500">{post.season}</span>
                                </>
                              )}
                            </div>

                            {post.images.length > 0 ? (
                              <div className="mb-4">
                                {(() => {
                                  const currentIndex =
                                    postImageIndex[post.id] ?? 0;
                                  const safeIndex =
                                    currentIndex >= 0 && currentIndex < post.images.length
                                      ? currentIndex
                                      : 0;
                                  const image = post.images[safeIndex];
                                  const hasMultiple = post.images.length > 1;

                                  return (
                                    <div className="relative w-full max-w-[500px] h-[500px] mx-auto">
                                      <img
                                        src={image.src}
                                        alt={image.alt ?? `Post image ${safeIndex + 1}`}
                                        title={image.title}
                                        className="w-full h-full object-cover rounded-xl shadow-md"
                                      />
                                      {hasMultiple ? (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleImageStep(
                                                post.id,
                                                -1,
                                                post.images.length
                                              )
                                            }
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-stone-700 shadow-md hover:bg-white flex items-center justify-center"
                                            aria-label="Previous photo"
                                          >
                                            <ChevronLeft className="w-4 h-4" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleImageStep(
                                                post.id,
                                                1,
                                                post.images.length
                                              )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-stone-700 shadow-md hover:bg-white flex items-center justify-center"
                                            aria-label="Next photo"
                                          >
                                            <ChevronRight className="w-4 h-4" />
                                          </button>
                                        </>
                                      ) : null}
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : null}

                            <div
                              className="text-stone-700 leading-relaxed mb-4 prose prose-sm max-w-none
                                [&_img]:w-full
                                [&_img]:max-w-[500px]
                                [&_img]:h-[500px]
                                [&_img]:mx-auto
                                [&_img]:rounded-xl
                                [&_img]:my-4
                                [&_img]:object-cover
                                [&_img]:shadow-md
                                [&_p]:text-stone-700
                                [&_ul]:list-disc
                                [&_ul]:ml-4
                                [&_ol]:list-decimal
                                [&_ol]:ml-4
                                [&_li]:text-stone-700
                                [&_a]:text-emerald-600
                                [&_a]:underline
                              "
                              dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="flex items-center gap-6 text-sm text-stone-500">
                              {(() => {
                                const storedName = (
                                  userIdentity?.name ??
                                  identityForm.name ??
                                  ""
                                ).trim();
                                const isAppreciated = storedName
                                  ? post.appreciations.some(
                                      (entry) =>
                                        (entry.name ?? "").toLowerCase() ===
                                        storedName.toLowerCase()
                                    )
                                  : false;

                                return (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAppreciation(post.id)}
                                    disabled={appreciateSubmitting[post.id]}
                                    className={`flex items-center gap-2 transition-colors cursor-pointer ${
                                      isAppreciated
                                        ? "text-emerald-700"
                                        : "text-stone-500 hover:text-green-700"
                                    } ${appreciateSubmitting[post.id] ? "opacity-60" : ""}`}
                                  >
                                    <Leaf className="w-4 h-4" />
                                    <span>{post.appreciations.length} Appreciate</span>
                                  </button>
                                );
                              })()}
                                <button
                                  className="flex items-center gap-2 hover:text-green-700 transition-colors cursor-pointer"
                                  onClick={() => toggleComments(post.id)}
                                  type="button"
                                >
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments.length} Respond</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-green-700 transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span>Reference</span>
                              </button>
                            </div>

                            {appreciateError[post.id] ? (
                              <p className="mt-2 text-xs text-red-600">
                                {appreciateError[post.id]}
                              </p>
                            ) : null}

                            {appreciateOpen[post.id] ? (
                              <div className="mt-3">
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <input
                                    type="text"
                                    value={appreciateDrafts[post.id] ?? ""}
                                    onChange={(e) =>
                                      handleAppreciateNameChange(post.id, e.target.value)
                                    }
                                    placeholder="Your name"
                                    className="flex-1 px-3 py-2 border border-emerald-100 rounded-lg bg-white text-sm text-stone-900"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleSubmitAppreciation(post.id)}
                                    disabled={appreciateSubmitting[post.id]}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                                      appreciateSubmitting[post.id]
                                        ? "bg-emerald-400"
                                        : "bg-emerald-700 hover:bg-emerald-800"
                                    }`}
                                  >
                                    {appreciateSubmitting[post.id] ? "Saving..." : "Appreciate"}
                                  </button>
                                </div>
                              </div>
                            ) : null}

                            {commentOpen[post.id] ? (
                              <div className="mt-4 border-t border-stone-100 pt-4">
                                {(() => {
                                  const storedName = userIdentity?.name ?? identityForm.name;
                                  const isAppreciated = storedName
                                    ? post.appreciations.some(
                                        (entry) =>
                                          (entry.name ?? "").toLowerCase() ===
                                          storedName.toLowerCase()
                                      )
                                    : false;
                                  const displayName = storedName || "";
                                  const needsName = !storedName;
                                  const needsEmail = !userIdentity?.email;
                                  const gridCols =
                                    needsName && needsEmail ? "sm:grid-cols-2" : "sm:grid-cols-1";

                                  return (
                                    <>
                                      {!needsName ? (
                                        <div className="text-xs text-stone-500 mb-3">
                                          Commenting as {displayName}
                                        </div>
                                      ) : null}
                                      {needsName || needsEmail ? (
                                        <div className={`grid grid-cols-1 ${gridCols} gap-3 mb-3`}>
                                          {needsName ? (
                                            <input
                                              type="text"
                                              value={identityForm.name}
                                              onChange={(e) =>
                                                handleIdentityChange("name", e.target.value)
                                              }
                                              placeholder="Your name"
                                              className="w-full px-3 py-2 border border-emerald-100 rounded-lg bg-white text-sm text-stone-900"
                                            />
                                          ) : null}
                                          {needsEmail ? (
                                            <div className="w-full">
                                              <input
                                                type="email"
                                                value={identityForm.email}
                                                onChange={(e) =>
                                                  handleIdentityChange("email", e.target.value)
                                                }
                                                onBlur={handleIdentityEmailBlur}
                                                placeholder="Your email"
                                                className="w-full px-3 py-2 border border-emerald-100 rounded-lg bg-white text-sm text-stone-900"
                                              />
                                              {identityEmailInvalid ? (
                                                <p className="mt-1 text-xs text-red-600">
                                                  Please enter a valid email address.
                                                </p>
                                              ) : null}
                                            </div>
                                          ) : null}
                                        </div>
                                      ) : null}
                                    </>
                                  );
                                })()}

                                <div className="flex flex-col sm:flex-row gap-3">
                                  <input
                                    type="text"
                                    value={commentDrafts[post.id] ?? ""}
                                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-1 px-3 py-2 border border-emerald-100 rounded-lg bg-white text-sm text-stone-900"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleSubmitComment(post.id)}
                                    disabled={commentSubmitting[post.id]}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                                      commentSubmitting[post.id]
                                        ? "bg-emerald-400"
                                        : "bg-emerald-700 hover:bg-emerald-800"
                                    }`}
                                  >
                                    {commentSubmitting[post.id] ? "Posting..." : "Post"}
                                  </button>
                                </div>

                                {commentError[post.id] ? (
                                  <p className="mt-2 text-xs text-red-600">
                                    {commentError[post.id]}
                                  </p>
                                ) : null}

                                {post.comments.length > 0 ? (
                                  <div className="mt-4 space-y-4">
                                    {post.comments.map((comment, commentIndex) => {
                                      const commentId =
                                        typeof comment._id === "string"
                                          ? comment._id
                                          : comment._id
                                          ? String(comment._id)
                                          : "";
                                      const commentIdentity =
                                        commentId || `index-${commentIndex}`;
                                      const commentKey = buildCommentKey(
                                        post.id,
                                        commentIdentity
                                      );
                                      const replyKey = buildReplyKey(
                                        post.id,
                                        commentIdentity
                                      );
                                      const replies = Array.isArray(comment.replies)
                                        ? comment.replies
                                        : [];
                                      const commentAppreciations = Array.isArray(
                                        comment.appreciations
                                      )
                                        ? comment.appreciations
                                        : [];
                                      const storedName = (
                                        userIdentity?.name ??
                                        identityForm.name ??
                                        ""
                                      ).trim();
                                      const isCommentAppreciated = storedName
                                        ? commentAppreciations.some(
                                            (entry) =>
                                              (entry.name ?? "").toLowerCase() ===
                                              storedName.toLowerCase()
                                          )
                                        : false;
                                      const canReply = Boolean(commentId);
                                      const canAppreciate = Boolean(commentId);

                                      return (
                                        <div
                                          key={`${post.id}-comment-${commentId || commentIndex}`}
                                          className="space-y-2"
                                        >
                                          <div className="text-xs text-stone-500">
                                            {comment.publisher?.name ?? "Anonymous"}
                                          </div>
                                          <p className="text-sm text-stone-700">{comment.text}</p>
                                          <div className="flex items-center gap-4 text-xs">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleToggleCommentAppreciation(
                                                  post.id,
                                                  commentId
                                                )
                                              }
                                              disabled={
                                                !canAppreciate ||
                                                commentAppreciateSubmitting[commentKey]
                                              }
                                              className={`flex items-center gap-2 transition-colors ${
                                                canAppreciate
                                                  ? "cursor-pointer"
                                                  : "cursor-not-allowed"
                                              } ${
                                                isCommentAppreciated
                                                  ? "text-emerald-700"
                                                  : canAppreciate
                                                    ? "text-stone-500 hover:text-emerald-700"
                                                    : "text-stone-400"
                                              } ${
                                                commentAppreciateSubmitting[commentKey]
                                                  ? "opacity-60"
                                                  : ""
                                              }`}
                                            >
                                              <Leaf className="w-3.5 h-3.5" />
                                              <span>
                                                {commentAppreciations.length} Appreciate
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => toggleReply(post.id, commentId)}
                                              disabled={!canReply}
                                              className={`text-xs font-medium ${
                                                canReply
                                                  ? "text-emerald-700 hover:text-emerald-800 cursor-pointer"
                                                  : "text-stone-400 cursor-not-allowed"
                                              }`}
                                            >
                                              Reply
                                            </button>
                                          </div>

                                          {commentAppreciateError[commentKey] ? (
                                            <p className="text-xs text-red-600">
                                              {commentAppreciateError[commentKey]}
                                            </p>
                                          ) : null}

                                          {canAppreciate && commentAppreciateOpen[commentKey] ? (
                                            <div className="mt-2">
                                              <div className="flex flex-col sm:flex-row gap-3">
                                                <input
                                                  type="text"
                                                  value={commentAppreciateDrafts[commentKey] ?? ""}
                                                  onChange={(e) =>
                                                    handleCommentAppreciateNameChange(
                                                      commentKey,
                                                      e.target.value
                                                    )
                                                  }
                                                  placeholder="Your name"
                                                  className="flex-1 px-3 py-2 border border-emerald-100 rounded-lg bg-white text-sm text-stone-900"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleSubmitCommentAppreciation(
                                                      post.id,
                                                      commentId
                                                    )
                                                  }
                                                  disabled={
                                                    commentAppreciateSubmitting[commentKey]
                                                  }
                                                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                                                    commentAppreciateSubmitting[commentKey]
                                                      ? "bg-emerald-400"
                                                      : "bg-emerald-700 hover:bg-emerald-800"
                                                  }`}
                                                >
                                                  {commentAppreciateSubmitting[commentKey]
                                                    ? "Saving..."
                                                    : "Appreciate"}
                                                </button>
                                              </div>
                                            </div>
                                          ) : null}

                                          {replyOpen[replyKey] ? (
                                            <div className="flex flex-col sm:flex-row gap-3">
                                              <input
                                                type="text"
                                                value={replyDrafts[replyKey] ?? ""}
                                                onChange={(e) =>
                                                  handleReplyChange(replyKey, e.target.value)
                                                }
                                                placeholder="Write a reply..."
                                                className="flex-1 px-3 py-2 border border-emerald-100 rounded-lg bg-white text-sm text-stone-900"
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleSubmitReply(post.id, commentId)
                                                }
                                                disabled={replySubmitting[replyKey]}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                                                  replySubmitting[replyKey]
                                                    ? "bg-emerald-400"
                                                    : "bg-emerald-700 hover:bg-emerald-800"
                                                }`}
                                              >
                                                {replySubmitting[replyKey] ? "Posting..." : "Post"}
                                              </button>
                                            </div>
                                          ) : null}

                                          {replyError[replyKey] ? (
                                            <p className="text-xs text-red-600">
                                              {replyError[replyKey]}
                                            </p>
                                          ) : null}

                                          {replies.length > 0 ? (
                                            <div className="pl-4 border-l border-stone-200 space-y-3">
                                              {replies.map((reply, replyIndex) => (
                                                <div
                                                  key={`${post.id}-comment-${commentId}-reply-${
                                                    reply._id ?? replyIndex
                                                  }`}
                                                >
                                                  <div className="text-xs text-stone-500">
                                                    {reply.publisher?.name ?? "Anonymous"}
                                                  </div>
                                                  <p className="text-sm text-stone-700">
                                                    {reply.text}
                                                  </p>
                                                </div>
                                              ))}
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="mt-4 text-xs text-stone-400">
                                    No comments yet.
                                  </p>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Page Closure */}
          <section className="py-16 bg-stone-50 mt-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xl text-stone-700 mb-4">
                "Every shared experience helps others travel more responsibly."
              </p>
              <p className="text-stone-600">
                Your insights contribute to a collective understanding of respectful ecotourism.
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
