import { PrismaHealthService } from "@/app/infrastructure/services/health/PrismaHealthService";
import { PrismaUserService } from "@/app/infrastructure/services/users/PrismaUserService";
import { prisma } from "@/app/lib/prisma";

import type { HealthService } from "./health/HealthService";
import type { UserService } from "./users/UserService";

class ServiceFactory {
  private healthService?: HealthService;
  private userService?: UserService;

  get health(): HealthService {
    this.healthService ??= new PrismaHealthService(prisma);
    return this.healthService;
  }

  get users(): UserService {
    this.userService ??= new PrismaUserService(prisma);
    return this.userService;
  }
}

export const services = new ServiceFactory();
