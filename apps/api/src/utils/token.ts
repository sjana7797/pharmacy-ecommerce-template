import jwt from "jsonwebtoken";
import { env } from "@/api/env";

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1d",
  });
}
