<script setup lang="ts">
const title = 'Duck nuxt starter'
</script>

<template>
  <main class="flex flex-col justify-center items-center w-full h-dvh text-white bg-black">
    <img class="size-12" src="~/assets/img/nuxt.png" alt="Nuxt logo" data-test="welcome-logo">
    <h1 class="text-2xl font-light" data-test="welcome-header">
      {{ title }}
    </h1>
    <DuckCounter />
  </main>
</template>
