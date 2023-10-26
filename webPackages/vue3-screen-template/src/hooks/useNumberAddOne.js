let nowTimer = null

// nowIntNumber：当前0-24小时整数、speedTim：计时器间隔时长
export function useNumberAddOne(nowIntNumber, speedTim = 1000) {
  const state = reactive({
    nowCount: nowIntNumber,
  })

  // 根据当前时间判断进行操作
  const startFunc = () => {
    nowTimer = setTimeout(startFunc, 1e3)
    if (state.nowCount > 0 && state.nowCount <= 24) {
      state.nowCount += 1
    }
    if (state.nowCount > 24) {
      state.nowCount = -1
    }
    if (state.nowCount <= 0) {
      state.nowCount += 1
    }
    console.log('当前整数小时值：', state.nowCount)
  }

  return {
    ...toRefs(state), // 响应式变量
    startFunc, // 开启方法
    destroyedFunc: () => {
      console.log('清除定时器方法', nowTimer)
      nowTimer && clearTimeout(nowTimer)
    },
  }
}
