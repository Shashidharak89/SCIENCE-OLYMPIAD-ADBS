// src/app/api/result/insert/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let result;
    if (Array.isArray(body)) {
      result = await Result.insertMany(body);
    } else {
      const resultDoc = new Result(body);
      await resultDoc.save();
      result = resultDoc;
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting result(s):", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
