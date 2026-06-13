export type UserRole = "USER" | "ADMIN";

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  document: string | null;
  role: UserRole;
  active: boolean;
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
