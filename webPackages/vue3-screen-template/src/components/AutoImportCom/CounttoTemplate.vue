<script setup>
import CountTo from '../CountTo/index'

const props = defineProps({
  // 需要显示的最终值
  endVal: {
    type: [Number, String],
    default: () => 0,
  },
  // 是否从零开始、 true:不从零开始、false:从零开始
  startValState: {
    type: Boolean,
    default: () => false,
  },
  // 显示小数点后几位
  decimals: {
    type: Number,
    default: () => 0,
  },
  // 执行动画所需时间、毫秒级
  duration: {
    type: Number,
    default: () => 1000,
  },
  // 延时执行
  delay: {
    type: Number,
    default: () => 0e3,
  },
})

const state = reactive({
  options: {
    startVal: 0,
    endVal: 0,
  },
})

/**
 * 轻量级 vue数字滚动插件
 * -------------------------------------------------
 * property |     Description    |  type   |  default |
 * ---------|--------------------|---------|----------|
 * startVal  开始值                 Number      0
 * endVal    结束值                 Number      2017
 * duration  持续时间、以毫秒为单位   Number     3000
 * autoplay  自动播放               Boolean     true
 * decimals  要显示的小数位          Number      0
 */

watch(
  () => props.endVal,
  (newVal, oldVal) => {
    if (props.startValState) {
      state.options.startVal = Number(oldVal)
    } else {
      state.options.startVal = 0
    }
    state.options.endVal = Number(newVal)
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <!--
    页面使用：<CounttoTemplate :endVal="Number(1000)" :decimals="0" :duration="1000" />
  -->
  <CountTo
    class="countto-box"
    :autoplay="true"
    :delay="props.delay"
    :separator="''"
    :decimals="props.decimals"
    :startVal="state.options.startVal"
    :endVal="state.options.endVal"
    :duration="props.duration"
  />
</template>

<style scoped></style>
