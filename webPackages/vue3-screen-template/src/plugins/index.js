import { Debounce, Throttle } from '@LT/utils'
import auth from './plugin/auth'
import cache from './plugin/cache'
import errorHandler from './plugin/errorHandler'

export default function installPlugins(app) {
  // 认证对象
  app.config.globalProperties.$auth = auth
  // 缓存对象
  app.config.globalProperties.$cache = cache
  // 防抖
  app.config.globalProperties.$D = Debounce
  // 节流
  app.config.globalProperties.$T = Throttle
  // 全局捕获错误
  app.config.errorHandler = errorHandler
}
