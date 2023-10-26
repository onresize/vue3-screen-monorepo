<script setup>
import { dayjs } from 'element-plus'
import { useNumberAddOne } from '@/hooks'

const state = reactive({
  playingState: false,
  braceVal: dayjs().format('HH') - 0,
  btnList: ['多云', '晴天', '下雨', '秋风', '东雪'],
})

const { nowCount, startFunc, destroyedFunc } = useNumberAddOne(state.braceVal)

const formatTooltip = computed(
  () => (val) => String(val || 0).padStart(2, '0') + ':00'
)

const playingStateClick = () => {
  state.playingState = !state.playingState
  if (state.playingState) {
    // 正在播放...
    startFunc()
  } else {
    // (暂停、停止)播放...
    destroyedFunc()
    console.log('👉页面获取nowCount：', nowCount.value)
  }
}

watch(
  () => nowCount.value,
  (val) => {
    if (state.playingState) {
      state.braceVal = nowCount
      console.log('监听：', state.braceVal)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

onMounted(destroyedFunc)
</script>

<template>
  <div class="box">
    <!-- 时间拉条 -->
    <div class="brace">
      <el-slider
        size="small"
        v-model="state.braceVal"
        :max="24"
        :step="1"
        :format-tooltip="formatTooltip"
      />
    </div>
    <!-- 时间、天气状态按钮、暂停开启 -->
    <div class="centerBox">
      <div class="timer_l">{{ formatTooltip(state.braceVal) }}</div>
      <div class="tQBtn_c"></div>
      <div
        :class="['bFBtn_r', state.playingState ? 'playState' : 'pauseState']"
        @click="$D(playingStateClick, 200, '')"
      ></div>
    </div>
    <!-- 五个天气按钮 -->
    <div class="bottomBox">
      <div v-for="(_, idx) in state.btnList" :key="idx" class="item active">
        {{ _ }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 350px;
  height: 55px;
  background: url('@img/common/ZhiBeiZhen/znz_bg.png') no-repeat center;
  background-size: 100% 100%;
  transform: translate(-20px, -20px);
  position: relative;
  filter: drop-shadow(0 0px 5px #8f9196);

  .brace {
    width: 245px;
    height: 16px;
    // border: 1px solid yellow;
    position: absolute;
    top: 17px;
    left: 80px;
    display: flex;
    align-items: center;
    :deep(.el-slider__runway) {
      background-color: transparent !important;
    }
    :deep(.el-slider__bar) {
      background-color: transparent !important;
    }
    :deep(.el-slider__button) {
      width: 15px !important;
      height: 15px !important;

      border: none;
      background: url('@img/common/ZhiBeiZhen/dian.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

  .centerBox {
    width: 190px;
    height: 20px;
    // border: 1px solid red;
    position: absolute;
    top: 34px;
    left: 88px;
    display: flex;
    justify-content: space-between;

    .timer_l {
      width: 35px;
      color: #fff;
      height: 20px;
      line-height: 20px;
      margin-top: 1px;
      font-size: 12px;
      font-weight: bold;
    }
    .tQBtn_c {
      width: 77px;
      height: 18px;
      margin-right: -12px;
      margin-top: 3px;
      background: url('@img/common/ZhiBeiZhen/btn_tianqi_bg_d.png') no-repeat
        center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .bFBtn_r {
      width: 18px;
      height: 18px;
      margin-right: 20px;
      margin-top: 1px;
      cursor: pointer;
    }
    .playState {
      background: url('@img/common/ZhiBeiZhen/zanting.png') no-repeat center;
      background-size: 100% 100%;
    }
    .pauseState {
      background: url('@img/common/ZhiBeiZhen/bofang.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .bottomBox {
    width: 230px;
    height: 23px;
    position: absolute;
    top: 63px;
    left: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #f2f2f2;
    font-size: 12px;
    background: url('@img/common/ZhiBeiZhen/tianqi_zk_bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 9px;
    .item {
      // border: 1px solid yellow;
      width: 30px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
    }
    .active {
      box-sizing: border-box;
      background: url('@img/common/ZhiBeiZhen/tianqi_zk_btn_d.png') no-repeat
        center;
      background-size: 100% 100%;
      cursor: default;
    }
  }
}
</style>
