<script setup>
const { t } = useI18n()

const items = ref([
  {
    icon: 'tabler-user-plus',
    color: 'success',
    title: t('View') + ' ' + t('Admins'),
    value: 56,
    to: '/dashboard/admins',
    isHover: false,
  },
  {
    icon: 'tabler-user',
    color: 'primary',
    title: t('View') + ' ' + t('Users'),
    value: 76,
    to: '/dashboard/users',
    isHover: false,
  },
  {
    icon: 'tabler-user-plus',
    color: 'warning',
    title: t('View') + ' ' + t('Verified Users'),
    value: 56,
    to: '/dashboard/users?kyc_done=true',
    isHover: false,
  },
])
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in items"
      :key="index"
      cols="12"
      md="4"
      sm="6"
    >
      <div>
        <VCard
          class="logistics-card-statistics cursor-pointer"
          :to="data.to"
          :style="data.isHover ? { 'border-block-end': `6px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `6px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
        >
          <VCardText md="2">
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                :color="data.color"
                rounded
              >
                <VIcon
                  :icon="data.icon"
                  size="28"
                />
              </VAvatar>
              <h5 class="text-h5 font-weight-medium">
                {{ data.value }}
              </h5>
            </div>
            <div class="text-body-1">
              {{ data.title }}
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

.logistics-card-statistics:hover {
  @include mixins.elevation(12);

  transition: all 0.1s ease-out;
}
</style>
