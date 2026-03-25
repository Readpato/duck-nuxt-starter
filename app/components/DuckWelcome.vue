<script setup lang="ts">
import { getUserCount } from '~/trpc/query'

const title = $t('welcome')

const { data: hello } = getUserCount()
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
  </main>
</template>
