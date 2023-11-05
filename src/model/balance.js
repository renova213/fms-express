import mongoose from "mongoose";

const schema = mongoose.Schema({
  userId: {
    type: String,
  },
  totalBalance: {
    type: Number,
  },
  incomeBalance: {
    type: Number,
  },
  outcomeBalance: {
    type: Number,
  },
});
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  return object;
});

export default mongoose.model("balance", schema);
