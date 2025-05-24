<script setup>
import { useAppModalStore } from '@/stores/appModal.store'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  hasCancelButton: {
    type: Boolean,
    required: false,
  },
  hasIcon: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits([
  'confirm',
  'update',
  'cancel',
])

const { hideAppModal } = useAppModalStore()

const onUpdateModelValue = value => {
  if (!value) hideAppModal()
  
  // emit('update', value)
}

const handleConfirmButtonPress = () => {
  emit('confirm')
  hideAppModal()
}

const handleCancelButtonPress = () => {
  emit('cancel')
  hideAppModal()
}
</script>

<template>
  <VDialog
    :model-value="props.visible"
    max-width="800"
    @update:model-value="onUpdateModelValue"
  >
    <VCard>
      <VCardText class="text-center px-10 py-6">
        <VBtn
          icon
          variant="outlined"
          :color="props.type"
          class="my-4"
          style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
        >
          <span class="text-3xl">
            <VIcon
              v-if="props.type === 'success'"
              icon="tabler-check"
            />
            <VIcon
              v-if="props.type === 'error'"
              icon="tabler-x"
            />
            <VIcon
              v-if="props.type === 'warning'"
              icon="tabler-exclamation-mark"
            />
          </span>
        </VBtn>

        <h1 class="text-h4 mb-4">
          {{ props.title }}
        </h1>

        <p>{{ props.text }}</p>

        <div class="d-flex justify-end w-100">
          <VBtn
            color="success"
            @click="handleConfirmButtonPress"
          >
            {{ $t('Ok') }}
          </VBtn>

          <VBtn
            v-if="props.hasCancelButton"
            color="error"
            class="ms-4"
            @click="handleCancelButtonPress"
          >
            {{ $t('Cancel') }}
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
