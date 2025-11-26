// src/lib/models/Result.js
import mongoose from "mongoose";
import { getNextPrefixedId } from "./Counter.js";

const ResultSchema = new mongoose.Schema(
  {
    _id: { type: String }, // RES1, RES2, ...

    // references
    studentId: {
      type: String,
      ref: "Student",
      required: true,
    },
    examId: {
      type: String,
      ref: "Exam",
      required: true,
    },

    // denormalised fields for easy aggregation
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

    // marks & ranks
    marks: { type: Number, required: true },
    rankInCenter: { type: Number },
    rankOverall: { type: Number },

    // qualification flags
    qualifiedForRegional: { type: Boolean, default: false },
    qualifiedForNational: { type: Boolean, default: false },
    qualifiedForInternational: { type: Boolean, default: false },

    // awards
    medal: {
      type: String,
      enum: ["GOLD", "SILVER", "BRONZE"],
      default: null,
    },
    scholarship: {
      hasScholarship: { type: Boolean, default: false },
      type: {
        type: String,
        enum: ["FULL", "PARTIAL"],
        default: null,
      },
      amount: { type: Number, default: 0 },
    },
    hasCertificate: { type: Boolean, default: true },

    // pass/fail
    passed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ResultSchema.pre("save", async function (next) {
  if (!this.isNew || this._id) return next();
  try {
    this._id = await getNextPrefixedId("RES");
    next();
  } catch (err) {
    next(err);
  }
});

const Result =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;
