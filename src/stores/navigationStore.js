export const useNavigationStore = defineStore('navigationStore', () => {
  const navigationData = ref({})

  function setNavigationData(value) {
    navigationData.value = { ...navigationData.value, ...value }
  }

  return { navigationData, setNavigationData }
})
