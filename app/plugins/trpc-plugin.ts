import type { AppRouter } from '#server/trpc/routers'
import { isNonJsonSerializable, splitLink } from '@trpc/client'
import superjson from 'superjson'
import { createTRPCNuxtClient, httpBatchLink, httpLink } from 'trpc-nuxt/client'

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   *
   * splitLink acts as a router for outgoing requests. Before each request is
   * sent, it checks whether the input is non-JSON-serializable (e.g. FormData
   * for file uploads). Based on that check it picks one of two transport links:
   *
   * - true (non-serializable): uses httpLink, which sends each request
   *   individually. The custom transformer passes FormData through as-is on
   *   serialize (because you cannot JSON-stringify a file), while still using
   *   superjson to deserialize the server response.
   *
   * - false (normal JSON data): uses httpBatchLink, which groups multiple
   *   concurrent requests into a single HTTP call for efficiency, with superjson
   *   handling both serialization and deserialization.
   *
   * If you don't need file uploads, you can replace the entire splitLink with a
   * single httpBatchLink({ url: '/api/trpc', transformer: superjson }).
   */
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      splitLink({
        condition: op => isNonJsonSerializable(op.input),

        true: httpLink({
          url: '/api/trpc',
          transformer: {
            serialize: (data: unknown) => data,
            deserialize: superjson.deserialize,
          },
        }),

        false: httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
