import { SignIn } from "@repo/schema";
import { apiClient } from "../client";
import { toast } from "sonner";
import { authRoutes } from "../route";
import { Session } from "@/admin/types/providers/auth";

export async function login(data: SignIn) {
  try {
    const response = await apiClient.post<Session | null>(
      authRoutes.login,
      data,
    );
    return response.data;
  } catch (error) {
    toast.error("Error logging in");
    console.error("Error fetching categories:", error);
    return null;
  }
}
