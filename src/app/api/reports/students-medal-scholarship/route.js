// src/app/api/reports/students-medal-scholarship/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const agg = await Result.aggregate([
    {
      $match: {
        medal: { $ne: null },
        "scholarship.hasScholarship": true
      }
    },
    {
      $group: {
        _id: "$studentId",
        medals: { $addToSet: "$medal" },
        totalScholarship: { $sum: "$scholarship.amount" }
      }
    }
  ]);

  const studentIds = agg.map((s) => s._id);
  const students = await Student.find({ _id: { $in: studentIds } }).lean();

  return NextResponse.json({ studentsWithAwards: agg, students });
}
