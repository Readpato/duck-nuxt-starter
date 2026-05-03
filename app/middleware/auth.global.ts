export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)

  // Unauthenticated -> Redirects to register
  const publicRoutes = ['/auth']
  const isPublic = publicRoutes.includes(to.path)

  if (!isPublic && !session.value) {
    return navigateTo('/auth')
  }
  // Authenticated -> Redirects to index
  if (isPublic && session.value) {
    return navigateTo('/')
  }
})
