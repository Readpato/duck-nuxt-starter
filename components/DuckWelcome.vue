<script setup lang="ts">
const title = 'Duck nuxt starter'
</script>

<template>
  <main class="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
    <img src="@/assets/nuxt-logo.svg" alt="Nuxt logo">
    <h1 class="font-light text-2xl mt-2">
      {{ title }}
    </h1>
    <DuckCounter />
  </main>
</template>
