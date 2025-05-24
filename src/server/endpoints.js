export const user = {
  list: {
    path: '/v1/users',
    method: 'GET',
  },
  info: {
    path: '',
    method: '',
  },
  balance: {
    path: '',
    method: '',
  },
  wallet: {
    path: '',
    method: '',
  },
}

export const admin = {
  list: {
    path: '/v1/admin/lists',
    method: 'GET',
  },
  loginHistory: {
    path: '/v1/admin/login/histories',
    method: 'GET',
  },
  updateInitialPassword: {
    path: '/v1/admin/update/initial/password',
    method: 'patch',
  },
  changePasswordHistory: {
    path: '/v1/admin/password/histories?page=1&per_page=1',
    method: 'GET',
  },
  changePassword: {
    path: '/v1/admin/update/password',
    method: 'patch',
  },
  add: {
    path: '/v1/admin/add/new-admin',
    method: 'POST',
  },
  edit: {
    path: '/v1/admin/update',
    method: 'patch',
  },
  enable2fa: {
    path: '/v1/admin/enable/two-fa',
    method: 'POST',
  },
  verify2fa: {
    path: '/v1/admin/verify/two-fa',
    method: 'POST',
  },
}

export const order = {
  open: {
    path: '',
    method: 'get',
  },
  closed: {
    path: '',
    method: '',
  },
  trades: {
    path: '',
    method: '',
  },
  info: {
    path: '',
    method: '',
  },
  cancel: {
    path: '',
    method: '',
  },
}

export const deposit = {
  list: {
    path: '',
    method: 'get',
  },
}

export const withdraw = {
  list: {
    path: '',
    method: 'get',
  },
}

export const auth = {
  login: {
    path: '/v1/admin/auth/login',
    method: 'POST',
  },
  updatePassword: {
    path: '/v1/admin/update/initial/password',
    method: 'PATCH',
  },
}
