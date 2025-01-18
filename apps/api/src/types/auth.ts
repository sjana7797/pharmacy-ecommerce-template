export type AuthUser = {
  email: string;
  id: string;
  name: string;
  phone?: string;
  age?: number;
  profileImage?: string;
  initials: string;
};

export type AuthJwtPayload = {
  sub: Pick<AuthUser, "id" | "email">;
};

export type Session = {
  accessToken: string;
  id: string;
};
