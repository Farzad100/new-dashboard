<script setup>
import { useNavigationStore } from '@/stores/navigationStore'
import { useAppModalStore } from '@/stores/appModal.store'

const route = useRoute()
const { ct } = useCT()
const { t } = useI18n()
const { edit } = useAdmin()
const { isRequired } = useValidator()
const { navigationData } = useNavigationStore()
const { getAdminList } = useAdmin()
const { showAppModal } = useAppModalStore()

definePageMeta({
  middleware: [
    function (to) {
      if (!to.query.id) return navigateTo('/dashboard/admins')
    },
  ],
})

useHead({
  title: ct('Edit', 'Admin'),
})

const selectedAdminData = ref(navigationData?.editAdminPageData ?? null)
const firstName = ref(selectedAdminData.value?.name ?? '')
const lastName = ref(selectedAdminData.value?.family ?? '')
const alias = ref(selectedAdminData.value?.alias ?? '')
const mobile = ref(selectedAdminData.value?.mobile ?? '')
const isActive = ref(selectedAdminData.value?.is_active ?? false)
const loading = ref(false)
const hasError = ref(true)
const email = ref(selectedAdminData.value?.email ?? '')
const showInactiveBox = ref(selectedAdminData.value &&'is_active' in selectedAdminData.value && !selectedAdminData.value?.is_active)

watch(selectedAdminData, () => {
  firstName.value = selectedAdminData.value?.name ?? ''
  lastName.value = selectedAdminData.value?.family ?? ''
  alias.value = selectedAdminData.value?.alias ?? ''
  mobile.value = selectedAdminData.value?.mobile ?? ''
  email.value = selectedAdminData.value?.email ?? ''
  isActive.value = selectedAdminData.value?.is_active
  showInactiveBox.value = !selectedAdminData.value?.is_active
})

watch([firstName, lastName, alias, mobile, isActive], () => {
  if (isRequired(firstName.value)?.length ||
    isRequired(lastName.value)?.length ||
    isRequired(alias.value)?.length ||
    isRequired(mobile.value)?.length) {
    hasError.value = true

    return
  }
  hasError.value = false
})

const handleSaveChanges = async () => {
  const requestData = JSON.stringify({
    admin_id: route.query.id,
    name: firstName.value,
    family: lastName.value,
    alias: alias.value,
    mobile: mobile.value,
    is_active: isActive.value,
  })

  loading.value = true

  const { isSuccess } = await edit({ body: requestData })

  loading.value = false

  if (isSuccess) {
    hasError.value = false
    toast({ message: t('Data Updated Successfully'), type: 'success' })
    showInactiveBox.value = !isActive.value
  }
}

const fetchPageData = async () => {
  const selectedAdminId = route.query.id

  const { data, errorMessage } = await getAdminList({ query: { admin_id: selectedAdminId } })

  if (errorMessage?.length) {
    return navigateTo('/dashboard/admins')
  }

  selectedAdminData.value = data.objects[0]
}


const showConfirmModal = () => {
  showAppModal({
    message: t('Do you want to save the changes?'),
    title: t('Save Changes'),
    type: 'warning',
    hasCancelButton: true,
    confirmButtonPress: handleSaveChanges,
  })
}

if (!navigationData.editAdminPageData) {
  fetchPageData()
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <h4 class="pa-5">
          {{ ct('Edit', 'Admin') }}
        </h4>
        
        <VCardText v-if="showInactiveBox">
          <VAlert
            type="info"
            :text="$t('This admin is not active.')"
          />
        </VCardText>

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                  v-model="email"
                  dir="auto"
                  :label="$t('Email')"
                  disabled
                />
              </VCol>
                
              <!-- 👉 First Name -->
              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                  v-model="firstName"
                  dir="auto"
                  :label="$t('Name')"
                  :rules="[isRequired]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                  v-model="lastName"
                  dir="auto"
                  :label="$t('Last Name')"
                  :rules="[isRequired]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Alias -->
              <VCol
                cols="12"
                md="12"
              >
                <VTextField
                  v-model="alias"
                  dir="auto"
                  :label="$t('Alias')"
                  :rules="[isRequired]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Mobile -->
              <VCol
                cols="12"
                md="12"
              >
                <VTextField
                  v-model="mobile"
                  dir="ltr"
                  :label="$t('Mobile')"
                  :rules="[isRequired]"
                  :disabled="loading"
                />
              </VCol>

              <!-- 👉 Is Active -->
              <VCol
                cols="12"
                md="12"
              >
                <div class="d-flex flex-row">
                  <label
                    class="me-4"
                    for="active"
                  >{{ $t('Active') }}:</label>
                  <VSwitch
                    id="active"
                    v-model="isActive"
                  />
                </div>
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  :disabled="hasError"
                  :loading="loading"
                  @click="showConfirmModal"
                >
                  {{ $t('Save Changes') }}
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
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
