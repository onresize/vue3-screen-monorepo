<script setup>
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataArr: {
    type: [Array, String],
    default: [0, 0, 0],
  },
})

const state = reactive({
  renderArr: [
    { num: 0, txt: '教职工' }, // 教职工
    { num: 0, txt: '在校教师' }, // 在校教师
    { num: 0, txt: '平均班额' }, // 平均班额
  ],
  loading: true,
})

const hideComLoading = () => {
  state.loading = false
}

watch(
  () => [...props.dataArr],
  (val) => {
    // console.log('子组件监听：', val)
    if (val.length) {
      hideComLoading()
      for (let i = 3; i--; ) {
        state.renderArr[i].num = props.dataArr[i]
      }
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
    <div
      class="item"
      v-for="({ num, txt }, idx) in state.renderArr"
      :key="idx"
      v-show="!state.loading"
    >
      <div class="number">
        <CounttoTemplate :endVal="Number(num)" :decimals="0" :duration="1e3" />
      </div>
      <div class="bg"></div>
      <div class="txt">{{ txt }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;
  display: flex;

  .item {
    width: 33%;
    height: 100%;
    position: relative;

    .number {
      transform: translateY(16px);
      text-align: center;
      color: #ffffff;
      text-shadow: 0px 0px 30px blue;
      font-size: 22px;
      font-weight: 500;
      font-family: 'QTPS';
    }

    .bg {
      width: 92px;
      height: 59px;
      background: url('@img/zhts/jsgl_dz.png') no-repeat center;
      background-size: 100% 100%;
    }

    .txt {
      transform: translateY(-6px);
      text-align: center;
      font-size: 15px;
      font-family: 'PingFang SC';
      font-weight: 500;
      color: #e4f1fe;
    }
  }
}
</style>
