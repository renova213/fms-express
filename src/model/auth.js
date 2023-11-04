import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  return object;
});

export default mongoose.model("auth", schema);
