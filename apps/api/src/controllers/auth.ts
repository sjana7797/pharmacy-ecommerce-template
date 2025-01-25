import { zValidator } from "@hono/zod-validator";
import {
  registerUserSchema,
  signInSchema,
  verifyEmailSchema,
} from "@repo/common/schema";
import { db } from "@repo/db";
import { users } from "@repo/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { createFactory } from "hono/factory";
import {
  comparePassword,
  createTokenCookies,
  generateHash,
  getSanitizedUserData,
} from "@/api/utils/auth";
import { generateToken } from "@/api/utils/token";
import { getCookie, setCookie } from "hono/cookie";
import { env } from "../env";
import { removeUndefined } from "@repo/common/utils";
import { HTTPException } from "hono/http-exception";
import { HOUR, HOUR_24 } from "../constants/time";
import { z } from "zod";
import crypto from "crypto";
import { checkUserPermission, verifyToken } from "../middlewares/auth";

const factory = createFactory();

export const login = factory.createHandlers(
  zValidator("json", signInSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");
    try {
      // get the user from the database
      const userData = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!userData.length) {
        return c.json({ message: "Invalid email or password" }, 401);
      }

      const user = userData[0];

      const isPasswordMatch = await comparePassword(user.password, password);

      if (!isPasswordMatch) {
        return c.json({ message: "Invalid email or password" }, 401);
      }

      await db
        .update(users)
        .set({
          lastLogin: new Date(),
        })
        .where(eq(users.id, user.id));

      await createTokenCookies(user, c);

      const sanitizedUserData = getSanitizedUserData(user);

      return c.json({
        message: "User logged in successfully",
        user: sanitizedUserData,
      });
    } catch (error) {
      console.error("Error while logging in user", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  },
);

export const register = factory.createHandlers(
  zValidator("json", registerUserSchema),
  async (c) => {
    const body = c.req.valid("json");

    try {
      // check if the user is admin
      const usersData = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email))
        .limit(1);

      if (usersData.length) {
        return c.json(
          { message: `User already exists with email ${body.email}` },
          400,
        );
      }
      // get the user from the database
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email));

      //   check if the user exists
      if (user.length) {
        return c.json({ message: "User already exists" }, 400);
      }

      //   create the user
      //   create hash for password
      const hashedPassword = await generateHash(body.password);

      const verificationToken = Math.floor(
        10_00_000 + Math.random() * 90_00_000,
      ).toString();

      const hashedVerificationToken = await generateHash(verificationToken);

      const parsedBody = removeUndefined(body);

      const userData = await db
        .insert(users)
        .values({
          ...parsedBody,
          password: hashedPassword,
          verificationToken: hashedVerificationToken,
          verificationExpiresAt: new Date(Date.now() + HOUR_24),
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          age: body.age,
        })
        .returning();

      if (!userData.length) {
        throw new HTTPException(500, {
          message: "User could not be created",
          res: c.res,
        });
      }

      await createTokenCookies(userData[0], c);

      const sanitizedUserData = getSanitizedUserData(userData[0]);

      void fetch(
        `http://localhost:5001/email/customer/welcome?email=${body.email}&verificationToken=${verificationToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return c.json({
        message: "User created successfully",
        user: sanitizedUserData,
      });
    } catch (error) {
      console.error("Error while signing up user", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  },
);

export const logout = factory.createHandlers(verifyToken, async (c) => {
  const token = getCookie(c, "token");

  if (token) {
    setCookie(c, "token", "", {
      secure: env.NODE_ENV !== "development",
      httpOnly: true,
    });

    setCookie(c, "refreshToken", "", {
      secure: env.NODE_ENV !== "development",
      httpOnly: true,
    });

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, c.var.userId))
      .execute();

    if (!user.length) {
      return c.json({ message: "Invalid user" }, 401);
    }

    await db
      .update(users)
      .set({
        refreshToken: null,
        refreshExpiresAt: null,
      })
      .where(eq(users.id, c.var.userId));
  }

  return c.json({ message: "User logged out successfully" });
});

export const verifyEmail = factory.createHandlers(
  zValidator("json", verifyEmailSchema),
  async (c) => {
    const { userId, verificationToken } = c.req.valid("json");

    const userData = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .execute();

    if (!userData.length) {
      return c.json({ message: "Invalid user" }, 401);
    }

    const user = userData[0];

    if (!user.verificationToken || !user.verificationExpiresAt) {
      return c.json({ message: "User not verified" }, 401);
    }

    const isTokenMatch = await comparePassword(
      verificationToken,
      user.verificationToken,
    );

    if (isTokenMatch || user.verificationExpiresAt < new Date()) {
      return c.json({ message: "Invalid verification token" }, 401);
    }

    // update the user
    await db
      .update(users)
      .set({
        isVerified: true,
        verificationToken: null,
        verificationExpiresAt: null,
      })
      .where(eq(users.id, userId))
      .returning();

    return c.json({ message: "Email verified successfully" });
  },
);

export const forgotPassword = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      email: z.string().email(),
    }),
  ),
  async (c) => {
    const { email } = c.req.valid("json");

    try {
      // get the user from the database
      const userData = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!userData.length) {
        return c.json({ message: "Invalid email" }, 401);
      }
      const user = userData[0];

      // generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpireAt = new Date(Date.now() + HOUR);

      const hashedResetToken = await generateHash(resetToken);

      await db
        .update(users)
        .set({
          resetPasswordToken: hashedResetToken,
          resetPasswordExpiresAt: resetTokenExpireAt,
        })
        .where(eq(users.id, user.id));
    } catch (error) {
      console.error("Error while sending forgot password email", error);

      return c.json({ message: "Internal server error" }, 500);
    }
  },
);

export const resetPassword = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      email: z.string().email(),
      resetToken: z.string(),
      password: z.string(),
    }),
  ),
  async (c) => {
    const { email, resetToken, password } = c.req.valid("json");

    try {
      // get the user from the database
      const userData = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.email, email),
            gt(users.resetPasswordExpiresAt, new Date()),
          ),
        );

      if (!userData.length) {
        return c.json({ message: "Invalid email" }, 401);
      }

      const user = userData[0];

      if (!user.resetPasswordToken || !user.resetPasswordExpiresAt) {
        return c.json({ message: "Invalid reset token" }, 401);
      }

      const isTokenMatch = await comparePassword(
        resetToken,
        user.resetPasswordToken,
      );

      if (!isTokenMatch || user.resetPasswordExpiresAt < new Date()) {
        return c.json({ message: "Invalid reset token" }, 401);
      }

      // update the user
      await db
        .update(users)
        .set({
          password: await generateHash(password),
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        })
        .where(eq(users.id, user.id))
        .returning();

      return c.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error while resetting password", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  },
);

export const verifyUser = factory.createHandlers(verifyToken, async (c) => {
  const userId = c.var.userId;

  if (!userId) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  try {
    const userRow = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .execute();

    if (!userRow.length) {
      return c.json({ message: "Invalid user" }, 401);
    }

    return c.json({ message: "User verified successfully", userId });
  } catch (error) {
    console.error("Error while verifying user", error);

    return c.json({ message: "Internal server error" }, 500);
  }
});

export const update = factory.createHandlers(
  verifyToken,
  checkUserPermission("update"),
  zValidator("json", registerUserSchema.partial()),
  async (c) => {},
);
