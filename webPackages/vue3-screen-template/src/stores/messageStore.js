import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    onlyRunOnce: false,
    num: 0,
    iconList: [], // 所有svg图片
    headerBtnActive: 1, // 头部按钮高亮
    timer: '00:00:00',
    setupState: false, // 标头设置按钮高亮
    // UE回调消息
    messageWebSocket: {
      OnHit3DUI: {},
    },
  }),
  getters: {
    getters_headerBtnActive: (state) => state.headerBtnActive,
    getters_timer: (state) => state.timer,
  },
  actions: {
    changeOnlyRunOnce_Sync(res) {
      this.onlyRunOnce = res
    },
    changeNum_Sync(res) {
      this.num++
    },
    changeSvgList_Sync(list) {
      this.iconList = list
    },
    changeBtn_Sync(stateNum) {
      this.headerBtnActive = stateNum
    },
    changeTimer_Sync(tim) {
      this.timer = tim
    },
    changeSetupState_Sync() {
      this.setupState = !this.setupState
    },
    // 公用UE回调处理方法
    setWebsocketMsgRet_Sync(key, data) {
      this.messageWebSocket[key] = data
    },
  },
  persist: {
    enabled: true, // 开启持久化
    paths: ['onlyRunOnce', 'num', 'headerBtnActive', 'timer', 'setupState'], // 需要持久化的数据
    storage: globalThis.localStorage, // 持久化保存在localStorage
  },
})
