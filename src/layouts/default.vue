<script setup>
import { useConfigStore } from '@core/stores/config'
import { AppContentLayoutNav } from '@layouts/enums'
import { switchToVerticalNavOnLtOverlayNavBreakpoint } from '@layouts/utils'
import { useAppModalStore } from '@/stores/appModal.store'

const DefaultLayoutWithHorizontalNav = defineAsyncComponent(() => import('./components/DefaultLayoutWithHorizontalNav.vue'))
const DefaultLayoutWithVerticalNav = defineAsyncComponent(() => import('./components/DefaultLayoutWithVerticalNav.vue'))
const configStore = useConfigStore()

// ℹ️ This will switch to vertical nav when define breakpoint is reached when in horizontal nav layout

// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint()

const { layoutAttrs, injectSkinClasses } = useSkins()

injectSkinClasses()

const { appModalProps } = useAppModalStore()

const modalProps = ref({
  ...appModalProps,
})

useAppModalStore().$subscribe((mutation, state) => {
  modalProps.value = { ...state.appModalProps }
})
</script>

<template>
  <Component
    v-bind="layoutAttrs"
    :is="configStore.appContentLayoutNav === AppContentLayoutNav.Vertical ? DefaultLayoutWithVerticalNav : DefaultLayoutWithHorizontalNav"
  >
    <slot />
    <AppModal
      :title="modalProps.title"
      :visible="modalProps.visibility"
      :text="modalProps.message"
      :type="modalProps.type"
      :has-cancel-button="modalProps.hasCancelButton"
      :has-icon="modalProps.hasIcon"
      @confirm="modalProps.confirmButtonPress"
      @cancel="modalProps.cancelButtonPress"
    />
  </Component>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
