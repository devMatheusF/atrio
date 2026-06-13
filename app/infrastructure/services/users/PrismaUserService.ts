import type { PrismaClient } from "@/app/generated/prisma/client";
import type { UserService } from "@/app/services/users/UserService";
import type {
  DeactivateUserInput,
  FindUserByEmailInput,
  FindUserByIdInput,
  UserOutput,
} from "@/app/services/users/types";

export type PrismaUserServiceDatabase = Pick<PrismaClient, "user">;

export class PrismaUserService implements UserService {
  constructor(private readonly db: PrismaUserServiceDatabase) {}

  findById(input: FindUserByIdInput): Promise<UserOutput | null> {
    return this.db.user.findUnique({
      where: { id: input.id },
    });
  }

  findByEmail(input: FindUserByEmailInput): Promise<UserOutput | null> {
    return this.db.user.findUnique({
      where: { email: input.email },
    });
  }

  deactivate(input: DeactivateUserInput): Promise<UserOutput> {
    return this.db.user.update({
      where: { id: input.id },
      data: { active: false },
    });
  }
}
