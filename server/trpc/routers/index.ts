import { publicProcedure } from '#server/trpc/procedure'
import { router } from '#server/trpc/trpc'
import { z } from 'zod'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({ text: z.string() }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
