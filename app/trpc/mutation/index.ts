import { useMutation } from '@tanstack/vue-query'

/** Sends a greeting mutation with the given name. */
export function useGreetMutation() {
  const { $trpc } = useMutationHelpers()

  return useMutation({
    mutationFn: (name: string) => $trpc.greet.mutate({ name }),
  })
}
