import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SignInDto } from "~api/core/auth/auth.dto";
import { AuthUser } from "~api/types/auth";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async authenticateUser(loginPayload: SignInDto): Promise<void> {
    // const user = await this.validateUser(loginPayload);
    // if (!user) throw new UnauthorizedException("Invalid User");
    // return user;
  }

  async validateUser(loginPayload: SignInDto): Promise<void> {
    const { email, password } = loginPayload;
    if (!email || !password) throw new BadRequestException("Invalid payload");
    // check if the user exists
    // const user = await this.usersService.getCustomerByEmail(email);

    // if (!user) throw new UnauthorizedException("Invalid credentials");

    // const isUserValid = await validatePassword(password, user.password);

    // if (!isUserValid) throw new UnauthorizedException("Invalid credentials");

    // const { fullName, initials } = fullNameAndInitials({
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    // });

    // const authUser: AuthUser = {
    //   email: user.email,
    //   id: user.id,
    //   name: fullName,
    //   initials,
    // };

    // return authUser;
  }
}
