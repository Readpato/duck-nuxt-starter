import { user } from '#server/schemas'
import { publicProcedure } from '#server/trpc/procedure'
import { router } from '#server/trpc/trpc'
import { z } from 'zod'

export const appRouter = router({
  example: publicProcedure
    .query(async ({ ctx }) => {
      const userCount = await ctx.drizzle.$count(user)
      return { userCount }
    }),
  greet: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      return { greeting: `Hello, ${input.name}! 🦆` }
    }),
})

export type AppRouter = typeof appRouter
