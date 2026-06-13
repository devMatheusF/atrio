import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  PrismaHealthService,
  type PrismaHealthServiceDatabase,
} from "./PrismaHealthService";

describe("PrismaHealthService", () => {
  let queryRaw: ReturnType<typeof vi.fn>;
  let service: PrismaHealthService;

  beforeEach(() => {
    queryRaw = vi.fn();

    service = new PrismaHealthService({
      $queryRaw: queryRaw,
    } as unknown as PrismaHealthServiceDatabase);
  });

  describe("checkDatabase", () => {
    it("returns healthy when the database query succeeds", async () => {
      queryRaw.mockResolvedValue([{ "?column?": 1 }]);

      const result = await service.checkDatabase();

      expect(result.status).toBe("healthy");
      expect(result.checkedAt).toBeInstanceOf(Date);
      expect(queryRaw).toHaveBeenCalledOnce();
    });

    it("propagates database errors", async () => {
      const error = new Error("database unavailable");
      queryRaw.mockRejectedValue(error);

      await expect(service.checkDatabase()).rejects.toThrow(error);
    });
  });
});
