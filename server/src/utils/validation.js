const isValidEmail = (value) => {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

const isValidName = (value) => {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  return /^[\p{L}]+(?:\s+[\p{L}]+)*$/u.test(trimmed);
};

module.exports = { isValidEmail, isValidName };
