import { SignIn } from "@repo/common/schema";
import { toast } from "sonner";
import { Session } from "@/admin/types/providers/auth";
import { AxiosError } from "axios";
import { apiClient } from "@/admin/server/client";
import { authRoutes } from "./route";

export async function login(data: SignIn) {
  try {
    const response = await apiClient.post<Session | null>(
      authRoutes.login,
      data,
    );
    return response.data;
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof AxiosError)
      message = error.response?.data?.message ?? message;
    else if (error instanceof Error) message = error.message;
    toast.error("Error logging in", {
      description: message,
    });
    console.error("Error fetching categories:", error);
    return null;
  }
}
