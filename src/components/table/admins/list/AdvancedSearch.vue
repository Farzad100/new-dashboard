<script setup>
const props = defineProps({
  itemsLength: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['searchValueChange', 'searchSubmitButtonPress', 'activeLoading'])
const { query } = useRoute()
const { validateEmail } = useValidator()

const formRef = ref(null)

const formValues = ref({
  name: query.name ?? '',
  family: query.family ?? '',
  email: query.email ?? '',
})

const handleSubmitButtonPress = () => {
  if (formValues.value.email?.length === 0) return
  emit('searchSubmitButtonPress')
}

const handleResetButtonClick = () => {
  formRef?.value?.reset?.()
  for (const i in formValues.value) {
    if (typeof formValues.value[i] === 'boolean') {
      formValues.value[i] = false
    }
  }
  emit('activeLoading')
  setTimeout(() => {
    emit('searchSubmitButtonPress')
  }, 1000)
}

const handleClearFiltersButtonClick = () => {
  formRef?.value?.reset?.()
  for (const i in formValues.value) {
    if (typeof formValues.value[i] === 'boolean') {
      formValues.value[i] = false
    }
  }
}

watch(formValues.value, () => {
  emit('searchValueChange', formValues.value)
})
</script>

<template>
  <VForm
    ref="formRef"
    title="Advanced Search"
    class="pa-5"
    @submit.prevent="() => {}"
  >
    <h3 class="mb-5">
      {{ $t('Advanced Search') }}
    </h3>
    <VRow>
      <!-- Name -->
      <VCol
        cols="12"
        md="4"
      >
        <VTextField
          v-if="false"
          v-model.trim="formValues.name"
          :label="$t('Name')"
          dir="auto"
        />
      </VCol>

      <!-- Family -->
      <VCol
        cols="12"
        md="4"
      >
        <VTextField
          v-if="false"
          v-model.trim="formValues.family"
          :label="$t('Family')"
          dir="auto"
        />
      </VCol>

      <!-- Email -->
      <VCol
        cols="12"
        md="12"
      >
        <VTextField
          v-model.trim="formValues.email"
          :label="$t('Email')"
          placeholder="Ex: example@email.com"
          dir="ltr"
          type="email"
          :rules="[validateEmail]"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn
          type="submit"
          @click="handleSubmitButtonPress"
        >
          {{ $t('Submit') }}
        </VBtn>

        <VBtn
          type="reset"
          color="info"
          variant="tonal"
          :disabled="props.loading"
          @click="handleResetButtonClick"
        >
          {{ $t('Reset List') }}
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
          :disabled="props.loading"
          @click="handleClearFiltersButtonClick"
        >
          {{ $t('Clear Filters') }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
