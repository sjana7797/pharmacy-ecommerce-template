export type AuthStateContext = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export type AuthUser = {
  email: string;
  id: string;
  name: string;
  phone?: string;
  age?: number;
  profileImage?: string;
  initials: string;
};

export type Session = AuthUser & {
  accessToken: string;
};
