import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthUser } from '~api/types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ZodValidationPipe)
  async signIn(@Body() loginPayload: SignInDto): Promise<AuthUser> {
    return await this.authService.authenticateCustomer(loginPayload);
  }

  @Post('admin/login')
  @UsePipes(ZodValidationPipe)
  async adminLogin(@Body() loginPayload: SignInDto): Promise<AuthUser> {
    return await this.authService.authenticateUser(loginPayload);
  }
}
