import type { RouteLocationRaw } from 'vue-router'
import { createAuthClient } from 'better-auth/vue'
import { defu } from 'defu'

export const authClient = createAuthClient()

type SessionData = (typeof authClient)['$Infer']['Session']

/**
 * Reactive, SSR-aware authentication composable.
 *
 * - Creates a client that resolves the correct base URL and forwards request
 *   headers on the server so the first render already knows the session.
 * - Holds `session`/`user` in Nuxt `useState` so middleware, pages and
 *   components all share the same reactive state.
 * - Listens to Better Auth's `$sessionSignal` on the client so sign-in / sign-up
 *   / sign-out automatically refresh the session without manual refetching.
 * - Redirect targets are fully configurable via `runtimeConfig.public.auth`
 *   (defaults: `redirectUserTo: '/'`, `redirectGuestTo: '/auth'`).
 */
export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const client = createAuthClient({
    baseURL: url.origin,
    fetchOptions: { headers },
  })

  // Configurable redirect targets, overridable through runtimeConfig.
  const options = defu(useRuntimeConfig().public.auth, {
    redirectUserTo: '/',
    redirectGuestTo: '/auth',
  })

  const session = useState<SessionData['session'] | null>('auth:session', () => null)
  const user = useState<SessionData['user'] | null>('auth:user', () => null)
  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

  async function fetchSession() {
    if (sessionFetching.value) {
      return
    }
    sessionFetching.value = true
    const { data } = await client.getSession({ fetchOptions: { headers } })
    session.value = data?.session || null
    user.value = data?.user || null
    sessionFetching.value = false
    return data
  }

  if (import.meta.client) {
    client.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) {
        return
      }
      await fetchSession()
    })
  }

  async function signOut({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) {
    const res = await client.signOut()
    session.value = null
    user.value = null
    if (redirectTo) {
      await navigateTo(redirectTo)
    }
    return res
  }

  return {
    client,
    session,
    user,
    loggedIn: computed(() => !!session.value),
    signIn: client.signIn,
    signUp: client.signUp,
    signOut,
    options,
    fetchSession,
  }
}
