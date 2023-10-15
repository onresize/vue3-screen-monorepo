import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),
  getters: {},
  actions: {
    // 登录
    login_Async(userInfo) {
      // const username = userInfo.username.trim()
      // const password = userInfo.password
      // const code = userInfo.code
      // const uuid = userInfo.uuid
      // return new Promise((resolve, reject) => {
      //   login(username, password, code, uuid).then(res => {
      //     setToken(res.token)
      //     this.token = res.token
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },
    // 获取用户信息
    getInfo_Async() {
      return new Promise((resolve, reject) => {
        // getInfo().then(res => {
        //   const user = res.user
        //   const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;
        //   if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     this.roles = res.roles
        //     this.permissions = res.permissions
        //   } else {
        //     this.roles = ['ROLE_DEFAULT']
        //   }
        //   this.name = user.userName
        //   this.avatar = avatar;
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 退出系统
    logOut_Async() {
      return new Promise((resolve, reject) => {
        // logout(this.token).then(() => {
        //   this.token = ''
        //   this.roles = []
        //   this.permissions = []
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
  },
  persist: {
    enabled: true, // 开启持久化
    paths: [], // 需要持久化的数据
    storage: globalThis.localStorage, // 持久化保存在localStorage
  },
})
