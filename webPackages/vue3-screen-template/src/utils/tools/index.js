import { Debounce, Throttle } from '@LT/utils'
import errorHandler from './errorHandler'

// 全局注册工具类函数
export default {
  install: (app) => {
    app.config.globalProperties.$D = Debounce
    app.config.globalProperties.$T = Throttle // 全局捕获错误
    app.config.errorHandler = errorHandler // 全局错误捕获
  },
}
