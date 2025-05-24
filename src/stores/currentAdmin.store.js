export const useCurrentAdminStore = defineStore('currentAdmin', () => {
  const currentAdmin = ref({})

  function setCurrentAdminInfo(value) {
    currentAdmin.value = { ...currentAdmin.value, ...value }
  }

  return {
    currentAdmin,
    setCurrentAdminInfo,
  }
})
