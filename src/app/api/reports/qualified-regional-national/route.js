// src/app/api/reports/qualified-regional-national/route.js
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
        qualifiedForRegional: true,
        qualifiedForNational: true
      }
    },
    {
      $group: {
        _id: "$studentId",
        subjects: { $addToSet: "$subjectId" }
      }
    }
  ]);

  const studentIds = agg.map((s) => s._id);

  const students = await Student.find({ _id: { $in: studentIds } }).lean();

    const data = students.map((student) => ({
      studentId: student._id,
      name: student.name,
      schoolOrCollege: student.schoolOrCollege,
      region: student.region,
      class: student.class,
    }));

    return NextResponse.json({ data });
}
