import localForage from 'localforage'
// 文档：https://localforage.docschina.org/

export const useIndexedDBStore = defineStore('indexedDB', {
  state: () => ({
    responseDB: localForage.createInstance({
      name: 'responseDB',
    }),
  }),
  actions: {
    async setResponseDB(key, value) {
      this.responseDB.setItem(key, value)
    },
  },
})

// XXX使用
// import { useIndexedDBStore } from '@/stores/indexedDBStore'
// const indexedDBStore = useIndexedDBStore()
// indexedDBStore.setResponseDB('file1', {a: 'hello'})
