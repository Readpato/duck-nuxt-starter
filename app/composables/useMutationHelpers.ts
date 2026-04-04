export function useMutationHelpers() {
  const { $trpc } = useNuxtApp()

  return {
    $trpc,
  }
}
