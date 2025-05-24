<script setup>
const props = defineProps({
  itemsLength: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['searchValueChange', 'searchSubmitButtonPress', 'activeLoading'])
const { validateEmail } = useValidator()
const { query } = useRoute()
const isCollapsed = ref(false)

const formValues = ref({
  name: query.name ?? '',
  family: query.family ?? '',
  email: query.email ?? '',
  mobile: query.mobile ?? '',
  kyc_level: query.kyc_level ?? '',
  kyc_done: isTrueStr(query.kyc_done),
  is_active: isTrueStr(query.is_active),
  is_locked: isTrueStr(query.is_locked),
  need_to_track: isTrueStr(query.need_to_track),
  has_two_fa: isTrueStr(query.has_two_fa),
  email_verification_code: query.email_verification_code ?? '',
  mobile_verification_code: query.mobile_verification_code ?? '',
  password_need_to_change: isTrueStr(query.password_need_to_change),
  can_deposit: isTrueStr(query.can_deposit),
  can_withdraw: isTrueStr(query.can_withdraw),
  can_trade: isTrueStr(query.can_trade),
  has_disability: isTrueStr(query.has_disability),
  referrer_code: query.referrer_code ?? '',
  passport_number: query.passport_number ?? '',
  foreigners: isTrueStr(query.foreigners),
  is_legal_user: isTrueStr(query.is_legal_user),
  legal_national_id: query.legal_national_id ?? '',
  email_verified_at: query.email_verified_at ?? '',
  mobile_verified_at: query.mobile_verified_at ?? '',
  from_date: query.from_date ?? '',
  to_date: query.to_date ?? '',
})

const formRef = ref(null)

const handleSubmitButtonPress = () => {
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
  <VCard
    class="mb-7"
    style="z-index: 1"
  >
    <VForm
      ref="formRef"
      title="Advanced Search"
      class="pa-5"
      @submit.prevent="handleSubmitButtonPress"
    >
      <h3 class="mb-5">
        {{ $t('Advanced Search') }}
      </h3>
      <VRow>
        <!-- Name -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.name"
            :label="$t('Name')"
            dir="auto"
          />
        </VCol>

        <!-- Family -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.family"
            :label="$t('Family')"
            dir="auto"
          />
        </VCol>

        <!-- Email -->
        <VCol
          cols="12"
          md="3"
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

        <!-- Mobile -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.mobile"
            :label="$t('Mobile')"
            dir="auto"
          />
        </VCol>

        <!-- KYC Level -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.kyc_level"
            :label="$t('KYC Level')"
            dir="auto"
          />
          <VSwitch
            v-model="formValues.kyc_done"
            class="mt-3"
            :label="$t('KYC Done')"
          />
        </VCol>

        <!-- Email Verification Code -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.email_verification_code"
            :label="$t('Email Verification Code')"
            dir="auto"
          />
        </VCol>

        <!-- Mobile Verification Code -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.mobile_verification_code"
            :label="$t('Mobile Verification Code')"
            dir="auto"
          />
        </VCol>

        <!-- Referrer Code -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.referrer_code"
            :label="$t('Referrer Code')"
            dir="auto"
          />
        </VCol>
      </VRow>

      <VRow v-if="isCollapsed">
        <!-- Passport Number -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.passport_number"
            :label="$t('Passport Number')"
            dir="auto"
          />
        </VCol>

        <!-- Legal National ID -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.legal_national_id"
            :label="$t('Legal National ID')"
            dir="auto"
          />
        </VCol>

        <!-- Email Verified At -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.email_verified_at"
            :label="$t('Email Verified At')"
            dir="auto"
          />
        </VCol>

        <!-- Mobile Verified At -->
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model.trim="formValues.mobile_verified_at"
            :label="$t('Mobile Verified At')"
            dir="auto"
          />
        </VCol>
        <!-- Is Active -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.is_active"
            :label="$t('Active')"
          />
        </VCol>

        <!-- Is Locked -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.is_locked"
            :label="$t('Locked')"
          />
        </VCol>

        <!-- Need to Track -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.need_to_track"
            :label="$t('Need To Track')"
          />
        </VCol>

        <!-- Has Two FA -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.has_two_fa"
            :label="$t('Two Factor Login')"
          />
        </VCol>

        <!-- Password Need to Change -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.password_need_to_change"
            :label="$t('Password Need to Change')"
          />
        </VCol>

        <!-- Can Deposit -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.can_deposit"
            :label="$t('Can Deposit')"
          />
        </VCol>

        <!-- Can Withdraw -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.can_withdraw"
            :label="$t('Can Withdraw')"
          />
        </VCol>

        <!-- Can Trade -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.can_trade"
            :label="$t('Can Trade')"
          />
        </VCol>

        <!-- Has Disability -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.has_disability"
            :label="$t('Has Disability')"
          />
        </VCol>

        <!-- Foreigners -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.foreigners"
            :label="$t('Foreigners')"
          />
        </VCol>

        <!-- Is Legal User -->
        <VCol
          cols="12"
          md="3"
        >
          <VSwitch
            v-model="formValues.is_legal_user"
            :label="$t('Is Legal User')"
          />
        </VCol>
      </VRow>

      <VRow v-if="isCollapsed">
        <!-- From Date -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model.trim="formValues.from_date"
            :label="$t('From Date')"
            dir="auto"
            class="from_date"
          />
        </VCol>

        <!-- To Date -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model.trim="formValues.to_date"
            :label="$t('To Date')"
            dir="auto"
            class="to_date"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn
            type="submit"
            :disabled="props.loading"
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

    <VRow>
      <VCol class="justify-center d-flex pa-6">
        <VBtn
          size="small"
          rounded="pill"
          @click="isCollapsed = !isCollapsed"
        >
          <VIcon :icon="isCollapsed ? 'tabler-arrow-up' : 'tabler-arrow-down'" />
        </VBtn>
      </VCol>
    </VRow>
    <ClientOnly>
      <DatePicker
        v-model="formValues.from_date"
        custom-input=".from_date"
      />
      <DatePicker
        v-model="formValues.to_date"
        custom-input=".to_date"
      />
    </ClientOnly>
  </VCard>
</template>
