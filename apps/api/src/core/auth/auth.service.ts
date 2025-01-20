import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CustomerRegisterDto, SignInDto } from "./auth.dto";
import { DrizzleAsyncProvider } from "@/api/drizzle/drizzle.constants";
import { Database } from "@/api/types";
import { CustomersService } from "../customers/customers.service";
import { hashPassword, validatePassword } from "@/api/utils/paasword.utils";
import { AuthJwtPayload, Session, AuthUser } from "@/api/types/auth";
import { fullNameAndInitials } from "@/api/utils/name";
import { JwtService } from "@nestjs/jwt";
import { Logger } from "nestjs-pino";

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: Database,
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async authenticateCustomer(loginPayload: SignInDto): Promise<AuthUser> {
    const customer = await this.validateUser(loginPayload);

    if (!customer) throw new UnauthorizedException("Invalid User");

    return customer;
  }

  async validateUser(loginPayload: SignInDto): Promise<AuthUser | null> {
    const { email, password } = loginPayload;
    if (!email || !password) throw new BadRequestException("Invalid payload");
    // check if the user exists
    const user = await this.customersService.getCustomerByEmail(email);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isUserValid = await validatePassword(password, user.password);

    if (!isUserValid) throw new UnauthorizedException("Invalid credentials");

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

  async registerCustomer(user: CustomerRegisterDto): Promise<AuthUser> {
    const { password, firstName, lastName, email, phone, age } = user;

    if (!password || !firstName || !lastName || !email || !phone || !age) {
      throw new BadRequestException("Missing required fields");
    }

    this.logger.log("Registering customer");

    // check if the email is already registered
    const existingCustomer =
      await this.customersService.getCustomerByEmail(email);

    if (existingCustomer) {
      this.logger.error(`User with email:${email} already exists`);
      throw new UnauthorizedException("Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    this.logger.log("Password hashed");

    const customer = await this.customersService.createCustomer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      phone,
    });

    this.logger.log("Customer created successfully with id :", customer.id);

    const { fullName, initials } = fullNameAndInitials({
      firstName,
      lastName,
    });

    const authUser: AuthUser = {
      email,
      id: customer.id,
      name: fullName,
      initials,
      age,
      phone,
    };

    return authUser;
  }

  async login(user: AuthUser): Promise<Session> {
    const { accessToken } = await this.generateTokens(user);

    return {
      ...user,
      accessToken,
    };
  }

  async generateTokens(user: AuthUser) {
    const payload: AuthJwtPayload = {
      sub: {
        id: user.id,
        email: user.email,
      },
    };

    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);

    return {
      accessToken,
    };
  }

  async validateJwt(email: string): Promise<AuthUser | null> {
    const user = await this.customersService.getCustomerByEmail(email);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const { fullName, initials } = fullNameAndInitials({
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const authUser: AuthUser = {
      email,
      id: user.id,
      initials,
      name: fullName,
      age: user?.age,
      phone: user?.phone,
    };

    return authUser;
  }
}
