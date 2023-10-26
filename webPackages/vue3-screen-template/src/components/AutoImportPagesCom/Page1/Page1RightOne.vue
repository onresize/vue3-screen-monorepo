<script setup>
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataArr: {
    type: Array,
    default: [0, 0, 0],
  },
})

const state = reactive({
  renderArr: [
    { num: 0, txt: '学生' }, // 教职工
    { num: 0, txt: '招生' }, // 在校教师
    { num: 0, txt: '毕业' }, // 平均班额
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
      :class="['item']"
      v-for="({ num, txt }, idx) in state.renderArr"
      :key="idx"
      v-show="!state.loading"
    >
      <div :class="[`BG_${idx + 1}`, 'bg']">
        <div class="txt">{{ txt }}</div>
      </div>
      <div class="number">
        <CounttoTemplate
          :key="num"
          :endVal="Number(num)"
          :decimals="0"
          :duration="1e3"
        />
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
  justify-content: space-around;

  .item {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .bg {
      width: 72px;
      height: 74px;
      // border: 1px solid red;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      .txt {
        transform: translateY(4px);
        text-align: center;
        font-size: 16px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #e4f1fe;
      }
    }

    .BG(@i) when(@i <=3) {
      .BG_@{i} {
        background: url('@img/zhts/icon_xs@{i}.png') no-repeat center;
        background-size: 100% 100%;
      }

      .BG((@i + 1));
    }

    .BG(1);

    .number {
      text-align: center;
      color: #77bdff;
      font-size: 18px;
      font-weight: 500;
      font-family: 'QTPS';
      text-shadow: 0px 0px 30px #000;
    }
  }
}
</style>
