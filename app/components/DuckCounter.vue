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
  <div class="flex items-center gap-3 px-3 py-[0.35rem] rounded-full border border-white/8 bg-white/4 transition-[border-color] duration-300 hover:border-emerald-500/20">
    <UButton
      color="neutral"
      icon="i-lucide-minus"
      variant="ghost"
      size="xs"
      class="counter-btn"
      @click="decrement"
    />
    <span class="text-lg font-semibold tabular-nums min-w-8 text-center text-white/90 transition-transform duration-150">
      {{ count }}
    </span>
    <UButton
      color="neutral"
      icon="i-lucide-plus"
      variant="ghost"
      size="xs"
      class="counter-btn"
      @click="increment"
    />
  </div>
</template>

<style scoped>
.counter-btn:active + span {
  transform: scale(1.1);
}
</style>
