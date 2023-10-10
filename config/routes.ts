export default [
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/secret', name: '个人密钥', icon: 'lock', component: './Secret' },
  { path: '/interface_info/:id', name: '查看接口', component: './InterfaceInfo', hideInMenu:true},
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
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
  { path: '*', layout: false, component: './404' },
];
