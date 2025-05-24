<script setup>
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const { t } = useI18n({ useScope: 'global' })
const { isRequired, validateEmail, validatePassword } = useValidator()
const router = useRouter()

const { loginUser } = useAuth()

definePageMeta({
  layout: 'blank',
})

useHead({
  title: t('Login'),
})

onMounted(() => {
  useCookie('accessToken').value = ''
  useCookie('currentAdmin').value = {}
})

const email = ref('superadmin@sarmayex.com')
const password = ref('')
const loading = ref(false)

const submitForm = async () => {
  debugger
  if (!email.value || !password.value) return
  loading.value = true

  // const loginRequestData = {
  //   body: JSON.stringify({ email: email.value, password: password.value }),
  // }

  // await loginUser(loginRequestData)
  loading.value = false
  router.push({ name: 'dashboard' })
}

const isPasswordVisible = ref(false)

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />
          <h4 class="text-h4 mb-1">
            {{ $t('Welcome to') }}
            <span class="text-capitalize">{{ $t(themeConfig.app.title) }}</span
            >! 👋🏻
          </h4>
          <p class="mb-0">
            {{ $t('Please sign-in to your account and start the adventure') }}
          </p>
        </VCardText>
        <VCardText>
          <VForm @submit.prevent="submitForm">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  autofocus
                  :label="$t('Email')"
                  type="email"
                  placeholder="Ex: example@email.com"
                  dir="ltr"
                  :disabled="loading"
                  :rules="[isRequired, validateEmail]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <!-- :rules="[validatePassword]" -->
                <VTextField
                  v-model="password"
                  :label="$t('Password')"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  dir="ltr"
                  :disabled="loading"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <VBtn
                  block
                  type="submit"
                  :disabled="loading"
                  class="mt-6"
                  :loading="loading"
                >
                  {{ $t('Login') }}
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';
</style>
