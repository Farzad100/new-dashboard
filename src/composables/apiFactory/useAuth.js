import { useAuthStore } from '@/stores/auth.store'
import { useCurrentAdminStore } from '@/stores/currentAdmin.store'

export const useAuth = () => {
  const loginUser = async requestData => {
    try {
      const options = { ...requestData, key: Date.now().toString() }
      const { setShouldUpdatePassword } = useAuthStore()
      const { data } = await useHttpRequest('auth.login', options)

      if (!data?.token?.length) return

      const { setCurrentAdminInfo } = useCurrentAdminStore()
      const parsedRequestData = JSON.parse(requestData.body)
      const { email } = parsedRequestData

      useCookie('accessToken').value = data.token
      useCookie('currentAdmin').value = JSON.stringify({ email })
      setCurrentAdminInfo({ email, ...data })

      if (data.required_to_change_password) {
        setShouldUpdatePassword(true)
        useCookie('shouldUpdatePassword').value = true

        return navigateTo({ name: 'update-initial-password' })
      }

      navigateTo({ name: 'dashboard' })
    } catch (error) {}
  }

  const updateInitialPassword = async ({ password, confirmPassword }) => {
    try {
      const options = {
        body: JSON.stringify({
          password,
          'password_confirmation': confirmPassword,
        }),
      }

      const { isSuccess } = await useHttpRequest('auth.updatePassword', options)

      if (isSuccess) {
        navigateTo('/dashboard', { replace: true })
      }
    } catch (error) {}
  }

  return { loginUser, updateInitialPassword }
}
