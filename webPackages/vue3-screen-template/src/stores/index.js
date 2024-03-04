export * from './messageStore'
export * from './settingStore'

// 使用pinia
import { createPinia } from 'pinia'

//引入持久化插件
import piniaPersist from 'pinia-plugin-persistedstate'

// 自定义压缩持久化插件
import { persistWithCompressionPlugin } from './storePlugins/index'

const pinia = createPinia()
// pinia.use(piniaPersist)
pinia.use(persistWithCompressionPlugin)

export { pinia }
