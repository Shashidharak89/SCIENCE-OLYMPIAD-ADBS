// src/lib/models/Student.js
import mongoose from "mongoose";
import { getNextPrefixedId } from "./Counter.js";

const StudentSchema = new mongoose.Schema(
  {
    _id: { type: String }, // STU1, STU2, ...
    regNo: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ["M", "F", "O"], default: "O" },
    class: { type: String }, // or grade
    schoolOrCollege: { type: String },
    region: { type: String }, // e.g., "South Zone"
  },
  { timestamps: true }
);

// Auto-generate ID like "STU1"
StudentSchema.pre("save", async function (next) {
  if (!this.isNew || this._id) return next();
  try {
    this._id = await getNextPrefixedId("STU");
    next();
  } catch (err) {
    next(err);
  }
});

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;
