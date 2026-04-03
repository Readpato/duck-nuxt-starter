import { user } from '#server/schemas'
import { publicProcedure } from '#server/trpc/procedure'
import { router } from '#server/trpc/trpc'

export const appRouter = router({
  example: publicProcedure
    .query(async ({ ctx }) => {
      const userCount = await ctx.drizzle.$count(user)
      return { userCount }
    }),
})

export type AppRouter = typeof appRouter
