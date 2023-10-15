import { createApp } from 'vue'
import { pinia } from '@/stores/index.js'
import App from '@/App.vue'
import router from '@/router'

// 引入全局适配函数
import { AutoFit } from '@LT/utils'

// 初始化连接socket
import { WebSocketUtil } from '@/utils/UE_Connect/ue-connect'

// 全局注册SvgIcon组件
import SvgIcon from '@cp/SvgIcon/index.vue'

// 全局样式
import '@/styles/var.less'
import '@/styles/mixin.less'
import '@/styles/global.less'

// 引入原子化css
import 'virtual:windi.css'

// 引入elemPlus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入自定义指令
import directives from './directives'
// 注册插件
import plugins from '@/plugins'

// 引入全局图片预览组件
import ImageViewer from '@/components/ImageViewer/index'

const app = createApp(App)

void (() => {
  AutoFit.init(
    {
      el: '#BoDy',
      resize: true,
    },
    true
  )
})()

WebSocketUtil()

app.component('svg-icon', SvgIcon)

app.use(pinia)
app.use(plugins)
app.use(ImageViewer)

// 引入所有svg
void (() => {
  return new Promise(async (res) => {
    await import('@/assets/icons/index')
    res(true)
  })
})()

app.use(directives, app).use(router).mount('#app')

window.vueVm = app
