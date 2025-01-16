import { buildSchema } from "drizzle-graphql";
import { drizzle } from "drizzle-orm/node-postgres";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema as dbSchema } from "@repo/db";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle({ client: pool, schema: dbSchema });

const { schema } = buildSchema(db);
const server = new ApolloServer({ schema });

async function serve() {
  const { url } = await startStandaloneServer(server);

  console.log(`🚀 Server ready at ${url}`);
}

serve();
