import authModel from "../model/auth.js";
import userModel from "../model/user.js";
import validation from "../util/validation.js";
import encrypt from "../util/secure_password.js";

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const confirmationPassword = req.body.confirm_password;

  if (
    !validation.validateRegisterData(
      username,
      email,
      password,
      confirmationPassword
    )
  ) {
    return res.status(400).json({
      status: "Register Gagal",
      message: "Field tidak boleh kosong",
    });
  }

  if (!validation.validateEmail(email)) {
    return res.status(400).json({
      status: "Register Gagal",
      message: "Gunakan email yang valid",
    });
  }

  if (!validation.validatePassword(password, confirmationPassword)) {
    return res.status(400).json({
      status: "Register Gagal",
      message: "Password harus lebih dari 6 karakter",
    });
  }

  if (!validation.validateConfirmPassword(password, confirmationPassword)) {
    return res.status(400).json({
      status: "Register Gagal",
      message: "Password tidak sama",
    });
  }

  const nameExist = await authModel.findOne({ username: req.body.username });

  if (nameExist) {
    return res.status(400).json({
      status: "Register Gagal",
      message: "Username sudah digunakan",
    });
  }

  const emailExist = await authModel.findOne({ email: req.body.email });

  if (emailExist) {
    return res
      .status(400)
      .json({ status: "Register Gagal", message: "Email sudah digunakan" });
  }

  const encryptPassowrd = await encrypt.encryptPassword(password);

  await authModel.create({ username: username, password: encryptPassowrd });

  await userModel.create({
    username: username,
    email: email,
    address: "-",
    urlImage:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    phone: "-",
  });

  const user = await userModel.findOne({ username: username });

  delete user._id;

  return res.status(201).json({
    status: "Register Sukses",
    message: "Akun berhasil dibuat",
    user: user,
  });
};

export default { register };
