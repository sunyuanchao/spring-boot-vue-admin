import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noRedirect` will not redirect in the levelBar
  * noDropDown : if `noDropDown:true` will not has submenu in the sidebar
  * meta : `{ permission: ['a:xx'] }`  will control the page permission
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    icon: 'dashboard',
    noDropDown: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: _import('dashboard/index'),
      meta: { title: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    icon: 'permission',
    noDropDown: true,
    children: [{
      path: 'index',
      name: 'Role',
      component: _import('role/index'),
      meta: { permission: ['role:list'] }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    icon: 'username',
    noDropDown: true,
    children: [{
      path: 'index',
      name: 'User',
      component: _import('user/index'),
      meta: { permission: ['user:list'] }
    }]
  },

  {
    path: '/user/center',
    component: Layout,
    redirect: '/user/center/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'UserCenter',
      component: _import('userCenter/index')
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]
