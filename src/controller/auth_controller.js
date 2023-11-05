import authModel from "../model/auth.js";
import userModel from "../model/user.js";
import authValidation from "../util/auth_validation.js";
import encrypt from "../util/secure_password.js";
import generateToken from "../util/generate_token.js";

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const confirmationPassword = req.body.confirm_password;

  try {
    if (
      !authValidation.validateRegisterData(
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

    if (!authValidation.validateEmail(email)) {
      return res.status(400).json({
        status: "Register Gagal",
        message: "Gunakan email yang valid",
      });
    }

    if (!authValidation.validatePassword(password, confirmationPassword)) {
      return res.status(400).json({
        status: "Register Gagal",
        message: "Password harus lebih dari 6 karakter",
      });
    }

    if (
      !authValidation.validateConfirmPassword(password, confirmationPassword)
    ) {
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
  } catch (_) {
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validUsername = await authModel.findOne({
    username: username,
  });

  if (!validUsername) {
    return res
      .status(401)
      .json({ status: "Login Gagal", message: "Username salah" });
  }

  const validPassword = await authValidation.validateLoginPassword(
    password,
    validUsername.password
  );

  if (!validPassword) {
    return res
      .status(401)
      .json({ status: "Login Gagal", message: "Password salah" });
  }
  const accessToken = await generateToken(validUsername);

  const validUser = await userModel.findOne({
    username: username,
  });

  delete validUser._id;

  res.status(200).json({
    message: "Login berhasil",
    user: validUser,
    token: accessToken.accessToken,
  });
};

export default { register, login };
