import axios from 'axios'
import { useMessageStore } from '@/stores'

const store = useMessageStore()

export default function server(obj: any) {
  axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
  axios.defaults.withCredentials = false
  return new Promise((resolve, reject) => {
    const request = axios.create({
      baseURL: obj.url.includes('/api')
        ? import.meta.env.VITE_APP_OTHER_API
        : import.meta.env.VITE_APP_BASE_API,
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
