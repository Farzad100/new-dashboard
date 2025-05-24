<script setup>
const props = defineProps({
  visibility: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['close', 'search'])

const router = useRouter()
const { query } = useRoute()

const firstNameInitialValue = query.firstname ? query.firstname : ''
const lastNameInitialValue = query.lastname ? query.lastname : ''
const emailInitialValue = query.email ? query.email : ''

const firstName = ref(firstNameInitialValue)
const lastName = ref(lastNameInitialValue)
const email = ref(emailInitialValue)

watch([firstName, lastName, email], values => {
  router.push({
    query: {
      firstname: values[0],
      lastname: values[1],
      email: values[3],
    },
  })
})
</script>

<template>
  <VDialog
    :model-value="props.visibility"
    max-width="800"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('Search')">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="firstName"
              label="First Name"
              placeholder="John"
            />
          </VCol>

          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="lastName"
              :label="$t('Last Name')"
              persistent-hint
              placeholder="Doe"
            />
          </VCol>

          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="email"
              label="email"
              placeholder="peter"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="$emit('close')"
        >
          {{ $t('Close') }}
        </VBtn>
        <VBtn @click="$emit('search')">
          {{ $t('Search') }}
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
