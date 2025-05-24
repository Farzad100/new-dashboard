export const useUser = () => {
  const getUserList = options => {
    return useHttpRequest('user.list', options)
  }

  const getUserInfo = options => {
    return useHttpRequest('user.info', options)
  }

  const getUserBalance = options => {
    return useHttpRequest('user.balance', options)
  }

  const getUserWallet = options => {
    return useHttpRequest('user.wallet', options)
  }

  return { getUserList, getUserInfo, getUserBalance, getUserWallet }
}
