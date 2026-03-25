import { useQuery } from '@tanstack/vue-query'

/** Fetches the total number of users from the database. */
export function getUserCount() {
  const { $trpc } = useNuxtApp()
  return useQuery({
    queryFn: () => $trpc.example.query(),
    queryKey: ['users', 'count'],
  })
}
