<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = [
  {
    title: 'fav',
    key: 'favorite',
    sortable: false,
  },
  {
    title: 'auto',
    key: 'is_auto',
  },
  {
    title: 'symbol',
    key: 'coin_symbol',
  },
  {
    title: 'network',
    key: 'network',
  },
  {
    title: 'network handle',
    key: 'network_handle',
  },
  {
    title: 'from',
    key: 'from_wallet_address',
  },
  {
    title: 'to',
    key: 'to_wallet_address',
  },
  {
    title: 'confirmation',
    key: 'confirmation',
  },
  {
    title: 'confirmed at',
    key: 'confirmed_at.seconds',
  },
  {
    title: 'created at',
    key: 'created_at.seconds',
  },
  {
    title: 'ACTIONS',
    key: 'actions',
    sortable: false,
  },
]

const depositData = {
  'id': '3dc24b5a-4546-4835-a9f8-78e7b2ddcdba',
  'is_auto': true,
  'coin_id': '1',
  'coin_symbol': 'BTC-USDT',
  'network': 'test',
  'network_handle': 'test',
  'from_wallet_address': 'test',
  'to_wallet_address': 'test',
  'amount': '0',
  'tx_id': 'test',
  'confirmation': 1,
  'confirmed_at': {
    'seconds': 1699718365,
  },
  'created_at': {
    'seconds': 1688318814,
  },
}

const router = useRouter()
const { query } = useRoute()
const searchInitialValue = query.search ? query.search : ''
const showDeleteDialog = ref(false)
const searchDialog = ref(false)
const selected = ref([])
const search = ref(searchInitialValue)

const closeDelete = () => {
  showDeleteDialog.value = false
}

const deleteItemConfirm = () => {
  closeDelete()
}

watch(search, newValue => {
  router.push({
    query: {
      ...router.query,
      search: newValue,
    },
  })
})

const showSearchDialog = () => {
  searchDialog.value = true
}
</script>

<template>
  <VCard class="pb-5">
    <TableAdvancedSearch />
    <VDivider thickness="3" />
    <TableActionBar :visibility="selected.length > 0" />

    <!-- 👉 table -->
    <VDataTable
      v-model="selected"
      show-select
      :headers="headers"
      :items="Array(50).fill(depositData)"
      :items-per-page="15"
      :search="search"
    >
      <template #item.favorite="{ item }">
        <VBtn
          color="warning"
          variant="tonal"
          @click="item.isFav = !item.isFav"
        >
          <VIcon
            size="22"
            :icon="item.isFav ? 'tabler-star-filled' : 'tabler-star'"
            style="opacity: 1"
          />
        </VBtn>
      </template>

      <template #item.confirmed_at.seconds="{ item }">
        {{ useFormattedDate(item.confirmed_at.seconds) }}
      </template>

      <template #item.created_at.seconds="{ item }">
        {{ useFormattedDate(item.created_at.seconds) }}
      </template>

      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn @click="null">
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn @click="null">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="showDeleteDialog = true">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </div>
      </template>
    </VDataTable>

    <!-- 👉 Delete Dialog  -->
    <VDialog
      v-model="showDeleteDialog"
      max-width="800"
    >
      <VCard class="py-4">
        <VCardTitle class="mb-3">
          {{ $t('Confirm Delete') }}
        </VCardTitle>

        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="closeDelete"
          >
            {{ $t('Cancel') }}
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="deleteItemConfirm"
          >
            {{ $t('Ok') }}
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>

    <TableSearchModal
      :visibility="searchDialog"
      @search="console.log('search')"
      @close="searchDialog = false"
    />
  </VCard>
</template>
