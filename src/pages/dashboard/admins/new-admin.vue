<script setup>
const { t } = useI18n()

useHead({
  title: t('New Admin'),
})

const { addAdmin } = useAdmin()
const { validatePassword, validateEmail } = useValidator()

const email = ref('')
const password = ref('')
const hasError = ref(true)
const formRef = ref(null)
const loading = ref(false)

watch([password, email], () => {
  if (validatePassword(password.value)?.length || validateEmail(email.value)?.length) {
    hasError.value = true

    return
  }
  hasError.value = false
})

const handleAddAdmin = async () => {
  if (hasError.value) {
    return
  }

  const options = {
    body: JSON.stringify({ email: email.value, password: password.value }),
  }

  loading.value = true

  const { isSuccess } = await addAdmin(options)

  loading.value = false

  if (isSuccess) {
    hasError.value = false
    toast({ message: t('New Admin Created Successfully.') })
    formRef.value.reset()
  }

}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <h4 class="pa-5">
          {{ $t('Add New Admin') }}
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
              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  ref="emailInputRef"
                  v-model.trim="email"
                  fast-fail
                  :label="$t('Email')"
                  type="email"
                  dir="ltr"
                  :rules="[validateEmail]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Password -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  ref="passwordInputRef"
                  v-model="password"
                  :label="$t('Password')"
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
                  :loading="loading"
                  :disabled="loading || !email?.length || !password?.length"
                  @click="handleAddAdmin"
                >
                  {{ $t('Submit') }}
                </VBtn>

                <VBtn
                  color="red"
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
