export * from './messageStore'
export * from './settingStore'

//引入持久化插件
import piniaPersist from 'pinia-plugin-persistedstate'
// 使用pinia
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(piniaPersist)

export { pinia }
