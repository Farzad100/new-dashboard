import { useI18n } from 'vue-i18n'

export const useValidator = () => {
  const { t } = useI18n()

  const validatePassword = password => {
    if (password?.length < 8) {
      return t('Password must be at least 8 characters long.')
    }

    if (!/[A-Z]/.test(password)) {
      return t('Password must contain at least one uppercase letter.')
    }

    if (!/\d/.test(password)) {
      return t('Password must contain at least one digit.')
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return t(
        'Password must contain at least one special character (!#$%^&*()_+[]:;<>,.?~)',
      )
    }

    return true
  }

  const isRequired = value => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
      return t('This field is required')

    return !!String(value).trim().length || t('This field is required')
  }

  const validateEmail = email => {
    if (isEmpty(email)) return true

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (Array.isArray(email))
      return (
        email.every(val => re.test(String(val))) ||
        t('The Email field must be a valid email')
      )

    return re.test(String(email)) || t('The Email field must be a valid email')
  }

  return { validatePassword, validateEmail, isRequired }
}
