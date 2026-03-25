import { users } from '#server/database/schema'
import { publicProcedure } from '#server/trpc/procedure'
import { router } from '#server/trpc/trpc'

export const appRouter = router({
  example: publicProcedure
    .query(async ({ ctx }) => {
      const userCount = await ctx.drizzle.$count(users)
      return { userCount }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
