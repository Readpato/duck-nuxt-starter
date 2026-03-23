import { createContext } from '#server/trpc/context'
import { appRouter } from '#server/trpc/routers'
import { createTRPCNuxtHandler } from 'trpc-nuxt/server'

export default createTRPCNuxtHandler({
  router: appRouter,
  createContext,
})
