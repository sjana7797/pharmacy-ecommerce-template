import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { AuthJwtPayload, AuthUser } from "@/api/types/auth";
import { AuthService } from "../auth.service";
import { Logger } from "nestjs-pino";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
    private logger: Logger,
  ) {
    if (!jwtConfiguration.secret) {
      throw new Error("JWT_SECRET is not set");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload): Promise<AuthUser> {
    const {
      sub: { email },
    } = payload;

    const user = await this.authService.validateJwt(email);

    if (!user) {
      this.logger.error("User not found", user);
      throw new UnauthorizedException("Invalid credentials");
    }

    this.logger.log("User validated successfully", user);

    return user;
  }
}
