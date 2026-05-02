export default eventHandler((event) => {
  event.context.prisma = getPrisma()
})
