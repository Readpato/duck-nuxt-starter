<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div
    aria-label="counter"
    class="flex justify-center items-center space-x-3 mt-2 text-center"
  >
    <button aria-label="increment-counter" class="w-8 h-8 border border-green border-2 rounded hover:bg-white hover:text-black transition-all ease-in-out duration-400" @click="count--">
      -
    </button>
    <span aria-label="counter-value" class="min-w-5">{{ count }}</span>
    <button
      aria-label="decrement-counter"
      class="w-8 h-8 border border-green border-2 rounded hover:bg-white hover:text-black transition-all ease-in-out duration-400" @click="count++"
    >
      +
    </button>
  </div>
</template>

<style scoped>

</style>
