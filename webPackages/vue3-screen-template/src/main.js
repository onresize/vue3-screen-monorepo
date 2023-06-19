import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

import { WebSocketUtil } from '@/utils/UE_Connect/ue-connect'
// 初始化连接socket
WebSocketUtil()

// 全局样式
import '@/styles/var.less'
import '@/styles/mixin.less'
import '@/styles/global.less'

import 'virtual:windi.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入自定义指令
import directives from './directives'

// 引入全局图片预览组件
import ImageViewer from '@/components/ImageViewer/index'

const app = createApp(App)
app
  .use(directives, app)
  .use(ImageViewer)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .mount('#app')
