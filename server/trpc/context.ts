import type { H3Event } from 'h3'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(event: H3Event) {
  return {
    drizzle: getDrizzle(),
    session: event.context.session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
