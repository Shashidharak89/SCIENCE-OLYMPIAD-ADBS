// src/app/api/reports/students-all-three-subjects/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  // Group results by student and count distinct subjects
  const agg = await Result.aggregate([
    {
      $group: {
        _id: "$studentId",
        subjects: { $addToSet: "$subjectId" }
      }
    },
    {
      $project: {
        _id: 1,
        subjects: 1,
        subjectCount: { $size: "$subjects" }
      }
    },
    {
      $match: {
        subjectCount: { $gte: 3 } // appeared in all 3 subjects
      }
    }
  ]);

  const studentIds = agg.map((s) => s._id);

  const students = await Student.find({ _id: { $in: studentIds } }).lean();

  // Map to match frontend expectations
  const data = students.map((student) => ({
    studentId: student._id,
    regNo: student.regNo,
    name: student.name,
    schoolOrCollege: student.schoolOrCollege,
    class: student.class,
    region: student.region,
  }));

  return NextResponse.json({ data });
}
