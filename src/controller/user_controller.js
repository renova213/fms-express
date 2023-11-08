import userModel from "../model/user.js";
import joiValidation from "../util/joi_validation.js";

const findUserByUsername = async (req, res) => {
  try {
    const identifier = req.params.identifier;

    if (!identifier) return res.status(400).json({ message: "Param kosong" });

    if (identifier.includes("@")) {
      const user = await userModel.findOne({ email: identifier });
      if (!user)
        return res.status(404).json({ message: "User tidak ditemukan" });
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
        urlImage: user.urlImage,
        phone: user.phone,
      });
    }

    if (!identifier.includes("@")) {
      const user = await userModel.findOne({ username: identifier });
      if (!user)
        return res.status(404).json({ message: "User tidak ditemukan" });
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
        urlImage: user.urlImage,
        phone: user.phone,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getUser = async (req, res) => {
  try {
    let users = await userModel.find();

    users = users.map((user) => {
      const newUser = user.toObject();
      newUser.id = newUser._id;
      delete newUser._id;
      delete newUser.__v;
      return newUser;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUserData = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "username param kosong" });

    const { error } = joiValidation.updateUserData(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    await userModel
      .findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "id tidak ditemukan" });
        }
        return res.status(200).json({
          "id":data._id,
          "username":data.username,
          "email": data.email,
          "address": data.address,
          "urlImage": data.urlImage,
          "phone": data.phone,
        });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export default { findUserByUsername, updateUserData, getUser };
