<script setup>
import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs'

const { t } = useI18n()
const { getAdminList } = useAdmin()
const { navigationData, setNavigationData } = useNavigationStore()

useHead({
  title: t('Admin Profile'),
})

const currentTab = ref('tab-1')
const loggedInAdminData = ref(navigationData?.loggedInAdminData ?? null)
const userData = ref({})
const userDataExists = typeof loggedInAdminData?.value?.name === 'string'

const setLoggedInAdminData = async () => {
  const { data } = await getAdminList({ query: { email: useCookie('currentAdmin').value.email } })
  const loggedInAdminData = data?.objects[0]

  setNavigationData({ loggedInAdminData })
  setUserData(loggedInAdminData)
}

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'

  return 'primary'
}

const resolveUserRoleVariant = role => {
  if (role === 'subscriber')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
  if (role === 'author')
    return {
      color: 'success',
      icon: 'tabler-circle-check',
    }
  if (role === 'maintainer')
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'tabler-pencil',
    }
  if (role === 'admin')
    return {
      color: 'secondary',
      icon: 'tabler-server-2',
    }

  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const setUserData = data => {
  userData.value = {
    id: data.id,
    fullName: `${data.name}  ${data.family}`,
    role: data.is_super_admin ? t('Super Admin') : t('Admin'),
    alias: data.alias,
    email: useCookie('currentAdmin').value.email,
    status: data.is_active ? t('Active') : t('Inactive'),
  }
}

if (!userDataExists) {
  setLoggedInAdminData()
}

if (userDataExists) {
  setUserData(loggedInAdminData.value)
}
</script>

<template>
  <VCard>
    <div class="d-flex">
      <div>
        <VTabs
          v-model="currentTab"
          direction="vertical"
        >
          <VTab>
            <VIcon
              start
              icon="tabler-user"
            />
            {{ $t('User Data') }}
          </VTab>

          <VTab v-if="!loggedInAdminData?.has_two_fa">
            <VIcon
              start
              icon="tabler-shield-lock"
            />
            {{ $t('Security Setting') }}
          </VTab>

          <VTab>
            <VIcon
              start
              icon="tabler-lock"
            />
            {{ $t('Change Password') }}
          </VTab>

          <VTab>
            <VIcon
              start
              icon="tabler-history"
            />
            {{ $t('Login History') }}
          </VTab>
        </VTabs>
      </div>

      <VCardText>
        <VWindow
          v-model="currentTab"
          class="ms-3"
        >
          <VWindowItem value="tab-1">
            <VRow>
              <!-- SECTION User Details -->
              <VCol cols="12">
                <VCard
                  v-if="!userData.fullName"
                  class="pt-10 pb-10"
                >
                  <VSkeletonLoader
                    class="mx-auto"
                    max-width="1200"
                    type="card, divider, paragraph, paragraph, paragraph"
                  />
                </VCard>
                <VCard v-if="userData.fullName">
                  <VCardText class="text-center pt-15">
                    <!-- 👉 Avatar -->
                    <VAvatar
                      rounded
                      :size="100"
                      :color="!userData.avatar ? 'primary' : undefined"
                      :variant="!userData.avatar ? 'tonal' : undefined"
                    >
                      <VImg
                        v-if="userData.avatar"
                        :src="userData.avatar"
                      />
                      <span
                        v-else
                        class="text-5xl font-weight-medium"
                      >
                        {{ avatarText(userData.fullName) }}
                      </span>
                    </VAvatar>

                    <!-- 👉 User fullName -->
                    <h6 class="text-h4 mt-4">
                      {{ userData.fullName }}
                    </h6>

                    <!-- 👉 Role chip -->
                    <VChip
                      label
                      :color="resolveUserRoleVariant(userData.role).color"
                      size="small"
                      class="text-capitalize mt-3"
                    >
                      {{ userData.role }}
                    </VChip>

                    <VRow class="justify-center mt-5">
                      <VCol cols="1">
                        <VBtn
                          block
                          color="info"
                          variant="text"
                          :to="`/dashboard/admins/edit?id=${userData.id}`"
                        >
                          {{ $t('Edit') }}
                        </VBtn>
                      </VCol>
                    </VRow>
                  </VCardText>

                  <VDivider />

                  <!-- 👉 Details -->
                  <VCardText>
                    <!-- 👉 User Details list -->
                    <VList class="card-list mt-2">
                      <VListItem>
                        <VListItemTitle>
                          <h6 class="text-h6">
                            {{ $t('Name') }}:
                            <span class="text-body-1">
                              {{ userData.fullName }}
                            </span>
                          </h6>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle>
                          <h6 class="text-h6">
                            {{ $t('Email') }}:
                            <span class="text-body-1">{{ userData.email }}</span>
                          </h6>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle>
                          <h6 class="text-h6">
                            {{ $t('Role') }}:
                            <span class="text-capitalize text-body-1">{{ userData.role }}</span>
                          </h6>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle>
                          <h6 class="text-h6">
                            {{ $t('Status') }}:
                            <VChip
                              label
                              size="small"
                              :color="resolveUserStatusVariant(userData.status)"
                              class="text-capitalize"
                            >
                              {{ userData.status }}
                            </VChip>
                          </h6>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle>
                          <h6 class="text-h6">
                            {{ $t('Last Change Password') }}:
                            <span class="text-body-1">{{ useCookie('lastChangePasswordTime').value?.replaceAll('"', '')
                            }}</span>
                          </h6>
                        </VListItemTitle>
                      </VListItem>
                    </VList>
                  </VCardText>
                </VCard>
              </VCol>
              <!-- !SECTION -->
            </VRow>
          </VWindowItem>

          <VWindowItem
            v-if="!loggedInAdminData?.has_two_fa"
            value="tab-2"
          >
            <ProfileTwoFactor />
          </VWindowItem>

          <VWindowItem value="tab-3">
            <ProfileUpdatePassword />
          </VWindowItem>

          <VWindowItem value="tab-3">
            <ProfileLoginHistory />
          </VWindowItem>
        </VWindow>
      </VCardText>
    </div>
  </VCard>
</template>
