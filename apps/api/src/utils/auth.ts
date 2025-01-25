import { hash, verify } from "argon2";
import { generateAccessToken, generateRefreshToken } from "./token";
import crypto from "crypto";
import type { User } from "@repo/db/types";
import { users } from "@repo/db/schema";
import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import { setCookie } from "hono/cookie";
import { env } from "process";
import type { Context } from "hono";
import { HOUR_24, SECOND } from "../constants/time";

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
  | "refreshToken"
  | "refreshExpiresAt"
> {
  const user = {
    ...userData,
    password: undefined,
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
    verificationToken: undefined,
    verificationExpiresAt: undefined,
    refreshToken: undefined,
    refreshExpiresAt: undefined,
  };

  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpiresAt;
  delete user.verificationToken;
  delete user.verificationExpiresAt;
  delete user.refreshToken;
  delete user.refreshExpiresAt;

  return user;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await verify(password, hashedPassword);
}

export async function createTokenCookies(user: User, c: Context) {
  const token = generateAccessToken(user.id);
  const refreshToken = crypto.randomBytes(32).toString("hex");
  const jwtRefreshToken = generateRefreshToken(user.id, refreshToken);

  const hashedRefreshToken = await generateHash(refreshToken);

  await db
    .update(users)
    .set({
      refreshToken: hashedRefreshToken,
      refreshExpiresAt: new Date(Date.now() + HOUR_24),
    })
    .where(eq(users.id, user.id));

  setCookie(c, "token", token, {
    secure: env.NODE_ENV !== "development",
    httpOnly: true,
    expires: new Date(Date.now() + HOUR_24),
    maxAge: HOUR_24 / SECOND,
    sameSite: "lax",
  });

  setCookie(c, "refreshToken", jwtRefreshToken, {
    secure: env.NODE_ENV !== "development",
    httpOnly: true,
    expires: new Date(Date.now() + HOUR_24),
    maxAge: HOUR_24 / SECOND,
    sameSite: "lax",
  });
}
