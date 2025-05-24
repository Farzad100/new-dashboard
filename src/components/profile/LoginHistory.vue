<script setup>
import { convertUtcToLocalTime } from '@/utils/convertUtcToLocalTime';
import { VDataTableServer } from 'vuetify/lib/labs/VDataTable/index.mjs'

const { getAdminLoginHistory } = useAdmin()
const { t } = useI18n()
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPageOptions = ref([10, 20, 30])
const itemsPerPage = ref(30)
const itemsLength = ref(0)
const items = ref([])

const tableHeaders = [
  { title: t('User Agent'), key: 'user_agent', sortable: false },
  { title: t('Device'), key: 'device', sortable: false },
  { title: t('Browser'), key: 'browser', sortable: false },
  { title: t('Country'), key: 'country', sortable: false },
  { title: t('IP'), key: 'ip_address', sortable: false },
  { title: t('Time'), key: 'created_at', sortable: false },
]

const fetchData = async () => {
  loading.value = true

  const { data, error, pending } = await getAdminLoginHistory({
    query: { page: currentPage.value, per_page: itemsPerPage.value },
  })

  loading.value = false
  items.value = data?.objects
  itemsLength.value = data?.pagination?.total ?? 0
}

const updateOptions = tableOptions => {
  if (!items.value?.length) return
  currentPage.value = tableOptions.page
  itemsPerPage.value = tableOptions.itemsPerPage
}

fetchData()
watch([currentPage, itemsPerPage], fetchData)
</script>

<template>
  <VCard class="pb-5 pt-5">
    <!-- 👉 table -->
    <VDataTableServer
      :headers="tableHeaders"
      :items="items"
      :items-per-page-options="itemsPerPageOptions"
      :items-per-page="itemsPerPage"
      :page="currentPage"
      :items-length="itemsLength"
      :loading="loading"
      @update:options="updateOptions"
    >
      <template #item.created_at="{ item }">
        {{ convertUtcToLocalTime(item.created_at) }}
      </template>
    </VDataTableServer>
  </VCard>
</template>
