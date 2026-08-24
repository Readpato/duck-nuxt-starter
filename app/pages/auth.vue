<script setup lang="ts">
definePageMeta({ auth: { only: 'guest' } })
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 min-h-dvh">
    <AuthForm />
  </div>
</template>
