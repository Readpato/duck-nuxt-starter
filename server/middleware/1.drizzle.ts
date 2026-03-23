export default defineEventHandler((event) => {
  event.context.drizzle = { drizzle: 'here' }
})
