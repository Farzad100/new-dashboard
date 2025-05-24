import { defu } from 'defu'

export const useApi = async (url, options = {}) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const accessToken = useCookie('accessToken').value
    const baseURL = runtimeConfig.public.apiBaseUrl
    const shouldUseToken = options.shouldUseToken || true

    let defaultHeaders = {
      'Content-Type': 'application/json',

      // 'Broker-Id': String(runtimeConfig.public.brokerId),
    }

    if (shouldUseToken && accessToken) {
      defaultHeaders = {
        ...defaultHeaders,
        Authorization: `Bearer ${accessToken}`,
      }
    }

    const defaultOptions = {
      baseURL,
      key: toValue(url),
      headers: { ...defaultHeaders, ...options.headers },
    }

    const params = defu(options, defaultOptions)
    const { data, pending, error, refresh } = await $api(url, params)

    return { data, pending, error, refresh }
  } catch (error) {
    return { data: [], pending: false, error, refresh: null }
  }
}
