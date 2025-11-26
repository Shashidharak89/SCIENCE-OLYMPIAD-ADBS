// src/app/api/subject/insert/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Subject from "@/lib/models/Subject";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let result;
    if (Array.isArray(body)) {
      result = await Subject.insertMany(body);
    } else {
      const subject = new Subject(body);
      await subject.save();
      result = subject;
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting subject(s):", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
