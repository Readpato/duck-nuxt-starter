import type { H3Event } from 'h3'
import type { PrismaClient } from '~~/prisma/client/client'
import type { auth } from '#server/utils/auth'

/**
 * tRPC context, derived from the H3Event.
 *
 * Explicitly typed (rather than inferred from `createContext`'s return) so
 * that the `Context` type is concrete and self-contained when it flows
 * through `AppRouter` to the app-side. This avoids the app tsconfig needing
 * to see the server-only `H3EventContext` augmentation in
 * `server/types/h3.d.ts`.
 *
 * @link https://trpc.io/docs/context
 */
export interface Context {
  prisma: PrismaClient
  session: Awaited<ReturnType<typeof auth.api.getSession>> | null
}

export function createContext(_event: H3Event): Context {
  return {
    prisma: _event.context.prisma,
    session: _event.context.session,
  }
}
