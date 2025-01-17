import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CustomerRegisterDto, SignInDto } from "./auth.dto";
import { ZodValidationPipe } from "nestjs-zod";
import { AuthUser } from "~api/types/auth";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @UsePipes(ZodValidationPipe)
  async signIn(@Request() request): Promise<AuthUser> {
    return this.authService.login(request.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/logout")
  async logout(@Request() req) {
    return req.logout();
  }

  @Post("register")
  @UsePipes(ZodValidationPipe)
  async register(
    @Body() registerPayload: CustomerRegisterDto,
  ): Promise<AuthUser> {
    return await this.authService.registerCustomer(registerPayload);
  }

  @Post("admin/login")
  @UsePipes(ZodValidationPipe)
  async adminLogin(@Body() loginPayload: SignInDto): Promise<AuthUser> {
    return await this.authService.authenticateUser(loginPayload);
  }

  @Post("admin/register")
  @UsePipes(ZodValidationPipe)
  async adminRegister(@Body() loginPayload: SignInDto): Promise<AuthUser> {
    return await this.authService.authenticateUser(loginPayload);
  }
}
