import type { PrismaClient } from "@/app/generated/prisma/client";
import type { HealthService } from "@/app/services/health/HealthService";
import type { DatabaseHealthOutput } from "@/app/services/health/types";

export type PrismaHealthServiceDatabase = Pick<PrismaClient, "$queryRaw">;

export class PrismaHealthService implements HealthService {
  constructor(private readonly db: PrismaHealthServiceDatabase) {}

  async checkDatabase(): Promise<DatabaseHealthOutput> {
    await this.db.$queryRaw`SELECT 1`;

    return {
      status: "healthy",
      checkedAt: new Date(),
    };
  }
}
