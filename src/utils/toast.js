export const toast = ({ message, type = 'success', ...otherOptions }) => {
  useNuxtApp().$toast(message, {
    'position': 'bottom-center',
    'rtl': true,
    'hideProgressBar': true,
    type,
    ...otherOptions,
  })
}
