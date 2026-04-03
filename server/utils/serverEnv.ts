import { z } from 'zod'

const serverEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
  DATABASE_URL: z.string().min(1),
})

/** Validated server environment variables. Fails fast at startup if invalid. */
export const serverEnv = serverEnvSchema.parse(process.env)
