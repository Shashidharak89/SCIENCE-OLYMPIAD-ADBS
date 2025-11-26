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
    return NextResponse.json({ data: [] });
  }

  const best = agg[0];

  const student = await Student.findById(best._id).lean();

  const data = [{
    studentId: student._id,
    name: student.name,
    schoolOrCollege: student.schoolOrCollege,
    region: student.region,
    totalMarks: best.totalMarks,
  }];

  return NextResponse.json({ data });
}
