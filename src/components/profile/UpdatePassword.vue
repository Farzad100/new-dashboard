<script setup>
const { t } = useI18n()
const { changePassword } = useAdmin()

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const hasError = ref(true)
const showModal = ref(false)
const modalMessage = ref('')
const { validatePassword } = useValidator()

const formRef = ref(null)
const loading = ref(false)

watch([currentPassword, newPassword, confirmNewPassword], () => {
  if (validatePassword(currentPassword.value)?.length ||
    validatePassword(newPassword.value)?.length ||
    validatePassword(confirmNewPassword.value)?.length) {
    hasError.value = true

    return
  }
  hasError.value = false
})

const resetForm = () => {
  formRef.value.reset()
}

const handleChangePassword = async () => {
  if (hasError.value) {
    return
  }

  if (newPassword.value !== confirmNewPassword.value) {
    hasError.value = true
    modalMessage.value = t('Passwords You Entered Do Not Match.')
    showModal.value = true

    return
  }

  const options = {
    body: JSON.stringify({
      current_password: currentPassword.value,
      password: newPassword.value,
      password_confirmation: confirmNewPassword.value,
      t_otp: '123456',
      otp: '',
    }),
  }

  loading.value = true

  const { isSuccess } = await changePassword(options)

  loading.value = false

  if (isSuccess) {
    hasError.value = false
    resetForm()
    toast({ message: t('Password Changed Successfully') })
  }

}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <h4 class="pa-5">
          {{ $t('Change Password') }}
        </h4>
        <VDivider />

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm
            ref="formRef"
            class="mt-6"
            fast-fail
            @submit.prevent
          >
            <VRow>
              <!-- 👉 Current Password -->
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model.trim="currentPassword"
                  :label="$t('Current Password')"
                  type="currentPassword"
                  dir="ltr"
                  :rules="[validatePassword]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 New Password -->
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="newPassword"
                  :label="$t('New Password')"
                  dir="ltr"
                  variant="outlined"
                  :rules="[validatePassword]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Confirm New Password -->
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="confirmNewPassword"
                  :label="$t('Confirm New Password')"
                  dir="ltr"
                  variant="outlined"
                  :rules="[validatePassword]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  :disabled="loading || hasError"
                  :loading="loading"
                  @click="handleChangePassword"
                >
                  {{ $t('Submit') }}
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  :disabled="loading"
                >
                  {{ $t('Reset') }}
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
