import { loginFn } from "@/admin/routes/_protected";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: async (ctx, data) => {
      await router.invalidate();
      router.navigate({ to: "/" });
      return;
    },
  });
};
