import { useQuery } from '@tanstack/vue-query'

export function getGreeting(greeting: string) {
  const { $trpc } = useNuxtApp()
  return useQuery({
    queryFn: () => $trpc.hello.query({ text: greeting }),
    queryKey: ['user', 'getCount'],
  })
}
