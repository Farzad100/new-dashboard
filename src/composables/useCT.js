
export const useCT = () => {
  const { t } = useI18n()
  
  const ct = (...keys) => {
    return keys.map(key => t(key)).join(' ')
  }
  
  return { ct }
}
