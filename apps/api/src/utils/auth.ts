import { hash, verify } from "argon2";

export async function generateHash(password: string): Promise<string> {
  return await hash(password);
}

export function getSanitizedUserData<T>(
  userData: T,
): Omit<
  T,
  | "password"
  | "resetPasswordToken"
  | "resetPasswordExpiresAt"
  | "verificationToken"
  | "verificationExpiresAt"
> {
  const user = {
    ...userData,
    password: undefined,
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
    verificationToken: undefined,
    verificationExpiresAt: undefined,
  };

  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpiresAt;
  delete user.verificationToken;
  delete user.verificationExpiresAt;

  return user;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await verify(password, hashedPassword);
}
