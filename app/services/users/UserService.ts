import type {
  DeactivateUserInput,
  FindUserByEmailInput,
  FindUserByIdInput,
  UserOutput,
} from "./types";

export interface UserService {
  findById(input: FindUserByIdInput): Promise<UserOutput | null>;
  findByEmail(input: FindUserByEmailInput): Promise<UserOutput | null>;
  deactivate(input: DeactivateUserInput): Promise<UserOutput>;
}
