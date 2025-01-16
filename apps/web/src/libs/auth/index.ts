import { Session } from "@/web/types/libs/auth";
import { jwtVerify, SignJWT } from "jose";
import { cookies as cookiesProvider } from "next/headers";
import { redirect } from "next/navigation";

const secret = process.env.SESSION_SECRET!;
const encodedSecret = new TextEncoder().encode(secret);

export async function createSession(payload: Session) {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);

  const cookies = await cookiesProvider();

  cookies.set("session", session, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    expires: expireAt,
  });
}

export async function getSession() {
  try {
    const cookies = await cookiesProvider();
    const session = cookies.get("session")?.value;

    if (!session) {
      throw new Error("No session cookie found");
    }
    const { payload } = await jwtVerify(session, encodedSecret, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.error("Error getting session", error);
    redirect("/auth/signin");
  }
}
