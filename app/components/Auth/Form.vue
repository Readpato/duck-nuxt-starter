<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const toast = useToast()

type AuthenticationMode = 'login' | 'register'
const authMode = ref<AuthenticationMode>('login')

const baseFormSchema = z.object({
  email: z.email($t('form.field.email.error.invalid')),
  password: z.string($t('form.validation.required', { field: $t('form.field.password.label') })).min(8, $t('form.validation.minimum.length', { length: 8 })),
})

const registerFormSchema = z.object({
  ...baseFormSchema.shape,
  name: z.string($t('form.validation.required', { field: $t('form.field.name.label') })).min(1, $t('form.validation.minimum.length', { length: 1 })),
})

type LoginSchema = z.output<typeof baseFormSchema>
type RegisterSchema = z.output<typeof registerFormSchema>

const formSchema = computed(() =>
  authMode.value === 'login' ? baseFormSchema : registerFormSchema,
)

const baseFields: AuthFormField[] = [
  { name: 'email', type: 'email', label: $t('form.field.email.label'), placeholder: $t('form.field.email.placeholder'), required: true },
  { name: 'password', type: 'password', label: $t('form.field.password.label'), placeholder: $t('form.field.password.placeholder'), required: true },
]

const fields = computed<AuthFormField[]>(() =>
  authMode.value === 'login'
    ? baseFields
    : [
        { name: 'name', type: 'name', label: $t('form.field.name.label'), placeholder: $t('form.field.name.placeholder'), required: true },
        ...baseFields,
      ],
)

async function onSubmit(payload: FormSubmitEvent<LoginSchema | RegisterSchema>) {
  const { error } = authMode.value === 'login'
    ? await authClient.signIn.email(baseFormSchema.parse(payload.data))
    : await authClient.signUp.email(registerFormSchema.parse(payload.data))

  if (error) {
    toast.add({
      title: $t('common.error.label'),
      description: error.message,
      color: 'error',
    })
    return
  }
  // Invalidate cached session so middleware's useSession(useFetch) refetches
  await refreshNuxtData()
  navigateTo('/')
}
</script>

<template>
  <UPageCard>
    <UAuthForm
      :schema="formSchema"
      :title="$t(`auth.form.${authMode}.title`)"
      :description="$t(`auth.form.${authMode}.description`)"
      icon="i-lucide-user"
      :fields
      :submit="{ label: $t(`auth.form.${authMode}.submit.label`) }"
      @submit="onSubmit"
    />
    <USeparator />
    <UButton variant="link" class="mx-auto" @click="authMode = authMode === 'login' ? 'register' : 'login'">
      {{ $t(`auth.form.${authMode === 'login' ? 'register' : 'login'}.account.prompt`) }}
    </UButton>
  </UPageCard>
</template>
