import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    vehicleName: {
      type: String,
    },
    platNumber: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  return object;
});

export default mongoose.model("vehicle", schema);
