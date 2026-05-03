import { publicProcedure } from '#server/trpc/procedure'
import { router } from '#server/trpc/trpc'
import { z } from 'zod'

export const appRouter = router({
  getUserCount: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.user.count()
    }),
  greet: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      return { greeting: `Hello, ${input.name}! 🦆` }
    }),
})

export type AppRouter = typeof appRouter
