import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { serverEnv } from '#server/utils/serverEnv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../schemas'

export type DrizzleInstance = PostgresJsDatabase<typeof schema>

const client = postgres(serverEnv.DATABASE_URL)
const db = drizzle({ client, schema })

/** Returns the Drizzle database instance. */
export const getDrizzle = (): DrizzleInstance => db
