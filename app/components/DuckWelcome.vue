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
  <main class="dark relative flex flex-col items-center justify-center w-full min-h-dvh overflow-hidden text-white bg-[#050508]">
    <div class="welcome-bg-glow absolute inset-0 pointer-events-none will-change-transform" />

    <div class="welcome-card-wrapper relative w-full max-w-95 px-4">
      <div class="welcome-card-border p-px rounded-[1.25rem]">
        <div class="flex flex-col items-center gap-4 px-8 py-10 rounded-[calc(1.25rem-1px)] bg-white/3">
          <img
            src="~/assets/img/nuxt.png"
            alt="Nuxt logo"
            class="welcome-logo size-14"
            data-test="welcome-logo"
          >

          <h1
            class="welcome-title text-2xl font-semibold tracking-tight"
            data-test="welcome-header"
          >
            {{ title }}
          </h1>

          <DuckCounter />

          <p v-if="hello?.userCount">
            {{ hello?.userCount }} users in database
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

          <Transition name="greet-reveal">
            <p
              v-if="greetResponse"
              class="text-sm text-emerald-500/90 text-center px-4 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15 w-full"
            >
              {{ greetResponse.greeting }}
            </p>
          </Transition>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.welcome-bg-glow {
  background:
    radial-gradient(ellipse 60% 50% at 50% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 30% 60%, rgba(6, 182, 212, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse 35% 25% at 70% 30%, rgba(139, 92, 246, 0.05) 0%, transparent 60%);
  animation: glow-drift 12s ease-in-out infinite alternate;
}

.welcome-card-wrapper {
  animation: card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.welcome-card-border {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.4) 0%,
    rgba(6, 182, 212, 0.2) 25%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(139, 92, 246, 0.2) 75%,
    rgba(16, 185, 129, 0.4) 100%
  );
  background-size: 300% 300%;
  animation: border-shimmer 8s linear infinite;
}

.welcome-logo {
  animation: logo-float 4s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
}

.welcome-title {
  background: linear-gradient(135deg, #fff 40%, rgba(16, 185, 129, 0.8));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-stat-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}

.greet-reveal-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.greet-reveal-leave-active {
  transition: all 0.2s ease-in;
}
.greet-reveal-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
.greet-reveal-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@keyframes card-enter {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes logo-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes border-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes glow-drift {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.02); }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
