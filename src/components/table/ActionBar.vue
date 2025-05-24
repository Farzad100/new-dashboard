<script setup>
const props = defineProps({
  visibility: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div
    style="height: 50px"
    class="d-flex align-center"
  >
    <div
      v-if="props.visibility"
      class="email-view-action-bar d-flex align-center text-medium-emphasis px-3"
    >
      <!-- Trash -->
      <IconBtn v-show="true">
        <VIcon icon="tabler-trash" />
        <VTooltip
          activator="parent"
          location="top"
        >
          Delete Mail
        </VTooltip>
      </IconBtn>

      <!-- Read/Unread -->
      <IconBtn>
        <VIcon icon="tabler-mail" />
        <VTooltip
          activator="parent"
          location="top"
        >
          Mark as Unread
        </VTooltip>
      </IconBtn>

      <!-- Move to folder -->
      <IconBtn>
        <VIcon icon="tabler-folder" />
        <VTooltip
          activator="parent"
          location="top"
        >
          Move to
        </VTooltip>

        <VMenu activator="parent">
          <VList density="compact">
            <template
              v-for="moveTo in emailMoveToFolderActions"
              :key="moveTo.title"
            >
              <VListItem
                :class="
                  shallShowMoveToActionFor(moveTo.action) ? 'd-flex' : 'd-none'
                "
                class="align-center"
                href="#"
                @click="handleMoveMailsTo(moveTo.action)"
              >
                <template #prepend>
                  <VIcon
                    :icon="moveTo.icon"
                    class="me-2"
                    size="20"
                  />
                </template>
                <VListItemTitle class="text-capitalize">
                  {{ moveTo.action }}
                </VListItemTitle>
              </VListItem>
            </template>
          </VList>
        </VMenu>
      </IconBtn>

      <!-- Update labels -->
      <IconBtn>
        <VIcon icon="tabler-tag" />
        <VTooltip
          activator="parent"
          location="top"
        >
          Label
        </VTooltip>

        <VMenu activator="parent">
          <VList density="compact">
            <VListItem
              v-for="label in labels"
              :key="label.title"
              href="#"
              @click.stop="updateMailLabel(label.title)"
            >
              <template #prepend>
                <VBadge
                  inline
                  :color="resolveLabelColor(label.title)"
                  dot
                />
              </template>
              <VListItemTitle class="ms-2 text-capitalize">
                {{ label.title }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </IconBtn>
    </div>
  </div>
</template>
