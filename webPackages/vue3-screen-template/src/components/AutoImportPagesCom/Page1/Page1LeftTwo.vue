<script setup>
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataArr: {
    type: Array,
    default: [50, 50],
  },
})

const state = reactive({
  loading: true,
})

const LeftPregressW = computed(
  () =>
    ~~(
      ((props.dataArr[0] || 50) /
        ((props.dataArr[0] || 50) + (props.dataArr[1] || 50))) *
      100
    ) - 0
)
const RightPregressW = computed(() => 100 - LeftPregressW.value)

const hideComLoading = () => {
  state.loading = false
}

watch(
  () => [...props.dataArr],
  (val) => {
    // console.log('子组件监听：', val)
    if (val.length) {
      hideComLoading()
    } else {
      setTimeout(hideComLoading, LoadingOutTime)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div
    class="box"
    v-loading.lock="state.loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <!-- 女教师 -->
    <div v-show="!state.loading" class="left_box">
      <div class="pic"></div>
      <div class="txt_box">
        <div class="name">女教师</div>
        <div class="number">
          <CounttoTemplate
            :endVal="Number(props.dataArr[0] || 50)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
    </div>

    <div
      v-show="!state.loading"
      class="center_progress"
      :style="{
        '--leftW': LeftPregressW + '%',
        '--rightW': RightPregressW + '%',
      }"
    >
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <!-- 男教师 -->
    <div v-show="!state.loading" class="right_box">
      <div class="pic"></div>
      <div class="txt_box">
        <div class="name">男教师</div>
        <div class="number">
          <CounttoTemplate
            :endVal="Number(props.dataArr[1] || 50)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left_box {
    width: 80px;
    height: 60px;
    border: 1px solid transparent;
    display: flex;
    align-items: center;

    .pic {
      width: 27px;
      height: 30px;
      background: url('@img/zhts/nvjiaoshi.png') no-repeat center;
      background-size: 100% 100%;
    }

    .txt_box {
      width: 48px;
      height: fit-content;
      padding-left: 4px;
      text-align: left;

      .name {
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #d6e0f3;
      }

      .number {
        margin-top: -3px;
        font-size: 17px;
        font-family: 'QTPS';
        font-weight: normal;
        color: #fff;
      }
    }
  }

  .center_progress {
    width: 130px;
    height: 10px;
    // border: 1px solid red;
    display: flex;

    .left {
      border-radius: 5px;
      width: var(--leftW);
      height: 7px;
      background-color: #00bf94;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: -10px;
        right: -5px;
        width: 10px;
        height: 28px;
        // border: 1px solid red;
        background: url('@img/zhts/zhuangshi_sanjiao.png') no-repeat center;
        background-size: 100% 100%;
      }
    }

    .right {
      border-radius: 5px;
      width: var(--rightW);
      height: 7px;
      background-color: #679df4;
    }
  }

  .right_box {
    margin-left: 2px;
    width: 80px;
    height: 60px;
    border: 1px solid transparent;
    display: flex;
    align-items: center;

    .pic {
      width: 27px;
      height: 30px;
      background: url('@img/zhts/nanjiaoshi.png') no-repeat center;
      background-size: 100% 100%;
    }

    .txt_box {
      width: 48px;
      height: fit-content;
      padding-left: 4px;
      text-align: left;

      .name {
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #d6e0f3;
      }

      .number {
        margin-top: -3px;
        font-size: 17px;
        font-family: 'QTPS';
        font-weight: normal;
        color: #fff;
      }
    }
  }
}
</style>
