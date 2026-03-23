import type { H3Event } from 'h3'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(event: H3Event) {
  return {
    session: event.context.session,
    drizzle: event.context.drizzle,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
