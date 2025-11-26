// src/app/api/reports/top3-per-subject/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";
import Subject from "@/lib/models/Subject";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const agg = await Result.aggregate([
    { $sort: { subjectId: 1, marks: -1 } },
    {
      $group: {
        _id: "$subjectId",
        topResults: {
          $push: {
            studentId: "$studentId",
            marks: "$marks",
            examId: "$examId",
            centerId: "$centerId",
            level: "$level",
            year: "$year"
          }
        }
      }
    },
    {
      $project: {
        _id: 1,
        topResults: { $slice: ["$topResults", 3] }
      }
    }
  ]);

  const subjectIds = agg.map((g) => g._id);
  const subjects = await Subject.find({ _id: { $in: subjectIds } }).lean();

  // collect all studentIds
  const studentIds = [
    ...new Set(
      agg.flatMap((g) => g.topResults.map((r) => r.studentId))
    )
  ];

  const studentsArr = await Student.find({ _id: { $in: studentIds } }).lean();
  const studentsById = Object.fromEntries(
    studentsArr.map((s) => [s._id, s])
  );

  const enriched = agg.map((g) => ({
    subjectId: g._id,
    subject: subjects.find((s) => s._id === g._id) || null,
    topResults: g.topResults.map((r) => ({
      ...r,
      student: studentsById[r.studentId] || null
    })
  )}));

  return NextResponse.json({ data: enriched });
}
