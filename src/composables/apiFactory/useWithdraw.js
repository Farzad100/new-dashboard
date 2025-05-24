export const useWithdraw = () => {
  const getWithdrawList = () => {
    return useHttpRequest('admin.list')
  }

  return { getWithdrawList }
}
