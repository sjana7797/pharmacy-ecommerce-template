// app/services/session.server.ts
import { useSession } from "vinxi/http";
import type { Session } from "@/admin/types/providers/auth";

export function useAppSession() {
  return useSession<Session>({
    password: "ChangeThisBeforeShippingToProdOrYouWillBeFired",
  });
}
