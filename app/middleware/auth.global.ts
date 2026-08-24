import { defu } from 'defu'

type MiddlewareOptions = false | {
  only?: 'guest' | 'user'
  redirectUserTo?: string
  redirectGuestTo?: string
}

declare module '#app' {
  interface PageMeta {
    auth?: MiddlewareOptions
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: MiddlewareOptions
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  // Routes opting out of auth entirely, e.g. `definePageMeta({ auth: false })`.
  if (to.meta?.auth === false) {
    return
  }

  const { loggedIn, options, fetchSession } = useAuth()
  const { only, redirectUserTo, redirectGuestTo } = defu(to.meta?.auth, options)

  // Guest-only routes (e.g. `/auth`) redirect authenticated users away.
  if (only === 'guest' && loggedIn.value) {
    if (to.path === redirectUserTo) {
      return
    }
    return navigateTo(redirectUserTo)
  }

  // Ensure the session is fresh on the client before deciding to redirect.
  if (import.meta.client) {
    await fetchSession()
  }

  if (!loggedIn.value) {
    if (to.path === redirectGuestTo) {
      return
    }
    return navigateTo(redirectGuestTo)
  }
})
