import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './auth.dto';
import { DrizzleAsyncProvider } from '~api/drizzle/drizzle.constants';
import { Database } from '~api/types';
import { CustomersService } from '../customers/customers.service';
import { validatePassword } from '~api/utils/pasword.utils';
import { AuthUser } from '~api/types/auth';
import { fullNameAndInitials } from '~api/utils/name';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: Database,
    private readonly customersService: CustomersService,
  ) {}

  async authenticateCustomer(loginPayload: SignInDto): Promise<AuthUser> {
    const customer = await this.validateUser(loginPayload, 'customer');

    if (!customer) throw new UnauthorizedException('Invalid User');

    return customer;
  }

  async authenticateUser(loginPayload: SignInDto): Promise<AuthUser> {
    const user = await this.validateUser(loginPayload, 'user');

    if (!user) throw new UnauthorizedException('Invalid User');

    return user;
  }

  async validateUser(
    loginPayload: SignInDto,
    type: 'customer' | 'user',
  ): Promise<AuthUser | null> {
    const { email, password } = loginPayload;
    if (!email || !password) throw new BadRequestException('Invalid payload');
    // check if the user exists
    let user;

    if (type === 'customer')
      user = await this.customersService.getCustomerByEmail(email);
    else user = null;

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isUserValid = await validatePassword(password, user.password);

    if (!isUserValid) throw new UnauthorizedException('Invalid credentials');

    const { fullName, initials } = fullNameAndInitials({
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const authUser: AuthUser = {
      email: user.email,
      id: user.id,
      name: fullName,
      initials,
    };

    return authUser;
  }
}
