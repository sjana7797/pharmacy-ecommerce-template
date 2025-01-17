import { registerAs } from "@nestjs/config";
import type { JwtModuleOptions } from "@nestjs/jwt";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const jwtConfig = registerAs(
  "jwt",
  (): JwtModuleOptions => ({
    secret: JWT_SECRET,
    signOptions: { expiresIn: JWT_EXPIRES_IN ?? "1d" },
  }),
);

export default jwtConfig;
