// src/app/api/reports/subject-most-participants/route.js
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
        participants: { $addToSet: "$studentId" }
      }
    },
    {
      $project: {
        _id: 1,
        participantCount: { $size: "$participants" }
      }
    },
    { $sort: { participantCount: -1 } },
    { $limit: 1 }
  ]);

  if (agg.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const top = agg[0];
  const subject = await Subject.findById(top._id).lean();

    const data = [{
      subjectId: subject._id,
      subjectName: subject.name,
      subjectCode: subject.code,
      participantCount: top.participantCount,
      maxMarks: subject.maxMarks
    }];

    return NextResponse.json({ data });
}
