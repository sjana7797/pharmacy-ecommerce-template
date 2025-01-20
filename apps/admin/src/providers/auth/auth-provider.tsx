import type {
  AuthStateContext,
  AuthUser,
  Session,
} from "@/admin/types/providers/auth";
import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthStateContext>({
  session: null,
  setSession: () => null,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <AuthContext.Provider value={{ setSession, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}

export default AuthProvider;
