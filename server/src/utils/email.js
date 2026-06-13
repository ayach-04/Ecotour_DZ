const nodemailer = require("nodemailer");

const getTransport = () => {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const auth = user && pass ? { user, pass } : undefined;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
  });
};

const getFromAddress = () => process.env.SMTP_FROM || process.env.SMTP_USER || "";

const sendEmail = async ({ to, subject, text }) => {
  if (!to) return { skipped: true, reason: "missing-recipient" };

  const transport = getTransport();
  if (!transport) {
    console.warn("Email not sent: SMTP not configured");
    return { skipped: true, reason: "smtp-not-configured" };
  }

  const from = getFromAddress();
  if (!from) {
    console.warn("Email not sent: SMTP_FROM or SMTP_USER is required");
    return { skipped: true, reason: "missing-from" };
  }

  return transport.sendMail({ from, to, subject, text });
};

module.exports = { sendEmail };
