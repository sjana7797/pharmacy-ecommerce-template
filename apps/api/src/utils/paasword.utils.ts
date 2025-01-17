import { verify, hash } from "argon2";

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isPasswordValid = verify(hashedPassword, password);

  return isPasswordValid;
}

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password);

  return hashedPassword;
}
