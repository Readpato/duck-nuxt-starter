import type { auth } from '#server/utils/auth'
import type getPrisma from '#server/utils/getPrisma'

/**
 * This augmentation lives in `server/` (not `shared/`) deliberately.
 *
 * Nuxt 4 splits tsconfigs via project references (tsconfig.app.json,
 * tsconfig.server.json). Placing this in `shared/` would make `prisma` and
 * `session` appear on `H3EventContext` on the app-side too, where:
 *
 * 1. `prisma` does not exist at runtime (only set by server/middleware/1.prisma.ts)
 * 2. the full PrismaClient type would bloat the app-side type graph
 *
 * Keeping it server-side-only means only the server tsconfig sees it. The
 * app-side never gets `prisma` on `H3EventContext`. The tRPC `Context` type
 * (explicitly defined in server/trpc/context.ts) carries the concrete types
 * across the app/server boundary instead.
 */
declare module 'h3' {
  interface H3EventContext {
    session: Awaited<ReturnType<typeof auth.api.getSession>> | null
    prisma: Awaited<ReturnType<typeof getPrisma>>
  }
}
