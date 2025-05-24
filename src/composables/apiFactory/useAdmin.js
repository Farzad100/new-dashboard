export const useAdmin = () => {
  const getAdminList = options => {
    return useHttpRequest('admin.list', options)
  }

  const getAdminLoginHistory = options => {
    return useHttpRequest('admin.loginHistory', options)
  }

  const addAdmin = options => {
    return useHttpRequest('admin.add', options)
  }

  const changePassword = options => {
    return useHttpRequest('admin.changePassword', options)
  }

  const getChangePasswordHistory = () => {
    return useHttpRequest('admin.changePasswordHistory')
  }

  const edit = options => {
    return useHttpRequest('admin.edit', options)
  }

  const enable2fa = options => {
    return useHttpRequest('admin.enable2fa', options)
  }

  const verify2fa = options => {
    return useHttpRequest('admin.verify2fa', options)
  }

  return {
    getAdminList,
    getAdminLoginHistory,
    addAdmin,
    getChangePasswordHistory,
    changePassword,
    edit,
    enable2fa,
    verify2fa,
  }
}
