// src/app/api/reports/centers-more-than-100/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Center from "@/lib/models/Center";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const agg = await Result.aggregate([
    {
      $group: {
        _id: "$centerId",
        students: { $addToSet: "$studentId" }
      }
    },
    {
      $project: {
        _id: 1,
        participantCount: { $size: "$students" }
      }
    },
    {
      $match: {
        participantCount: { $gt: 100 }
      }
    }
  ]);

  const centerIds = agg.map((c) => c._id);
  const centers = await Center.find({ _id: { $in: centerIds } }).lean();

  return NextResponse.json({ centersWithCounts: agg, centers });
}
