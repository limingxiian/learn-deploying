export default [
  {
    path: '/auth',
    component: '@/layouts/auth/LoginLayout', // 登录专用布局
    // redirect: '/auth/login',
    routes: [
      { path: 'login', component: '@/pages/auth/login' },
    ],
  },
  {
    path: '/',
    component: '@/layouts/admin/AdminLayout', // 默认管理布局
    routes: [
      { path: '/docs', component: '@/pages/docs' },
    ],
  }
]