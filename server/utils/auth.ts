import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import getPrisma from './getPrisma'

export const auth = betterAuth({
  database: prismaAdapter(getPrisma(), {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
})
