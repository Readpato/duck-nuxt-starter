export default defineEventHandler((event) => {
  event.context.session = { session: 'this is a session' }
})
