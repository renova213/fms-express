import bcrypt from "bcryptjs";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateConfirmPassword(password, confirmPassword) {
  const doPasswordsMatch = password === confirmPassword;

  return doPasswordsMatch;
}

function validateRegisterData(username, email, password, confirmationPassword) {
  if (!username || !email || !password || !confirmationPassword) {
    return false;
  }
  return true;
}

function validatePassword(password, confirmPassword) {
  if (password.length >= 6) {
    return true;
  }
  return false;
}

async function validateLoginPassword(password, encryptPassword) {
  return await bcrypt.compare(password, encryptPassword);
}

export default {
  validateEmail,
  validateConfirmPassword,
  validateRegisterData,
  validatePassword,
  validateLoginPassword,
};
