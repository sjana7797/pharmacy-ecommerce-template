import type {
  AuthStateContext,
  AuthUser,
  Session,
} from "@/admin/types/providers/auth";
import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthStateContext>({
  user: null,
  accessToken: null,
  setSession: () => null,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setSession = (session: Session | null) => {
    if (!session) {
      setAccessToken(null);
      setUser(null);
      return;
    }

    setAccessToken(session.accessToken);
    setUser({
      ...session,
    });
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, setSession }}>
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
