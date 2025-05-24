export default [
  {
    title: 'User Menu',
    icon: { icon: 'tabler-user' },
    children: [{ title: 'Profile', to: 'dashboard-profile' }],
  },
  {
    title: 'Admins',
    icon: { icon: 'tabler-user-plus' },
    children: [
      { title: 'Admins List', to: 'dashboard-admins' },
      { title: 'Add Admin', to: 'dashboard-admins-new-admin' },
      {
        title: 'Edit Admin',
        to: 'dashboard-admins-edit',
        showOnPathMatch: true,
      },
    ],
  },
  {
    title: 'Users',
    icon: { icon: 'tabler-user' },
    children: [{ title: 'Users List', to: 'dashboard-users' }],
  },
]
