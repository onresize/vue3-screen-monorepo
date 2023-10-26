import request from './request'
// 页面所有api统一使用async/await方式调用
import { awaitTo } from '@LT/utils'

export const getTableList = () => {
  return awaitTo(
    request({
      url: '/baseApi/table/list',
      method: 'GET',
    })
  )
}

export const login = (data) => {
  return awaitTo(
    request({
      url: '/baseApi/login',
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      data,
    })
  )
}
