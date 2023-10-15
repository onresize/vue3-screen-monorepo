// Layout页面懒加载路由不会生效
import Layout from '@/layout/index.vue'

/**
 * 路由配置
 * @description 所有静态路由都在这里集中管理
 */
const routes = [
  {
    path: '/',
    redirect: 'page1',
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    meta: { title: '404' },
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/pageContainer',
    name: 'pageContainer',
    component: Layout,
    redirect: 'page1',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/page1.vue'),
        meta: {
          title: '综合态势',
        },
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/page2.vue'),
        meta: {
          title: '教学运营',
        },
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('@/views/page3.vue'),
        meta: {
          title: '智慧安防',
        },
      },
      {
        path: '/page4',
        name: 'page4',
        component: () => import('@/views/page4.vue'),
        meta: {
          title: '资产管理',
        },
      },
      {
        path: '/page5',
        name: 'page5',
        component: () => import('@/views/page5.vue'),
        meta: {
          title: '校史陈列',
        },
      },
      {
        path: '/page6',
        name: 'page6',
        component: () => import('@/views/page6.vue'),
        meta: {
          title: '校园迎新',
        },
      },
    ],
  },
]

export default routes
