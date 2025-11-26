// src/app/api/center/insert/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Center from "@/lib/models/Center";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let result;
    if (Array.isArray(body)) {
      result = await Center.insertMany(body);
    } else {
      const center = new Center(body);
      await center.save();
      result = center;
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting center(s):", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
