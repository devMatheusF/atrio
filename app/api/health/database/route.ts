import { NextResponse } from "next/server";

import { services } from "@/app/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await services.health.checkDatabase();

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        status: "unhealthy",
        checkedAt: new Date(),
      },
      { status: 503 },
    );
  }
}
