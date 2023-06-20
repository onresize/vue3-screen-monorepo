<script setup>
import { reactive, onMounted } from 'vue'

const state = reactive({
  showAnimation: false,
  leftActive: true,
  rightActive: true,
  bottomActive: true,
})
onMounted(() => {
  setTimeout(() => {
    state.showAnimation = true
  }, 200)
})
</script>

<template>
  <div class="page-container-box">
    <!-- XXX左 -->
    <div
      :class="[
        'page-container-left',
        'page-container-content',
        state.showAnimation ? 'active' : '',
      ]"
    >
      <slot name="containerLeft"></slot>
    </div>

    <!-- XXX中上、非头部 -->
    <div class="page-container-center-top">
      <slot name="containerCenterTop"></slot>
    </div>

    <!-- XXX中下 -->
    <div
      :class="[
        'page-container-center-bottom',
        state.showAnimation ? 'active' : '',
      ]"
    >
      <slot name="containerCenterBottom"></slot>
    </div>

    <!-- XXX右 -->
    <div
      :class="[
        'page-container-right',
        'page-container-content',
        state.showAnimation ? 'active' : '',
      ]"
    >
      <slot name="containerRight"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-container-box {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .page-container-content {
    border: 5px solid black;
    width: 377px;
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
    bottom: 0;
    margin: auto;
    padding: 20px;
    display: flex;
    justify-content: center;

    &.page-container-left {
      left: 0;
      top: 30px;
      transform: translateX(-110%);
      transition: all 1s;
    }

    &.page-container-right {
      right: 0;
      top: 30px;
      transform: translateX(110%);
      transition: all 1s;
    }

    &.active {
      transform: translateX(0%) !important;
      transition: all 1s;
    }
  }

  .page-container-center-top {
    border: 3px solid red;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -30vh);
    transition: all 1s;

    &.active {
      transform: translateY(0%);
      transition: all 1s;
      z-index: 12;
    }
  }

  .page-container-center-bottom {
    border: 5px solid green;
    width: 100%;
    height: 100px;
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 0;
    transform: translateY(30vh);
    transition: all 1s;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      transform: translateY(0%) !important;
    }
  }
}
</style>
