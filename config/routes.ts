export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
    ],
  },
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', component: './InterfaceInfo', hideInMenu:true},
  {
    path: '/account',
    name: '个人中心',
    icon: 'user',
    routes: [
      {
        name: '个人中心',
        path: '/account/accountcenter',
        component: './Account/AccountCenter',
      },
      {
        name: '个人设置',
        path: '/account/accountsettings',
        component: './Account/AccountSettings',
      },
      {
        name:'密钥管理',
        path: '/account/secret',
        component: './Account/Secret',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '接口分析', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },
    ],
  },
  { path: '/usesdk', name: '接口使用说明', icon: 'code', component: './UseSdk' },
  { path: '*', layout: false, component: './404' },
];
