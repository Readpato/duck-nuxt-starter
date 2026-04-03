export default defineEventHandler((event) => {
  return getAuth.handler(toWebRequest(event))
})
