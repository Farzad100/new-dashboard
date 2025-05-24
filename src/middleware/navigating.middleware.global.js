import { useAuthStore } from '@/stores/auth.store'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('accessToken').value
  const { currentAdmin, setCurrentAdminInfo } = useCurrentAdminStore()

  // if (!currentAdmin.email) {
  //   const email = useCookie('currentAdmin').value?.email

  //   setCurrentAdminInfo({ email })
  // }

  // if (to.path !== '/login' && !token) {
  //   return navigateTo('/login')
  // }

  // if (to.path === '/' && token) {
  //   return navigateTo('/dashboard')
  // }

  // const { shouldUpdatePassword } = useAuthStore()
  // const validPathsIfUpdatePasswordIsNecessary = ['/login', '/resetPassword']
  // if (shouldUpdatePassword && to.path !== '/login') {
  //   return navigateTo('/login')
  // }
  // const changePasswordPath = '/reset-password'
  // const isChangePasswordPageRefreshed =
  //   to.path === changePasswordPath && from.path === changePasswordPath
  // console.log(shouldUpdatePassword || isChangePasswordPageRefreshed)
  // console.log(2)
  // console.log(validPathsIfUpdatePasswordIsNecessary.includes(to.path))
  // if (shouldUpdatePassword || isChangePasswordPageRefreshed) {
  //   if (!validPathsIfUpdatePasswordIsNecessary.includes(to.path)) {
  //     return navigateTo('/login')
  //   }
  // }
})
