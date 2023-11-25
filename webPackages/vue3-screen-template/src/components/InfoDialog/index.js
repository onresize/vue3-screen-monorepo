import inFoDialogCom from './index.vue'

const showInfoDialog = (clickHandler, showVideo, pathInfo) => {
  const divEl = document.createElement('div')
  document.body.appendChild(divEl)

  const delDom = () => {
    app.unmount(divEl)
    divEl.remove()
  }
  // 渲染弹窗组件
  const app = createApp(inFoDialogCom, {
    onClick() {
      clickHandler && clickHandler(delDom)
    },
    onShowVideo: () => showVideo(),
    pathInfo,
  })
  app.mount(divEl)
  // 销毁dom
  return () => delDom()
}

export const $infoDialog = {
  show: showInfoDialog,
}
