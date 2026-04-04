<script setup lang="ts">
import { useGreetMutation } from '~/trpc/mutation'
import { getUserCount } from '~/trpc/query'

const title = $t('welcome')

const { data: hello } = getUserCount()

const greetName = ref('')
const { data: greetResponse, mutate: greet, isPending: isGreeting } = useGreetMutation()

function handleGreet() {
  if (greetName.value.trim().length === 0) {
    return
  }

  greet(greetName.value.trim())
}
</script>

<template>
  <main class="flex flex-col justify-center items-center w-full h-dvh text-white bg-black">
    <img src="~/assets/img/nuxt.png" alt="Nuxt logo" class="size-16" data-test="welcome-logo">
    <h1 class="text-2xl font-light" data-test="welcome-header">
      {{ title }}
    </h1>
    <DuckCounter />
    <p class="mt-2 text-sm text-white/50">
      {{ hello?.userCount }} users in database
    </p>
    <div class="flex gap-2 items-center mt-4">
      <input
        v-model="greetName"
        placeholder="Enter your name"
        class="px-3 py-1 text-sm text-white rounded border border-white/20 bg-white/10"
        @keydown.enter="handleGreet"
      >
      <button
        :disabled="isGreeting"
        class="px-3 py-1 text-sm rounded bg-white/20 hover:bg-white/30 disabled:opacity-50"
        @click="handleGreet"
      >
        Greet
      </button>
    </div>
    <p v-if="greetResponse" class="mt-2 text-sm text-green-400">
      {{ greetResponse.greeting }}
    </p>
  </main>
</template>
