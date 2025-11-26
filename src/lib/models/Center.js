// src/lib/models/Center.js
import mongoose from "mongoose";
import { getNextPrefixedId } from "./Counter.js";

const CenterSchema = new mongoose.Schema(
  {
    _id: { type: String }, // CTR1, CTR2, ...
    code: { type: String, unique: true, required: true }, // e.g., BLR-C01
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    region: { type: String },
  },
  { timestamps: true }
);

CenterSchema.pre("save", async function (next) {
  if (!this.isNew || this._id) return next();
  try {
    this._id = await getNextPrefixedId("CTR");
    next();
  } catch (err) {
    next(err);
  }
});

const Center =
  mongoose.models.Center || mongoose.model("Center", CenterSchema);

export default Center;
