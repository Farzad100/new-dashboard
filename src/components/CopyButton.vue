<template>
  <VBtn
    class="position-absolute app-card-code-copy-icon"
    size="small"
    variant="text"
    @click="() => { copy(props.textToCopy) }"
  >
    {{ props.textToCopy }}
    <VIcon
      :icon="copied ? 'tabler-check' : 'tabler-copy'"
      size="20"
    />
  </VBtn>
</template>

<script setup>
const props = defineProps({
  textToCopy: {
    type: String,
    required: true,
  },
})

const { copy, copied } = useClipboard()
</script>