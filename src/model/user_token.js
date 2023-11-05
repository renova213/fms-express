import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
  authId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400,
  },
});

userTokenSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  return object;
});

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
