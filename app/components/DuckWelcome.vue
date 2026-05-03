<script setup lang="ts">
import { useGreetMutation } from '~/trpc/mutation'
import { getUserCount } from '~/trpc/query'

const count = shallowRef(0)
const greetName = shallowRef('')

const { data: greetResponse, mutate: greet, isPending: isGreeting } = useGreetMutation()
const { data: userCount } = getUserCount()

function handleGreet() {
  if (greetName.value.trim().length === 0) {
    return
  }

  greet(greetName.value.trim())
}
</script>

<template>
  <main class="relative flex flex-col items-center justify-center w-full min-h-dvh">
    <div class="relative w-full max-w-95 px-4">
      <div class="p-px rounded-[1.25rem]">
        <div class="flex flex-col items-center gap-4 px-8 py-10 rounded bg-white/3">
          <img
            src="~/assets/img/nuxt.png"
            alt="Nuxt logo"
            class="welcome-logo size-14"
          >

          <h1
            class="welcome-title text-2xl font-semibold tracking-tight"
            data-test="welcome-header"
          >
            Duck Nuxt Starter
          </h1>
          <div class="flex items-center gap-3 px-3 py-[0.35rem] rounded-full border border-white/8 bg-white/4 transition-[border-color] duration-300 hover:border-emerald-500/20">
            <UButton
              color="neutral"
              icon="i-lucide-minus"
              variant="ghost"
              size="xs"
              class="counter-btn"
              @click="count--"
            />
            <span class="text-lg font-semibold tabular-nums min-w-8 text-center text-white/90">
              {{ count }}
            </span>
            <UButton
              color="neutral"
              icon="i-lucide-plus"
              variant="ghost"
              size="xs"
              class="counter-btn"
              @click="count++"
            />
          </div>
          <p v-if="userCount">
            {{ userCount }} users in database
          </p>
          <p v-else>
            No users registered as of yet
          </p>

          <div class="flex items-center gap-2 w-full">
            <UInput
              v-model="greetName"
              placeholder="Your name"
              icon="i-lucide-user"
              size="md"
              class="flex-1"
              @keydown.enter="handleGreet"
            />
            <UButton
              icon="i-lucide-arrow-right"
              :loading="isGreeting"
              :disabled="isGreeting"
              color="neutral"
              variant="subtle"
              size="md"
              @click="handleGreet"
            />
          </div>

          <p
            v-if="greetResponse"
            class="text-sm text-emerald-500/90 text-center px-4 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15 w-full"
          >
            {{ greetResponse.greeting }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
