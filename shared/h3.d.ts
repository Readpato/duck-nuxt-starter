/**
 * Nuxt 4 splits tsconfigs via project references (tsconfig.app.json,
 * tsconfig.server.json, etc.). Module augmentations declared inside server/
 * are invisible to the app tsconfig, so H3EventContext properties silently
 * degrade to `any` (via Record<string, any>). Placing the augmentation in
 * shared/ makes it visible to both contexts.
 *
 * @see https://nuxt.com/docs/guide/concepts/typescript#augmenting-types-with-project-references
 */
import type { getAuth } from '#server/utils/auth'

declare module 'h3' {
  interface H3EventContext {
    session: Awaited<ReturnType<typeof getAuth.api.getSession>> | null
  }
}
