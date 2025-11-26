// src/app/api/exam/insert/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Exam from "@/lib/models/Exam";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let result;
    if (Array.isArray(body)) {
      result = await Exam.insertMany(body);
    } else {
      const exam = new Exam(body);
      await exam.save();
      result = exam;
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting exam(s):", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
