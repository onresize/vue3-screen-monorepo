import { getToken, setToken, removeToken } from '@/utils/tools/auth'
import { encrypt, decrypt } from '@/utils/tools/jsencrypt'
import { login } from '@/api/page1'
import { dayjs } from 'element-plus'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    switchBtn: {
      grade_BJQK: true, // 年级班级均班额
      grade_NJBJ: true, // 年级班级均班额
      grade_NJXS: true, // 年级学生总数
      date_DZXG: true, // 电子巡更
      date_DZWL: true, // 电子围栏
    },
    switchBtnObj: {
      // 年级班级均班额、数据
      grade_BJQK: {
        dataName: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        dataSource: [550, 630, 430, 900, 810, 1000],
      },
      // 年级班级均班额、数据
      grade_NJBJ: {
        dataName: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        dataSource: [550, 630, 430, 900, 810, 790],
      },
      // 年级学生总数、数据
      grade_NJXS: {
        dataName: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        dataSource: [550, 630, 430, 900, 810, 820],
      },
      date_DZXG: true, // 电子巡更、数据
      date_DZWL: true, // 电子围栏、数据
    },
    yearNumber: dayjs().format('YYYY') - 0, // 当前年份
    globalSelectVal: '全部',
    subBtnActive: 1, // 学科按钮状态
    tableData: [], // 摄像头列表数据
    globalPollingDiffId: null, // 区分轮巡列表按钮状态（存储当前列表数据项的id）
    // 重点轮巡按钮和弹窗状态
    sxtBoxList: [
      { show: false, id: null },
      { show: false, id: null },
      { show: false, id: null },
      { show: false, id: null },
    ],
    winBtnList: [{ id: null }, { id: null }, { id: null }, { id: null }], // 轮巡视窗按钮数据
    globalPlayDiffId: null, // 摄像头单独弹窗播放的id
  }),
  getters: {},
  actions: {
    // 登录
    login_Async(userInfo) {
      const username = userInfo?.username.trim()
      const password = userInfo?.password
      const rememberMe = userInfo?.rememberMe
      return new Promise((resolve, reject) => {
        login({ username, password: encrypt(password), rememberMe })
          .then((res) => {
            console.log('pinia_login_Async：', res)
            let [_, ret] = res
            if (ret.code == 200) {
              setToken(ret.token)
              this.token = ret.token
              resolve()
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
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
    // switch按钮组件状态取反
    changeSwitchBtn_Sync(key) {
      this.switchBtn[key] = !this.switchBtn[key]
    },
    // switch按钮组件数组改变
    changeSwitchBtnData_Sync(key, data) {
      this.switchBtnObj[key] = data
    },
    // 改变全局年份
    changeYearNumber_Sync(year) {
      this.yearNumber = year
    },
    // 改变全局下拉框值
    changeGlobalSelectVal_Sync(val) {
      this.yearNumber = val
    },
    // 改变学科: 按钮状态 & 雷达图数据
    changeSubBtnActive_Sync(numKey) {
      this.subBtnActive = numKey
    },
    // 摄像头列表数据改变
    changeTableData_Sync(arr) {
      this.tableData = arr
    },
    // 区分摄像头轮巡状态
    changeGlobalPollingDiffId_Sync(id) {
      console.log('当前表格行轮巡数据id:', id)
      this.globalPollingDiffId = id
    },
    // 重点轮巡按钮状态取反
    changeSxtBoxList_Sync(idx) {
      this.sxtBoxList[idx].show = !this.sxtBoxList[idx].show
    },
    // 重点轮巡按钮id存储、比对备用
    changeSxtBoxListItemId_Sync(idx, id) {
      this.sxtBoxList[idx].id = id
    },
    // 视窗按钮数据统一赋值id
    changeWinBtnListAllId_Sync(id) {
      let arr = this.winBtnList.map((_) => ({ id }))
      this.winBtnList = arr
    },
    // 摄像头单独弹窗播放的id
    changeGlobalPlayDiffId_Sync(id) {
      console.log('当前表格行播放数据id:', id)
      this.globalPlayDiffId = id
    },
  },
  persist: {
    enabled: true, // 开启持久化
    paths: ['yearNumber'], // 需要持久化的数据
    storage: globalThis.localStorage, // 持久化保存在localStorage
  },
})
