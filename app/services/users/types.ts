export type UserRole = "USER" | "ADMIN";
export type UserLockedReason = "AUTH_ATTEMPTS" | "ADMIN_BLOCK";

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  document: string | null;
  passwordHash: string | null;
  role: UserRole;
  active: boolean;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  lockedReason: UserLockedReason | null;
  profileCompletedAt: Date | null;
  deactivatedAt: Date | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FindUserByIdInput = {
  id: string;
};

export type FindUserByEmailInput = {
  email: string;
};

export type DeactivateUserInput = {
  id: string;
};
