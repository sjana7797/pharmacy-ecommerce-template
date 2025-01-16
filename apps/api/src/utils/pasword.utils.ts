import { InternalServerErrorException } from '@nestjs/common';
import { verify } from 'argon2';

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const secret = process.env.AUTH_SECRET;

  if (!secret) throw new InternalServerErrorException('Secret not found');

  const isPasswordValid = verify(hashedPassword, password);

  return isPasswordValid;
}
