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

    // Create a map of subjects for quick lookup
    const subjectMap = {};
    subjects.forEach((s) => {
      subjectMap[s._id] = s;
    });

    // Combine stats with subject data
    const data = agg.map((item) => {
      const subject = subjectMap[item._id];
      return {
        subjectId: item._id,
        subjectName: subject?.name,
        subjectCode: subject?.code,
        averageMarks: parseFloat(item.avgMarks.toFixed(2)),
        participantCount: item.participantCount,
        maxMarks: subject?.maxMarks,
      };
    });

    return NextResponse.json({ data });
}
