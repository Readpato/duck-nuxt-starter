export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)

  // Unauthenticated -> Redirects to register
  const publicRoutes = ['/register']
  const isPublic = publicRoutes.includes(to.path)

  if (!isPublic && !session.value) {
    return navigateTo('/register')
  }
  // Authenticated -> Redirects to index
  if (isPublic && session.value) {
    return navigateTo('/')
  }
})
