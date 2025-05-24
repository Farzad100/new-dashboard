import * as serverEndPoints from '@/server/endpoints'

export const useHttpRequest = async (endpoint, options) => {
  try {
    const [category, categoryName] = endpoint.split('.')
    const currentEndPoint = serverEndPoints[category][categoryName]
    const { path, method } = currentEndPoint
    const { error, data } = await useApi(path, { method, ...options })
    const errorMessage = error?.data?.error || error
    const isSuccess = !data && !error

    if (errorMessage?.length > 0) {
      useNuxtApp().$toast(errorMessage, {
        'position': 'bottom-center',
        'rtl': true,
        'theme': 'auto',
        'type': 'error',
      })
    }

    return { data, error, isSuccess, errorMessage }
  } catch (error) {
    useNuxtApp().$toast('عملیات با خطا مواجه شد', {
      'position': 'bottom-center',
      'rtl': true,
      'hideProgressBar': true,
    })
  }
}
