import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// mock语法： http://mockjs.com/examples.html
const data = Mock.mock({
  'items|100': [
    {
      id: '@id',
      title: '@sentence(5, 10)',
      'status|1': ['published', 'draft', 'deleted'],
      name: '@cname',
      display_time: '@datetime',
      Chinse: '@integer(0, 100)',
      methNum: '@integer(0, 100)',
      EngLish: '@integer(0, 100)',
      url: '@url',
      ip: '@ip',
    },
  ],
})

export default [
  {
    url: '/vueApi/table/list',
    method: 'get',
    // 忽略引用但没used eslint检测
    // eslint-disable-next-line
    response: (config) => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items,
        },
      }
    },
  },
] as MockMethod[]
