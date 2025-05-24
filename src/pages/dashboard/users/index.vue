<script setup>
import { VDataTableServer } from 'vuetify/lib/labs/VDataTable/index.mjs'
import { convertUtcToLocalTime } from '@/utils/convertUtcToLocalTime'

const router = useRouter()
const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const { getUserList } = useUser()
const { setNavigationData } = useNavigationStore()

const currentPage = ref(1)
const itemsPerPageOptions = ref([10, 20, 30])
const itemsPerPage = ref(30)
const itemsLength = ref(0)
const items = ref([])
const loading = ref(false)

useHead({
  title: t('Users List'),
})

const tableHeaders = [
  {
    title: t('Name'),
    key: 'name',
    width: '150px',
    sortable: false,
  },
  {
    title: t('KYC'),
    key: 'kyc_level',
    width: '150px',
    sortable: false,
  },
  {
    title: t('Status'),
    key: 'is_active',
    width: '200px',
    sortable: false,
  },
  {
    title: t('Codes'),
    key: 'email_verification_code',
    width: '120px',
    sortable: false,
  },
  {
    title: t('Capabilities'),
    key: 'password_need_to_change',
    width: '150px',
    sortable: false,
  },
  {
    title: t('Identity'),
    key: 'passport_number',
    width: '250px',
    sortable: false,
  },
  {
    title: t('Verified At'),
    key: 'email_verified_at',
    width: '180px',
    sortable: false,
  },
  {
    title: t('Actions'),
    key: 'actions',
    width: '80px',
    sortable: false,
  },
]

const fetchData = async () => {
  loading.value = true

  const requestOption = {
    query: {
      ...route.query,
      page: currentPage.value,
      per_page: itemsPerPage.value,
    },
  }

  const { data } = await getUserList(requestOption)

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

const updateOptions = tableOptions => {
  if (!items.value?.length) return
  currentPage.value = tableOptions.page
  itemsPerPage.value = tableOptions.itemsPerPage
}

fetchData()
watch([currentPage, itemsPerPage], fetchData)

const navigateToEditUserPage = item => {
  setNavigationData({ editUserPageData: item })
  navigateTo(`/dashboard/users/edit?id=${item.id}`)
}
</script>

<template>
  <div>
    <UsersListAdvancedSearch
      :items-length="items?.length ?? 0"
      :loading="loading"
      @search-value-change="handleSearchValueChange"
      @search-submit-button-press="handleSearch"
      @active-loading="loading=true"
    />
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

          <section>{{ item.email }}</section>
          <section>{{ item.mobile }}</section>
        </template>

        <template #item.kyc_level="{ item }">
          <section class="py-3">
            <section style="font-size: 14px">
              {{ $t('Done') }}:
              <VIcon
                size="24"
                :icon="item.kyc_done ? 'tabler-check' : 'tabler-x'"
                :color="item.kyc_done ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px; margin-bottom: 5px">
              {{ $t('Level') }}: {{ item.kyc_level }}
            </section>
          </section>
        </template>

        <template #item.is_active="{ item }">
          <section class="py-3">
            <section style="font-size: 14px">
              {{ $t('Active') }}:
              <VIcon
                size="24"
                :icon="item.is_active ? 'tabler-check' : 'tabler-x'"
                :color="item.is_active ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px">
              {{ $t('Locked') }}:
              <VIcon
                size="24"
                :icon="item.is_locked ? 'tabler-check' : 'tabler-x'"
                :color="item.is_locked ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px">
              {{ $t('Two Factor Login') }}:
              <VIcon
                size="24"
                :icon="item.has_two_fa ? 'tabler-check' : 'tabler-x'"
                :color="item.has_two_fa ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px">
              {{ $t('Need To Track') }}:
              <VIcon
                size="24"
                :icon="item.need_to_track ? 'tabler-check' : 'tabler-x'"
                :color="item.need_to_track ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px">
              {{ $t('Need To Change Password') }}:
              <VIcon
                size="24"
                :icon="item.password_need_to_change ? 'tabler-check' : 'tabler-x'
                "
                :color="item.password_need_to_change ? 'primary' : 'error'"
              />
            </section>

            <section style="font-size: 14px">
              {{ $t('Has Disability') }}:
              <VIcon
                size="24"
                :icon="item.has_disability ? 'tabler-check' : 'tabler-x'"
                :color="item.has_disability ? 'primary' : 'error'"
              />
            </section>
          </section>
        </template>

        <template #item.email_verification_code="{ item }">
          <section class="py-3">
            <section style="font-size: 14px">
              {{ $t('Email') }}: {{ item.email_verification_code }}
            </section>
            <section style="font-size: 14px">
              {{ $t('Mobile') }}: {{ item.mobile_verification_code }}
            </section>

            <section style="font-size: 14px">
              {{ $t('Referral') }}: {{ item.referrer_code }}
            </section>
          </section>
        </template>

        <template #item.password_need_to_change="{ item }">
          <section style="font-size: 14px">
            {{ $t('Can Deposit') }}:
            <VIcon
              size="24"
              :icon="item.can_deposit ? 'tabler-check' : 'tabler-x'"
              :color="item.can_deposit ? 'primary' : 'error'"
            />
          </section>

          <section style="font-size: 14px">
            {{ $t('Can Withdraw') }}:
            <VIcon
              size="24"
              :icon="item.can_withdraw ? 'tabler-check' : 'tabler-x'"
              :color="item.can_withdraw ? 'primary' : 'error'"
            />
          </section>

          <section style="font-size: 14px">
            {{ $t('Can Trade') }}:
            <VIcon
              size="24"
              :icon="item.can_trade ? 'tabler-check' : 'tabler-x'"
              :color="item.can_trade ? 'primary' : 'error'"
            />
          </section>
        </template>

        <template #item.passport_number="{ item }">
          <section style="font-size: 14px">
            {{ $t('Passport Number') }}:
            {{ item.passport_number }}
          </section>

          <section style="font-size: 14px">
            {{ t('Legal National ID') }}:
            {{ item.legal_national_id }}
          </section>

          <section style="font-size: 14px">
            {{ $t('Foreigners') }}:
            <VIcon
              size="24"
              :icon="item.foreigners ? 'tabler-check' : 'tabler-x'"
              :color="item.foreigners ? 'primary' : 'error'"
            />
          </section>

          <section style="font-size: 14px">
            {{ $t('Is Legal User') }}:
            <VIcon
              size="24"
              :icon="item.is_legal_user ? 'tabler-check' : 'tabler-x'"
              :color="item.is_legal_user ? 'primary' : 'error'"
            />
          </section>
        </template>

        <template #item.email_verified_at="{ item }">
          <section class="py-3">
            <section style="font-size: 14px">
              {{ $t('Email') }}:
              {{ convertUtcToLocalTime(item.email_verified_at) }}
            </section>
            <section style="font-size: 14px">
              {{ $t('Mobile') }}:
              {{ convertUtcToLocalTime(item.mobile_verified_at) }}
            </section>
          </section>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn
            icon="tabler-edit"
            size="small"
            @click="() => navigateToEditUserPage(item)"
          />
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>
