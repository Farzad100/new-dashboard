<script setup>
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()

useHead({
  title: t('Edit User'),
})

const { navigationData } = useNavigationStore()
const { validateEmail } = useValidator()

const formValues = ref({
  name: navigationData?.editUserPageData?.name ?? '',
  family: navigationData?.editUserPageData?.family ?? '',
  email: navigationData?.editUserPageData?.email ?? '',
  mobile: navigationData?.editUserPageData?.mobile ?? '',
  kyc_level: navigationData?.editUserPageData?.kyc_level ?? '',
  kyc_done: navigationData?.editUserPageData?.kyc_done ?? '',
  is_active: navigationData?.editUserPageData?.is_active ?? '',
  is_locked: navigationData?.editUserPageData?.is_locked ?? '',
  need_to_track: navigationData?.editUserPageData?.need_to_track ?? '',
  has_two_fa: navigationData?.editUserPageData?.has_two_fa ?? '',
  email_verification_code: navigationData?.editUserPageData?.email_verification_code ?? '',
  mobile_verification_code: navigationData?.editUserPageData?.mobile_verification_code ?? '',
  password_need_to_change: navigationData?.editUserPageData?.password_need_to_change ?? '',
  can_deposit: navigationData?.editUserPageData?.can_deposit ?? '',
  can_withdraw: navigationData?.editUserPageData?.can_withdraw ?? '',
  can_trade: navigationData?.editUserPageData?.can_trade ?? '',
  has_disability: navigationData?.editUserPageData?.has_disability ?? '',
  referrer_code: navigationData?.editUserPageData?.referrer_code ?? '',
  passport_number: navigationData?.editUserPageData?.passport_number ?? '',
  foreigners: navigationData?.editUserPageData?.foreigners ?? '',
  is_legal_user: navigationData?.editUserPageData?.is_legal_user ?? '',
  legal_national_id: navigationData?.editUserPageData?.legal_national_id ?? '',
  email_verified_at: navigationData?.editUserPageData?.email_verified_at ?? '',
  mobile_verified_at: navigationData?.editUserPageData?.mobile_verified_at ?? '',
  from_date: navigationData?.editUserPageData?.from_date ?? '',
  to_date: navigationData?.editUserPageData?.to_date ?? '',
})

const formRef = ref(null)

const handleSubmitButtonPress = () => {
}

const handleResetButtonClick = () => {
  formRef?.value?.reset?.()
  setTimeout(() => {
    emit('searchSubmitButtonPress')
  }, 1000)
}

const fetchPageData = async () => {
  const selectedAdminId = route.query.id

  // const { data, errorMessage } = await getAdminList({ query: { admin_id: selectedAdminId } })

  // if (errorMessage?.length) {
  //   return navigateTo('/dashboard/admins')
  // }

  // selectedAdminData.value = data.objects[0]
}

if (!navigationData?.editAdminPageData) {
  fetchPageData()
}
</script>

<template>
  <VCard>
    <VForm
      ref="formRef"
      class="pa-5"
      @submit.prevent="handleSubmitButtonPress"
    >
      <h3 class="mb-5">
        {{ $t('Edit User') }}
      </h3>
      <VRow>
        <!-- Name -->
        <VCol
          cols="12"
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
        >
          <VTextField
            v-model.trim="formValues.referrer_code"
            :label="$t('Referrer Code')"
            dir="auto"
          />
        </VCol>
      </VRow>

      <VRow>
        <!-- Passport Number -->
        <VCol
          cols="12"
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
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
          md="6"
        >
          <VSwitch
            v-model="formValues.is_active"
            :label="$t('Active')"
          />
        </VCol>

        <!-- Is Locked -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.is_locked"
            :label="$t('Locked')"
          />
        </VCol>

        <!-- Need to Track -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.need_to_track"
            :label="$t('Need To Track')"
          />
        </VCol>

        <!-- Has Two FA -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.has_two_fa"
            :label="$t('Two Factor Login')"
          />
        </VCol>

        <!-- Password Need to Change -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.password_need_to_change"
            :label="$t('Password Need to Change')"
          />
        </VCol>

        <!-- Can Deposit -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.can_deposit"
            :label="$t('Can Deposit')"
          />
        </VCol>

        <!-- Can Withdraw -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.can_withdraw"
            :label="$t('Can Withdraw')"
          />
        </VCol>

        <!-- Can Trade -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.can_trade"
            :label="$t('Can Trade')"
          />
        </VCol>

        <!-- Has Disability -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.has_disability"
            :label="$t('Has Disability')"
          />
        </VCol>

        <!-- Foreigners -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.foreigners"
            :label="$t('Foreigners')"
          />
        </VCol>

        <!-- Is Legal User -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="formValues.is_legal_user"
            :label="$t('Is Legal User')"
          />
        </VCol>
      </VRow>

      <VRow>
        <!-- From Date -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model.trim="formValues.from_date"
            :label="$t('From Date')"
            dir="auto"
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
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn type="submit">
            {{ $t('Submit') }}
          </VBtn>

          <VBtn
            type="reset"
            color="secondary"
            variant="tonal"
            @click="handleResetButtonClick"
          >
            {{ $t('Reset') }}
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCard>
</template>
