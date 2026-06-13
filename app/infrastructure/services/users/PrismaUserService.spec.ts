import { beforeEach, describe, expect, it, vi } from "vitest";

import type { UserOutput } from "@/app/services";

import {
  PrismaUserService,
  type PrismaUserServiceDatabase,
} from "./PrismaUserService";

type UserDelegateMock = {
  findUnique: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
};

const activeUser: UserOutput = {
  id: "user_1",
  name: "Matheus",
  email: "matheus@example.com",
  phone: "11999999999",
  document: "12345678901",
  role: "USER",
  active: true,
  createdAt: new Date("2026-06-13T00:00:00.000Z"),
  updatedAt: new Date("2026-06-13T00:00:00.000Z"),
};

const inactiveUser: UserOutput = {
  ...activeUser,
  active: false,
  updatedAt: new Date("2026-06-13T01:00:00.000Z"),
};

describe("PrismaUserService", () => {
  let userDelegate: UserDelegateMock;
  let service: PrismaUserService;

  beforeEach(() => {
    userDelegate = {
      findUnique: vi.fn(),
      update: vi.fn(),
    };

    service = new PrismaUserService({
      user: userDelegate,
    } as unknown as PrismaUserServiceDatabase);
  });

  describe("findById", () => {
    it("returns the user found by id", async () => {
      userDelegate.findUnique.mockResolvedValue(activeUser);

      const result = await service.findById({ id: "user_1" });

      expect(result).toEqual(activeUser);
      expect(userDelegate.findUnique).toHaveBeenCalledWith({
        where: { id: "user_1" },
      });
    });

    it("returns null when no user is found by id", async () => {
      userDelegate.findUnique.mockResolvedValue(null);

      const result = await service.findById({ id: "missing_user" });

      expect(result).toBeNull();
      expect(userDelegate.findUnique).toHaveBeenCalledWith({
        where: { id: "missing_user" },
      });
    });

    it("propagates database errors", async () => {
      const error = new Error("database unavailable");
      userDelegate.findUnique.mockRejectedValue(error);

      await expect(service.findById({ id: "user_1" })).rejects.toThrow(error);
    });
  });

  describe("findByEmail", () => {
    it("returns the user found by email", async () => {
      userDelegate.findUnique.mockResolvedValue(activeUser);

      const result = await service.findByEmail({
        email: "matheus@example.com",
      });

      expect(result).toEqual(activeUser);
      expect(userDelegate.findUnique).toHaveBeenCalledWith({
        where: { email: "matheus@example.com" },
      });
    });

    it("returns null when no user is found by email", async () => {
      userDelegate.findUnique.mockResolvedValue(null);

      const result = await service.findByEmail({
        email: "missing@example.com",
      });

      expect(result).toBeNull();
      expect(userDelegate.findUnique).toHaveBeenCalledWith({
        where: { email: "missing@example.com" },
      });
    });

    it("propagates database errors", async () => {
      const error = new Error("database unavailable");
      userDelegate.findUnique.mockRejectedValue(error);

      await expect(
        service.findByEmail({ email: "matheus@example.com" }),
      ).rejects.toThrow(error);
    });
  });

  describe("deactivate", () => {
    it("deactivates the user without deleting it", async () => {
      userDelegate.update.mockResolvedValue(inactiveUser);

      const result = await service.deactivate({ id: "user_1" });

      expect(result).toEqual(inactiveUser);
      expect(userDelegate.update).toHaveBeenCalledWith({
        where: { id: "user_1" },
        data: { active: false },
      });
    });

    it("propagates database errors", async () => {
      const error = new Error("database unavailable");
      userDelegate.update.mockRejectedValue(error);

      await expect(service.deactivate({ id: "user_1" })).rejects.toThrow(
        error,
      );
    });
  });
});
