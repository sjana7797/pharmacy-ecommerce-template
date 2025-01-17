import exp from "constants";

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
  sub: AuthUser;
};

export type Session = {
  accessToken: string;
  id: string;
};
