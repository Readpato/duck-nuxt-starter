<script setup lang="ts">
const count = ref(0)

function decrement() {
  count.value--
}

function increment() {
  count.value++
}
</script>

<template>
  <div class="flex justify-center items-center gap-4 mt-2 text-center">
    <UButton
      color="neutral"
      icon="i-lucide-minus"
      variant="ghost"
      @click="decrement"
    />
    <span class="text-xl font-semibold">
      {{ count }}
    </span>
    <UButton
      color="neutral"
      icon="i-lucide-plus"
      variant="ghost"
      @click="increment"
    />
  </div>
</template>
