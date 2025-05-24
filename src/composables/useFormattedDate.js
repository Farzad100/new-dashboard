import { useI18n } from 'vue-i18n'

export const useFormattedDate = timestamp => {
  const { locale } = useI18n({ useScope: 'global' })
  if (!timestamp) return ''

  const timeOptions = { hour12: false, numberingSystem: 'latn' }

  const miliSecondTimestamp = timestamp * 1000
  
  const date = new Date(miliSecondTimestamp).toLocaleDateString(
    locale.value,
    timeOptions,
  )

  const time = new Date(miliSecondTimestamp).toLocaleTimeString(
    locale.value,
    timeOptions,
  )

  return `${date} - ${time}`
}
