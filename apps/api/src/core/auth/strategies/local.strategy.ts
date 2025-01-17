import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthUser } from "~api/types/auth";
import { Logger } from "nestjs-pino";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private logger: Logger,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    this.logger.log({ email, password });
    const user = await this.authService.validateUser({
      email,
      password,
    });

    if (!user) {
      this.logger.error("Invalid credentials", user);
      throw new UnauthorizedException("Invalid credentials");
    }

    this.logger.log("User validated successfully", user);

    return user;
  }
}
