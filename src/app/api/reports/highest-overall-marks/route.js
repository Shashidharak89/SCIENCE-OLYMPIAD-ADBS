// src/app/api/reports/highest-overall-marks/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const agg = await Result.aggregate([
    {
      $group: {
        _id: "$studentId",
        totalMarks: { $sum: "$marks" }
      }
    },
    { $sort: { totalMarks: -1 } },
    { $limit: 1 }
  ]);

  if (agg.length === 0) {
    return NextResponse.json({ student: null });
  }

  const best = agg[0];

  const student = await Student.findById(best._id).lean();

  return NextResponse.json({
    student,
    totalMarks: best.totalMarks
  });
}
