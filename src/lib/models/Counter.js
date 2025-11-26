// src/lib/models/Counter.js
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // prefix, e.g. "STU", "CTR", "SUB"
    seq: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

/**
 * Get next ID like "STU1", "STU2", etc.
 * @param {string} prefix
 * @returns {Promise<string>}
 */
export async function getNextPrefixedId(prefix) {
  const updated = await Counter.findOneAndUpdate(
    { _id: prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `${prefix}${updated.seq}`;
}

export default Counter;
