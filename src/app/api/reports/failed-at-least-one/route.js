// src/app/api/reports/failed-at-least-one/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const agg = await Result.aggregate([
    {
      $match: { passed: false }
    },
    {
      $group: {
        _id: "$studentId",
        failedSubjects: { $addToSet: "$subjectId" }
      }
    }
  ]);

  const studentIds = agg.map((s) => s._id);
  const students = await Student.find({ _id: { $in: studentIds } }).lean();

  // Get subject names for friendly output
  const subjectIds = new Set();
  agg.forEach((a) => a.failedSubjects.forEach((id) => subjectIds.add(id)));
  const Subject = (await import("@/lib/models/Subject")).default;
  const subjects = await Subject.find({ _id: { $in: Array.from(subjectIds) } }).lean();
  const subjectMap = {};
  subjects.forEach((s) => (subjectMap[s._id] = s.name));

  const studentMap = {};
  students.forEach((s) => (studentMap[s._id] = s));

  const data = agg.map((a) => ({
    studentId: a._id,
    name: studentMap[a._id]?.name || null,
    regNo: studentMap[a._id]?.regNo || null,
    schoolOrCollege: studentMap[a._id]?.schoolOrCollege || null,
    subjectsFailed: a.failedSubjects.map((id) => ({ subjectId: id, subjectName: subjectMap[id] || id }))
  }));

  return NextResponse.json({ data });
}
