import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: 'Hello World',
    onlyRunOnce: false,
    num: 0,
    iconList: [], // 所有svg图片
  }),
  getters: {
    fullMessage: (state) => `The message is "${state.message}".`,
  },
  actions: {
    // 异步更新 message
    async updateMessage(newMessage) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.message = newMessage
          resolve('Async done.')
        }, 3000)
      })
    },
    // 同步更新 message
    updateMessageSync(newMessage) {
      // 这里的 this 是当前的 Store 实例
      this.message = newMessage
      return 'Sync done.'
    },
    updateOnlyRunOnceSync(res) {
      console.log('updateOnlyRunOnceSync： ', res)
      this.onlyRunOnce = res
      return 'Sync done.'
    },
    updateNumSync(res) {
      this.num++
      return 'Sync done.'
    },
    changeSvgList(list) {
      this.iconList = list
    },
  },
  persist: {
    enabled: true, // 开启持久化
    paths: ['onlyRunOnce', 'num', 'iconList'], // 需要持久化的数据
    storage: globalThis.localStorage, // 持久化保存在localStorage
  },
})
