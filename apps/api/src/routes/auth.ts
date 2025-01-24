import { zValidator } from "@hono/zod-validator";
import {
  registerUserSchema,
  signInSchema,
  registerCustomerSchema,
} from "@repo/common/schema";
import { db } from "@repo/db";
import { customers, users } from "@repo/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { Hono } from "hono";
import {
  comparePassword,
  generateHash,
  getSanitizedUserData,
} from "../utils/auth";
import { HOUR, HOUR_24 } from "../constants/time";
import { generateToken } from "../utils/token";
import { HTTPException } from "hono/http-exception";
import { removeUndefined } from "@repo/common/utils";
import { z } from "zod";
import { authRoutes } from "../constants/routes";
import crypto from "crypto";
import { getCookie, setCookie } from "hono/cookie";
import { env } from "../env";
import { verifyToken } from "../middlewares/auth";

const authRoute = new Hono();

// Login a user
authRoute.post(
  authRoutes.login,
  zValidator("json", signInSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");
    try {
      // get the user from the database
      const userData = await db
        .select()
        .from(customers)
        .where(eq(customers.email, email));

      if (!userData.length) {
        return c.json({ message: "Invalid email or password" }, 401);
      }

      const user = userData[0];

      const isPasswordMatch = await comparePassword(user.password, password);

      if (!isPasswordMatch) {
        return c.json({ message: "Invalid email or password" }, 401);
      }

      await db
        .update(customers)
        .set({
          lastLogin: new Date(),
        })
        .where(eq(customers.id, user.id));

      const token = generateToken(user.id);

      setCookie(c, "token", token, {
        secure: env.NODE_ENV !== "development",
        httpOnly: true,
      });

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

// Register a new user
authRoute.post(
  authRoutes.register,
  zValidator("json", registerCustomerSchema),
  async (c) => {
    const body = c.req.valid("json");

    try {
      // get the user from the database
      const user = await db
        .select()
        .from(customers)
        .where(eq(customers.email, body.email));

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
        .insert(customers)
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

      const token = generateToken(userData[0].id);
      setCookie(c, "token", token, {
        secure: env.NODE_ENV !== "development",
        httpOnly: true,
      });

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

// Logout a user
authRoute.post(authRoutes.logout, async (c) => {
  const token = getCookie(c, "token");

  if (token) {
    setCookie(c, "token", "", {
      secure: env.NODE_ENV !== "development",
      httpOnly: true,
    });
  }

  return c.json({ message: "User logged out successfully" });
});

/**
 * Verify email
 * @param userId
 * @param verificationToken
 * @returns {Promise<void>}
 */
authRoute.post(
  authRoutes.verifyEmail,
  zValidator(
    "json",
    z.object({
      userId: z.string().uuid(),
      verificationToken: z.string(),
    }),
  ),
  async (c) => {
    const { userId, verificationToken } = c.req.valid("json");

    const userData = await db
      .select()
      .from(customers)
      .where(eq(customers.id, userId))
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
      .update(customers)
      .set({
        isVerified: true,
        verificationToken: null,
        verificationExpiresAt: null,
      })
      .where(eq(customers.id, userId))
      .returning();

    return c.json({ message: "Email verified successfully" });
  },
);

// Forgot password
authRoute.post(
  authRoutes.forgotPassword,
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
        .from(customers)
        .where(eq(customers.email, email));

      if (!userData.length) {
        return c.json({ message: "Invalid email" }, 401);
      }
      const user = userData[0];

      // generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpireAt = new Date(Date.now() + HOUR);

      const hashedResetToken = await generateHash(resetToken);

      await db
        .update(customers)
        .set({
          resetPasswordToken: hashedResetToken,
          resetPasswordExpiresAt: resetTokenExpireAt,
        })
        .where(eq(customers.id, user.id));
    } catch (error) {
      console.error("Error while sending forgot password email", error);

      return c.json({ message: "Internal server error" }, 500);
    }
  },
);

// reset password
authRoute.post(
  authRoutes.resetPassword,
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
        .from(customers)
        .where(
          and(
            eq(customers.email, email),
            gt(customers.resetPasswordExpiresAt, new Date()),
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
        .update(customers)
        .set({
          password: await generateHash(password),
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        })
        .where(eq(customers.id, user.id))
        .returning();

      return c.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error while resetting password", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  },
);

// verify auth
authRoute.get(authRoutes.verifyUser, verifyToken, async (c) => {
  const userId = c.var.userId;

  if (!userId) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  try {
    const userRow = await db
      .select()
      .from(customers)
      .where(eq(customers.id, userId))
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

export default authRoute;
