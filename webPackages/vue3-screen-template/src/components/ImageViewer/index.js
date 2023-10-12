import { createApp } from 'vue'
import MyImageViewer from './index.vue'

const app = createApp(MyImageViewer)
const divEl = document.createElement('div')
const vm = app.mount(divEl)
document.body.appendChild(divEl)

const ImagePreview = (urls, options) => {
  let imageArray = []
  if (typeof urls === 'string') imageArray = Object.assign([], [urls])
  if (urls instanceof Array) imageArray = Object.assign([], urls)
  vm.urlList = imageArray

  if (Object.keys(options).length) {
    console.log('属性：', options)
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        const element = options[key]
        console.log('转换后：', element)
        vm.options[key] = element
      }
    }
  }
  vm.isShow = true
}

// XXX调用
//  proxy.$PIC([imageUrl], {
//   initialIndex: 0,
//   infinite: true,
//   hideOnClickModal: false,
// });

export default {
  install: (app) => {
    app.config.globalProperties.$PIC = ImagePreview
  },
}
