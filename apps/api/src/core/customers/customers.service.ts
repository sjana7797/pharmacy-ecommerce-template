import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Customer, schema } from '@repo/db';
import { eq } from 'drizzle-orm';
import { DrizzleAsyncProvider } from '~api/drizzle/drizzle.constants';
import type { Database } from '~api/types';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: Database,
  ) {}

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    const customers = await this.db
      .select()
      .from(schema.customers)
      .where(eq(schema.customers.email, email))
      .limit(1);

    if (!customers.length) {
      throw new NotFoundException(`Customer with email : ${email} not found`);
    }

    return customers[0];
  }
}