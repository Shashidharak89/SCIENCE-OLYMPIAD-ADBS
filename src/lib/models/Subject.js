// src/lib/models/Subject.js
import mongoose from "mongoose";
import { getNextPrefixedId } from "./Counter.js";

const SubjectSchema = new mongoose.Schema(
  {
    _id: { type: String }, // SUB1, SUB2, ...
    code: { type: String, unique: true, required: true }, // PHY, CHE, BIO
    name: { type: String, required: true },
    maxMarks: { type: Number, default: 100 },
    passMarks: { type: Number, default: 40 },
  },
  { timestamps: true }
);

SubjectSchema.pre("save", async function (next) {
  if (!this.isNew || this._id) return next();
  try {
    this._id = await getNextPrefixedId("SUB");
    next();
  } catch (err) {
    next(err);
  }
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

export default Subject;
