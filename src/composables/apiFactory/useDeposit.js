export const useDeposit = () => {
  const getDepositList = () => {
    return useHttpRequest('admin.list')
  }

  return { getDepositList }
}
