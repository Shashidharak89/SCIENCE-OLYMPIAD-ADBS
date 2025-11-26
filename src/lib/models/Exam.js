// src/lib/models/Exam.js
import mongoose from "mongoose";
import { getNextPrefixedId } from "./Counter.js";

const ExamSchema = new mongoose.Schema(
  {
    _id: { type: String }, // EXM1, EXM2, ...
    subjectId: {
      type: String,
      ref: "Subject",
      required: true,
    },
    centerId: {
      type: String,
      ref: "Center",
      required: true,
    },
    level: {
      type: String,
      enum: ["SCHOOL", "REGIONAL", "NATIONAL", "INTERNATIONAL"],
      required: true,
    },
    year: { type: Number, required: true },
    round: { type: Number, default: 1 },

    examDate: { type: Date },

    maxMarks: { type: Number }, // can override subject.maxMarks
    totalParticipants: { type: Number, default: 0 }, // optional cache
  },
  { timestamps: true }
);

ExamSchema.pre("save", async function (next) {
  if (!this.isNew || this._id) return next();
  try {
    this._id = await getNextPrefixedId("EXM");
    next();
  } catch (err) {
    next(err);
  }
});

const Exam = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);

export default Exam;
