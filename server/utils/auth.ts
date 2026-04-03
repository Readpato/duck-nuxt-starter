import { getDrizzle } from '#server/utils/getDrizzle'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const getAuth = betterAuth({
  database: drizzleAdapter(getDrizzle(), {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true
  }
})
