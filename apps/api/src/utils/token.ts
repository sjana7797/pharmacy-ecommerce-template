import jwt from "jsonwebtoken";
import { env } from "@/api/env";

export function generateToken(token: string) {
  return jwt.sign({ id: token }, env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "15m",
    audience: "access",
  });
}

export function generateRefreshToken(userId: string, refreshToken: string) {
  return jwt.sign({ id: userId, refreshToken }, env.JWT_SECRET, {
    expiresIn: "1d",
    audience: "refresh",
  });
}
