<script setup lang="ts">
const title = $t('welcome')

const { $trpc } = useNuxtApp()

const { data: hello } = await $trpc.hello.useQuery({ text: 'client' })
</script>

<template>
  <main class="flex flex-col justify-center items-center w-full h-dvh text-white bg-black">
    <img src="~/assets/img/nuxt.png" alt="Nuxt logo" class="size-16" data-test="welcome-logo">
    <h1 class="text-2xl font-light" data-test="welcome-header">
      {{ title }}
    </h1>
    <DuckCounter />
    {{ hello?.greeting }}
  </main>
</template>
