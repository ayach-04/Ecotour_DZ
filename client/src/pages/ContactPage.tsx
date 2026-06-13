import { useEffect, useState } from "react";
import { motion } from "motion/react";

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

const resolveApiBase = () => {
  const fallbackBase =
    API_BASE_URL ||
    (window.location.origin.includes("localhost:") ? "http://localhost:5000" : window.location.origin);
  return fallbackBase.endsWith("/") ? fallbackBase.slice(0, -1) : fallbackBase;
};

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<{ state: "idle" | "loading" | "success" | "error"; message: string }>({
    state: "idle",
    message: "",
  });
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    const stored = readUserCookie();
    if (stored) {
      setForm((prev) => ({ ...prev, name: stored.name, email: stored.email ?? "" }));
    }
  }, []);

  const handleChange = (field: "name" | "email" | "subject" | "message", value: string) => {
    const nextValue = field === "name" ? sanitizeNameInput(value) : value;
    setForm((prev) => ({ ...prev, [field]: nextValue }));
  };
  const emailInvalid = emailTouched && form.email.trim() && !isValidEmail(form.email);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({ state: "error", message: "Name, email, and message are required." });
      return;
    }

    if (!isValidName(name)) {
      setStatus({ state: "error", message: "Name should contain letters only." });
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const base = resolveApiBase();
      const response = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus({ state: "success", message: "Message sent. We will get back to you soon." });
      setForm((prev) => ({ ...prev, subject: "", message: "" }));
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Failed to send message.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-emerald-50 to-white pt-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4 text-stone-900 font-normal mt-12">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto mb-8">
              Have questions about responsible ecotourism in Algeria? Want to collaborate or share
              knowledge? We&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6 mb-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-100 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-100 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                {emailInvalid ? (
                  <p className="mt-1 text-xs text-red-600">
                    Please enter a valid email address.
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-lg border border-emerald-100 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Message</label>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Share your question or request..."
                className="w-full px-4 py-3 rounded-lg border border-emerald-100 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none"
              />
            </div>

            {status.message ? (
              <div
                className={`text-sm ${
                  status.state === "success"
                    ? "text-emerald-700"
                    : status.state === "error"
                      ? "text-red-600"
                      : "text-emerald-700"
                }`}
              >
                {status.message}
              </div>
            ) : null}

            <div className="flex items-center justify-between">
              <p className="text-xs text-emerald-700/70">
                We only use your email to respond to your request.
              </p>
              <button
                type="submit"
                disabled={status.state === "loading"}
                className={`px-6 py-3 rounded-full text-sm font-semibold text-white ${
                  status.state === "loading"
                    ? "bg-emerald-300"
                    : "bg-emerald-700 hover:bg-emerald-800"
                }`}
              >
                {status.state === "loading" ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
