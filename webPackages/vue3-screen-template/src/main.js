import { pinia } from '@/stores'
import App from '@/App.vue'
import router from '@/router'

// 引入全局适配函数
import { AutoFit } from '@LT/utils'

// 初始化连接socket
import { WebSocketUtil } from '@/utils/UE_Connect/ue-connect'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import XEUtils from 'xe-utils'
import {
  // 可选组件
  Column,
  // 表格
  Table,
} from 'vxe-table'
import '@/styles/vxeTable.scss'

// 全局注册SvgIcon组件
import SvgIcon from '@cp/SvgIcon/index.vue'

// 全局样式
import '@/styles/var.less'
import '@/styles/mixin.less'
import '@/styles/global.less'

// 引入原子化css
import 'virtual:windi.css'

// 引入自定义指令
import directives from './directives'
// 注册插件
import plugins from '@/plugins'

// 引入全局图片预览组件
import ImageViewer from '@cp/ImageViewer/index'

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

const useTable = (_) => _.use(Column).use(Table)

app.use(pinia)
app.use(router)
app.use(plugins)
app.use(ImageViewer) // 图片预览插件
app.use(useTable)

// 引入所有svg
void (() => {
  return new Promise(async (res) => {
    await import('@/assets/icons/index')
    res(true)
  })
})()

app.use(directives, app).mount('#app')

window.vueVm = app
