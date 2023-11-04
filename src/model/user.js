import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    urlImage: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  return object;
});

export default mongoose.model("user", schema);
