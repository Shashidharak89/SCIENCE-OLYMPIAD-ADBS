// src/app/api/reports/above-average-all-subjects/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  // 1) Get subject averages
  const subjectAvg = await Result.aggregate([
    {
      $group: {
        _id: "$subjectId",
        avgMarks: { $avg: "$marks" }
      }
    }
  ]);

  const avgMap = {};
  subjectAvg.forEach((s) => {
    avgMap[s._id] = s.avgMarks;
  });

  // 2) Get each student's marks per subject
  const perStudent = await Result.aggregate([
    {
      $group: {
        _id: "$studentId",
        subjects: {
          $push: {
            subjectId: "$subjectId",
            marks: "$marks"
          }
        }
      }
    }
  ]);

  // 3) Filter in JS: higher than avg in all subjects and has all 3 subjects
  const qualifiedStudentIds = perStudent
    .filter((s) => {
      if (!s.subjects || s.subjects.length < 3) return false;

      // Track best mark per subject (in case multiple attempts)
      const bestBySubject = {};
      s.subjects.forEach(({ subjectId, marks }) => {
        if (
          bestBySubject[subjectId] === undefined ||
          marks > bestBySubject[subjectId]
        ) {
          bestBySubject[subjectId] = marks;
        }
      });

      const subjectIds = Object.keys(bestBySubject);
      if (subjectIds.length < 3) return false; // must have all 3

      // Check each subject: marks > avg
      return subjectIds.every((subId) => {
        const avg = avgMap[subId];
        if (avg == null) return false;
        return bestBySubject[subId] > avg;
      });
    })
    .map((s) => s._id);

  const students = await Student.find({
    _id: { $in: qualifiedStudentIds }
  }).lean();

  return NextResponse.json({ students });
}
