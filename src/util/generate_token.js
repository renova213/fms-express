import jwt from "jsonwebtoken";
import UserTokenModel from "../model/user_token.js";

const generateTokens = async (auth) => {
  try {
    const payload = { id: auth.id };
    const accessToken = jwt.sign(payload, "123456", {
      expiresIn: "30d",
    });

    const userToken = await UserTokenModel.findOne({ authId: auth._id });
    if (userToken) await UserTokenModel.findByIdAndDelete(userToken._id);

    await new UserTokenModel({
      authId: auth._id,
      accessToken: accessToken,
    }).save();

    return Promise.resolve({ accessToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
