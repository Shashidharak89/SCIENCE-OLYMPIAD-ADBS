// src/app/api/reports/subjects-highest-avg/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Subject from "@/lib/models/Subject";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const agg = await Result.aggregate([
    {
      $group: {
        _id: "$subjectId",
        avgMarks: { $avg: "$marks" },
        participantCount: { $addToSet: "$studentId" }
      }
    },
    {
      $project: {
        _id: 1,
        avgMarks: 1,
        participantCount: { $size: "$participantCount" }
      }
    },
    { $sort: { avgMarks: -1 } }
  ]);

  const subjectIds = agg.map((s) => s._id);
  const subjects = await Subject.find({ _id: { $in: subjectIds } }).lean();

  return NextResponse.json({ subjectsWithStats: agg, subjects });
}
