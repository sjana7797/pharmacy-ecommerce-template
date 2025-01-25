import { Hono } from "hono";
import { authRoutes } from "@repo/common/api";
import * as authController from "@/api/controllers/auth";

const authRoute = new Hono();

// Login a user
authRoute.post(authRoutes.login, ...authController.login);

// Register a new user
authRoute.post(authRoutes.register, ...authController.register);

// Logout a user
authRoute.post(authRoutes.logout, ...authController.logout);

/**
 * Verify email
 * @param userId
 * @param verificationToken
 * @returns {Promise<void>}
 */
authRoute.post(authRoutes.verifyEmail, ...authController.verifyEmail);

// Forgot password
authRoute.post(authRoutes.forgotPassword, ...authController.forgotPassword);

// reset password
authRoute.post(authRoutes.resetPassword, ...authController.resetPassword);

// verify auth
authRoute.get(authRoutes.verifyUser, ...authController.verifyUser);

// update user
authRoute.patch("/", ...authController.update);

export default authRoute;
