<script setup>
import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs'
import QrcodeVue from 'qrcode-vue3'
import { VOtpInput } from 'vuetify/labs/VOtpInput'

const { enable2fa, verify2fa } = useAdmin()
const otpCode = ref('')
const pageData = ref(null)
const loading = ref(false)

const fetchData = async () => {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  const { data } = await enable2fa({ headers })
  if (data) pageData.value = data
}

const handleSubmitButtonPress = async () => {
  if (!otpCode.value.length) return
  
  loading.value = true

  const { isSuccess } = await verify2fa({ body: JSON.stringify({ totp_code: otpCode.value }) })
  
  loading.value = false

  if (isSuccess) {
    reloadNuxtApp()
  }

}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div
    v-if="pageData"
    class="auth-wrapper d-flex align-center justify-center pa-4"
  >
    <div class="position-relative w-100">
      <div class="d-flex items-center justify-center">
        <QrcodeVue
          width="300"
          height="300"
          :value="pageData.otp_url"
          :dots-options="{
            type: 'dots',
            color: '#000',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#000' },
                { offset: 1, color: '#000' },
              ],
            },
          }"
        />
      </div>

      <VCardText class="pt-2 mt-5">
        <h4 class="text-h4 mb-7">
          {{ $t('Enable Two Step Verification') }}
        </h4>
        <p class="mb-2">
          {{ $t('To complete the two-factor authentication setup, scan the QR code above by google authenticator app and then enter the generated code in the field below.') }}
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => { }">
          <VRow>
            <!-- email -->
            <VCol
              class="d-flex justify-center w-100"
              cols="12"
            >
              <VOtpInput
                v-model.trim="otpCode"
                :disabled="loading"
                type="number"
                class="pa-0"
                style="max-width: 360px;"
                dir="ltr"
              />
            </VCol>

            <!-- reset password -->
            <VCol
              cols="12"
              class="d-flex justify-center"
            >
              <VBtn
                :loading="loading"
                :disabled="otpCode.length !== 6"
                type="submit"
                @click="handleSubmitButtonPress"
              >
                {{ $t('Submit') }}
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </div>
  </div>

  <div v-if="!pageData">
    <VSkeletonLoader
      class="mx-auto justify-center"
      max-width="300"
      type="image"
    />
    <VSkeletonLoader
      class="mx-auto justify-center"
      max-width="1200"
      type="text, text, text, text"
    />
    <VSkeletonLoader
      class="mx-auto justify-center"
      max-width="1200"
      type="button, button, button, button, button"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
