// src/app/api/reports/physics-rank-distribution/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Result from "@/lib/models/Result";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const physicsSubjectId = "PHY";

  const agg = await Result.aggregate([
    { $match: { subjectId: physicsSubjectId, rankOverall: { $ne: null } } },
    {
      $group: {
        _id: "$rankOverall",
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return NextResponse.json({ rankDistribution: agg });
}
