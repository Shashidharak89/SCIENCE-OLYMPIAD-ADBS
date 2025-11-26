// src/app/api/student/insert/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Student from "@/lib/models/Student";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let result;
    if (Array.isArray(body)) {
      // multiple students
      result = await Student.insertMany(body);
    } else {
      // single student
      const student = new Student(body);
      await student.save();
      result = student;
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting student(s):", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
