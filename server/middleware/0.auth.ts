export default defineEventHandler(async (event) => {
  const session = await getAuth.api.getSession({
    headers: event.headers,
  })
  event.context.session = session
})
