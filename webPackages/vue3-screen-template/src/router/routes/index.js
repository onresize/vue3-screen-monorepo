// Layout页面懒加载路由不会生效
import Layout from '@/layout/index.vue'

/**
 * 路由配置
 * @description 所有静态路由都在这里集中管理
 */
const routes = [
  {
    path: '/',
    redirect: 'home',
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
          title: 'page1',
        },
      },
    ],
  },
]

export default routes
