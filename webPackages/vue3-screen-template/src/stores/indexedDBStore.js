import localforage from 'localforage'

export const useIndexedDBStore = defineStore('indexedDB', {
  state: () => ({
    filesDB: localforage.createInstance({
      name: 'filesDB',
    }),
    usersDB: localforage.createInstance({
      name: 'usersDB',
    }),
    responseDB: localforage.createInstance({
      name: 'responseDB',
    }),
  }),
  actions: {
    async setFilesDB(key, value) {
      this.filesDB.setItem(key, value)
    },
  },
})

// XXX使用
// import { useIndexedDBStore } from '@/stores/indexedDBStore'
// const indexedDBStore = useIndexedDBStore()
// const file1 = {a: 'hello'}
// indexedDBStore.setfilesDB('file1', file1
