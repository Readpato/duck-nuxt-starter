<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSignUp() {
  error.value = ''
  loading.value = true

  const { error: signUpError } = await authClient.signUp.email({
    name: name.value,
    email: email.value,
    password: password.value,
  })

  if (signUpError) {
    error.value = signUpError.message ?? 'Something went wrong'
    loading.value = false
    return
  }

  navigateTo('/')
}
</script>

<template>
  <main class="dark relative flex min-h-dvh items-center justify-center overflow-hidden text-white bg-[#050508] p-4">
    <div class="register-bg-glow absolute inset-0 pointer-events-none will-change-transform" />

    <div class="register-card-wrapper relative w-full max-w-105">
      <div class="register-card-border p-px rounded-[1.25rem] w-full">
        <div class="flex flex-col gap-6 w-full px-8 py-10 rounded-[calc(1.25rem-1px)] bg-white/3">
          <div class="flex flex-col items-center gap-2 w-full">
            <div class="register-icon-ring flex items-center justify-center size-12 rounded-full border border-emerald-500/20 bg-emerald-500/8">
              <UIcon name="i-lucide-user-plus" class="size-5 text-emerald-400" />
            </div>
            <h1 class="register-title text-2xl font-semibold tracking-tight">
              Create an Account
            </h1>
            <p class="text-sm text-white/40">
              Get started with your new account
            </p>
          </div>

          <UForm class="flex flex-col gap-4" @submit.prevent="handleSignUp">
            <UFormField label="Name" required>
              <UInput
                v-model="name"
                type="text"
                placeholder="Your name"
                icon="i-lucide-user"
                size="md"
                required
                class="w-full"
              />
            </UFormField>

            <UFormField label="Email" required>
              <UInput
                v-model="email"
                type="email"
                placeholder="you@example.com"
                icon="i-lucide-mail"
                size="md"
                required
                class="w-full"
              />
            </UFormField>

            <UFormField label="Password" required>
              <UInput
                v-model="password"
                type="password"
                placeholder="At least 8 characters"
                icon="i-lucide-lock"
                size="md"
                required
                class="w-full"
              />
            </UFormField>

            <UButton
              type="submit"
              block
              size="md"
              :loading="loading"
              :trailing="false"
              class="mt-2"
            >
              {{ loading ? "Creating account..." : "Sign Up" }}
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.register-bg-glow {
  background:
    radial-gradient(ellipse 50% 40% at 50% 45%, rgba(16, 185, 129, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 35% 25% at 65% 30%, rgba(6, 182, 212, 0.05) 0%, transparent 60%);
  animation: glow-drift 12s ease-in-out infinite alternate;
}

.register-card-wrapper {
  animation: card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.register-card-border {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.3) 0%,
    rgba(6, 182, 212, 0.15) 25%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(139, 92, 246, 0.15) 75%,
    rgba(16, 185, 129, 0.3) 100%
  );
  background-size: 300% 300%;
  animation: border-shimmer 8s linear infinite;
}

.register-title {
  background: linear-gradient(135deg, #fff 40%, rgba(16, 185, 129, 0.8));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.register-icon-ring {
  animation: pulse-ring 3s ease-in-out infinite;
}

@keyframes card-enter {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
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

@keyframes pulse-ring {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.15); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}
</style>
