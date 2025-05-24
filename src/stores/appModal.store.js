const defaultAppModalProps = {
  visibility: false,
  message: '',
  hasIcon: true,
  type: 'warning',
  title: '',
  hasCancelButton: true,
  confirmButtonPress: null,
  cancelButtonPress: null,
}

export const useAppModalStore = defineStore('appModalStore', () => {
  const appModalProps = ref(defaultAppModalProps)

  function showAppModal(options) {
    appModalProps.value = {
      ...defaultAppModalProps,
      visibility: true,
      ...options,
    }
  }

  function hideAppModal() {
    appModalProps.value = {
      ...appModalProps.value,
      visibility: false,
    }
  }

  return { appModalProps, hideAppModal, showAppModal }
})
