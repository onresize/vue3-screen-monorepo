import axios from 'axios'
import { getToken } from '@/utils/tools/auth'
import errorCode from '@/utils/tools/errorCode'

// 是否显示重新登录
export let isRelogin = { show: false }

export default function server(obj) {
  axios.defaults.withCredentials = false // 跨域是否携带cookie
  axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
  // axios.defaults.headers['Content-Type'] = 'multipart/form-data'
  return new Promise((resolve, reject) => {
    const request = axios.create({
      // baseURL:'',
      timeout: 10000,
    })

    // 请求拦截
    request.interceptors.request.use(
      (config) => {
        console.log('进入请求拦截：', config)
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
        if (getToken() && !isToken) {
          config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
      },
      (err) => {
        console.log('请求拦截抛出错误：', err)
        reject(err)
      }
    )

    // 响应拦截
    request.interceptors.response.use(
      (response) => {
        console.log('进入响应拦截:', response)
        // 未设置状态码则默认成功状态
        const code = response.data.code || 200
        // 获取错误信息
        const msg = errorCode[code] || response.data.msg || errorCode['default']

        // 二进制数据则直接返回
        if (
          response.request.responseType === 'blob' ||
          response.request.responseType === 'arraybuffer'
        ) {
          return response.data
        }

        if (code === 401) {
          // if (!isRelogin.show) {
          //   isRelogin.show = true
          //   ElMessageBox.confirm(
          //     '登录状态已过期，您可以继续留在该页面，或者重新登录',
          //     '系统提示',
          //     {
          //       confirmButtonText: '重新登录',
          //       cancelButtonText: '取消',
          //       type: 'warning',
          //     }
          //   )
          //     .then(() => {
          //       isRelogin.show = false
          //       // useUserStore().logOut().then(() => {
          //       //   location.href = '/index';
          //       // })
          //     })
          //     .catch(() => {
          //       isRelogin.show = false
          //     })
          // }
          // return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          ElMessage({ message: msg, type: 'error' })
          return Promise.reject(new Error(msg))
        } else if (code === 601) {
          ElMessage({ message: msg, type: 'warning' })
          return Promise.reject(new Error(msg))
        } else if (code !== 200) {
          ElNotification.error({ title: msg })
          return Promise.reject('error')
        } else {
          return Promise.resolve(response.data)
        }
      },
      (err) => {
        console.log('响应拦截抛出错误：', err)
        const msg = err.message || errorCode['default']
        ElMessage({ message: msg, type: 'error' })
        reject(err)
      }
    )

    resolve(request({ ...obj }))
  })
}
