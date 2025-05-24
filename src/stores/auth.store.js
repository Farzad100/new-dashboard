export const useAuthStore = defineStore('auth', () => {
  const shouldUpdatePassword = ref(false)

  function setShouldUpdatePassword(value) {
    shouldUpdatePassword.value = value
  }

  return { shouldUpdatePassword, setShouldUpdatePassword }
})
