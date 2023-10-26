import dialogCom from './index.vue'

const showFlowDialog = (clickHandler) => {
  const divEl = document.createElement('div')
  document.body.appendChild(divEl)
  // 渲染弹窗组件
  const app = createApp(dialogCom, {
    onClick() {
      clickHandler &
        clickHandler(() => {
          app.unmount(divEl)
          divEl.remove()
        })
    },
  })
  app.mount(divEl)
}

export const $flowDialog = {
  show: showFlowDialog,
}
