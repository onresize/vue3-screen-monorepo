import request from './request'
// //页面所有api统一使用async/await方式调用
import { awaitTo } from '@LT/utils'

export const getTableList = () => {
  return awaitTo(
    request({
      url: '/vueApi/table/list',
      method: 'GET',
    })
  )
}
