import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../database/schema'

export type DrizzleInstance = PostgresJsDatabase<typeof schema>

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const client = postgres(process.env.DATABASE_URL)
const db = drizzle({ client, schema })

/** Returns the Drizzle database instance. */
export default (): DrizzleInstance => db
