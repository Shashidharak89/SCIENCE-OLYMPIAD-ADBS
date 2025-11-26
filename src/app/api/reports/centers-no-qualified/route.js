// src/app/api/reports/centers-no-qualified/route.js
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
        anyQualified: {
          $max: {
            $cond: [
              {
                $or: [
                  "$qualifiedForRegional",
                  "$qualifiedForNational",
                  "$qualifiedForInternational"
                ]
              },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $match: {
        anyQualified: 0
      }
    }
  ]);

  const centerIds = agg.map((c) => c._id);
  const centers = await Center.find({ _id: { $in: centerIds } }).lean();

  return NextResponse.json({ centers });
}
