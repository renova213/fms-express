import bcrypt from "bcryptjs";

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

export default { encryptPassword };
