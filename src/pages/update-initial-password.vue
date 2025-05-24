<script setup>
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'



definePageMeta({
  layout: 'blank',
})

const { t } = useI18n()

useHead({
  title: t('Update Password'),
})

const { isRequired, validatePassword } = useValidator()
const { updateInitialPassword } = useAuth()

const form = ref({
  password: '',
  confirmPassword: '',
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const loading = ref(false)
const currentAdmin = useCookie('currentAdmin').value

const handleUpdateInitialPassword = async () => {
  const { password, confirmPassword } = form.value
  if (password !== confirmPassword) {
    return toast({ message: t('Passwords You Entered Do Not Match.'), type: 'warning' })
  }
  loading.value = true
  await updateInitialPassword({
    password,
    confirmPassword,
  })
  loading.value = false
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card pa-4"
        max-width="448"
      >
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-capitalize text-h3 py-1">
            {{ $t(themeConfig.app.title) }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-2">
          <h4 class="text-h4 mb-1">
            {{ $t('Initial Password Update') }} 🔒
          </h4>
          <p class="mb-0 mt-3">
            {{ $t('for') }}
            <span class="font-weight-bold">{{ currentAdmin.email }}</span>
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => { }">
            <VRow>
              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  autofocus
                  :label="$t('New Password')"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  dir="ltr"
                  :rules="[isRequired, validatePassword]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- Confirm Password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.confirmPassword"
                  :label="$t('Confirm Password')"
                  placeholder="············"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  dir="ltr"
                  :rules="[isRequired, validatePassword]"
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>

              <!-- reset password -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                  :loading="loading"
                  @click="handleUpdateInitialPassword"
                >
                  {{ $t('Set New Password') }}
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <NuxtLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>{{ $t('Back to login') }}</span>
                </NuxtLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';
</style>
