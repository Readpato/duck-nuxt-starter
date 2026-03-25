export default defineEventHandler((event) => {
  event.context.drizzle = getDrizzle()
})
