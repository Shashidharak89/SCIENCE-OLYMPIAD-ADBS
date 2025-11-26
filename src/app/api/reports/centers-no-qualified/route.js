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

    // Get participant count for each center
    const centerCounts = await Result.aggregate([
      {
        $match: { centerId: { $in: centerIds } }
      },
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
      }
    ]);

    const countMap = {};
    centerCounts.forEach((item) => {
      countMap[item._id] = item.participantCount;
    });

    const data = centers.map((center) => ({
      centerId: center._id,
      centerName: center.name,
      city: center.city,
      state: center.state,
      region: center.region,
      participantCount: countMap[center._id] || 0,
    }));

    return NextResponse.json({ data });
}
