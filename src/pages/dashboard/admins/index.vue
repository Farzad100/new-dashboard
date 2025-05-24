<script setup>
import { VDataTableServer } from 'vuetify/lib/labs/VDataTable/index.mjs'

const router = useRouter()
const route = useRoute()
const { query } = useRoute()
const { t } = useI18n({ useScope: 'global' })
const { getAdminList, getChangePasswordHistory } = useAdmin()
const { setNavigationData, navigationData } = useNavigationStore()

const currentPage = ref(1)
const itemsPerPageOptions = ref([10, 20, 30])
const itemsPerPage = ref(30)
const itemsLength = ref(0)
const items = ref([])
const loading = ref(true)

useHead({
  title: t('Admins List'),
})

const tableHeaders = [
  {
    title: t('Name'),
    key: 'name',
    sortable: false,
  },
  {
    title: t('Alias'),
    key: 'alias',
    sortable: false,
  },
  {
    title: t('Email'),
    key: 'email',
    sortable: false,
  },
  {
    title: t('Mobile'),
    key: 'mobile',
    sortable: false,
  },
  {
    title: t('Status'),
    key: 'status',
    sortable: false,
  },
  {
    title: t('Actions'),
    key: 'actions',
    sortable: false,
  },
]

const fetchData = async () => {
  loading.value = true

  const requestOption = {
    query: { ...route.query, page: currentPage.value, per_page: itemsPerPage.value },
  }

  const { data } = await getAdminList(requestOption)

  loading.value = false
  items.value = data?.objects
  loading.value = false
  itemsLength.value = data?.pagination?.total || 0
}

const handleSearchValueChange = inputs => {
  const pageQuery = {}
  for (const i in inputs) {
    if (inputs[i]?.length > 0 || (typeof inputs[i] === 'boolean' && inputs[i])) {
      pageQuery[i] = inputs[i]
    }
  }
  router.push({
    query: pageQuery,
  })
}

const handleSearch = () => {
  fetchData()
}

const setAdminLastChangePassword = async () => {
  const { data } = await getChangePasswordHistory()
  if (data?.objects?.length) {
    const lastChangePasswordTime = data?.objects[0]?.changed_at

    useCookie('lastChangePasswordTime').value = lastChangePasswordTime
  }
}

const setLoggedInAdminData = async () => {
  if (navigationData?.loggedInAdminData) return
  const { data } = await getAdminList({ query: { email: useCookie('currentAdmin').value.email } })
  const loggedInAdminData = data?.objects[0]

  setNavigationData({ loggedInAdminData })
}

const navigateToEditAdminPage = item => {
  setNavigationData({ editAdminPageData: item })
  navigateTo(`/dashboard/admins/edit?id=${item.id}`)
}

const updateOptions = tableOptions => {
  if (!items.value?.length) return
  currentPage.value = tableOptions.page
  itemsPerPage.value = tableOptions.itemsPerPage
}

fetchData()
setLoggedInAdminData()
setAdminLastChangePassword()
watch([currentPage, itemsPerPage], fetchData)
</script>

<template>
  <div>
    <VCard class="mb-7">
      <TableAdminsListAdvancedSearch
        :items-length="items?.length ?? 0"
        @search-value-change="handleSearchValueChange"
        @search-submit-button-press="handleSearch"
        @active-loading="loading = true"
      />
    </VCard>
    <VCard class="pb-5">
      <!-- 👉 table -->
      <VDataTableServer
        :items-per-page="itemsPerPage"
        :items-per-page-options="itemsPerPageOptions"
        :headers="tableHeaders"
        :items="items"
        :page="currentPage"
        :items-length="itemsLength"
        :loading="loading"
        class="mt-4"
        @update:options="updateOptions"
      >
        <template #item.name="{ item }">
          {{ item.name + ' ' + item.family }}
        </template>

        <template #item.email="{ item }">
          {{ `${item.email} ` }}
          <NuxtLink
            v-if="item.email === useCookie('currentAdmin').value?.email"
            to="/dashboard/profile"
            class="text-red-lighten-1"
          >
            ({{ $t('You') }})
          </NuxtLink>
        </template>

        <template #item.status="{ item }">
          <section class="py-3">
            <section style="font-size: 14px;">
              {{ $t('Active') }}:
              <VIcon
                size="24"
                :icon="item.is_active ? 'tabler-check' : 'tabler-x'"
                :color="item.is_active ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px;">
              {{ $t('Super Admin') }}:
              <VIcon
                size="24"
                :icon="item.is_super_admin ? 'tabler-check' : 'tabler-x'"
                :color="item.is_super_admin ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px;">
              {{ $t('Two Factor Login') }}:
              <VIcon
                size="24"
                :icon="item.has_two_fa ? 'tabler-check' : 'tabler-x'"
                :color="item.has_two_fa ? 'primary' : 'error'"
              />
            </section>
            <section />
            <section />
          </section>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn
            icon="tabler-edit"
            size="small"
            @click="() => navigateToEditAdminPage(item)"
          />
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>
