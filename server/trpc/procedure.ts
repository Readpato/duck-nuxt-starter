import { middleware, t } from '#server/trpc/trpc'
import { TRPCError } from '@trpc/server'

const enforceAuth = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({ ctx: { ...ctx, session: ctx.session } })
})

export const publicProcedure = t.procedure
export const protectedProcedure = publicProcedure.use(enforceAuth)
