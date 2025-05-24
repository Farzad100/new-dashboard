<script setup>
const user = ref('')
const article = ref('')
const orderType = ref(null)
const paymentStatus = ref(null)
const date = ref('')

const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
</script>

<template>
  <VForm
    title="Advanced Search"
    class="pa-5"
    @submit.prevent="() => {}"
  >
    <h3 class="mb-5">
      {{ $t('Advanced Search') }}
    </h3>
    <VRow>
      <!-- User -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="user"
          label="User"
          placeholder="User"
        />
      </VCol>

      <!-- Article -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="article"
          label="Article"
          placeholder="Article"
        />
      </VCol>

      <!-- Payment Status -->
      <VCol
        cols="12"
        md="4"
      >
        <AppSelect
          v-model="paymentStatus"
          :items="items"
          label="Payment Status"
          placeholder="Select Payment Status"
        />
      </VCol>

      <!-- Order Type -->
      <VCol
        cols="12"
        md="4"
      >
        <AppSelect
          v-model="orderType"
          :items="items"
          label="Order Type"
          placeholder="Select Order Type"
        />
      </VCol>

      <!-- Start Date -->
      <VCol
        cols="12"
        md="4"
      >
        <AppDateTimePicker
          v-model="date"
          label="From"
          placeholder="Select date"
        />
      </VCol>

      <!-- End Date -->
      <VCol
        cols="12"
        md="4"
      >
        <AppDateTimePicker
          v-model="date"
          label="To"
          placeholder="Select date"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
