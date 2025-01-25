import { login } from "@/admin/api/functions/auth";
import { useAuth } from "@/admin/providers/auth/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const useLogin = () => {
  // hooks
  const router = useRouter();
  const { setSession } = useAuth();
  const routeApi = getRouteApi("/auth/login");
  const { redirect } = routeApi.useSearch();

  return useMutation({
    mutationFn: login,
    onSuccess: async (ctx) => {
      setSession(ctx);
      if (!ctx) return;
      await router.invalidate();
      toast.success("Logged in successfully");
      let url: string | null = null;
      if (redirect) {
        const redirectUrl = new URL(redirect);
        url = redirectUrl.pathname;
      }
      router.navigate({ to: url ?? "/" });
    },
    onError: (err) => {
      toast.error("Login failed", {
        description: err.message,
      });
    },
  });
};
