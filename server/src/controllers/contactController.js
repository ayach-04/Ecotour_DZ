const ContactMessage = require("../models/ContactMessage");
const { isValidEmail, isValidName } = require("../utils/validation");
const { sendEmail } = require("../utils/email");

async function createContactMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    if (subject && typeof subject === "string" && subject.trim()) {
      payload.subject = subject.trim();
    }

    const created = await ContactMessage.create(payload);

    const notifyAddress = process.env.SMTP_USER || process.env.SMTP_FROM || "";
    if (notifyAddress) {
      const lines = [
        "New contact message received:",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject || "N/A"}`,
        "",
        "Message:",
        payload.message,
      ];
      sendEmail({
        to: notifyAddress,
        subject: "EcoTour DZ Contact Message",
        text: lines.join("\n"),
      }).catch((error) => {
        console.error("Contact email notification failed:", error);
      });
    }

    return res.status(201).json({
      id: created._id,
      message: "Message received",
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ message: "Failed to send message" });
  }
}

module.exports = { createContactMessage };
