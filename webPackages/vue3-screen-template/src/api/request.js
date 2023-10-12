import axios from 'axios'
import { useMessageStore } from '@/stores'

const store = useMessageStore()

export default function server(obj) {
  axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
  axios.defaults.withCredentials = false // 跨域携带cookie
  return new Promise((resolve, reject) => {
    const request = axios.create({
      // baseURL:'',
      timeout: 10000,
    })

    request.interceptors.request.use(
      (config) => {
        config.cancelToken = new axios.CancelToken(function (v) {
          store.cancelAxios = v
        })
        return config
      },
      (err) => reject(err)
    )

    request.interceptors.response.use((response) => response.data)

    resolve(request({ ...obj }))
  })
}
