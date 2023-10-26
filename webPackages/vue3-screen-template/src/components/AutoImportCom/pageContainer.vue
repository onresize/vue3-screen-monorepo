<script setup>
const state = reactive({
  showAnimation: false,
  leftActive: true,
  rightActive: true,
  bottomActive: true,
})

onMounted(() => {
  setTimeout(() => {
    state.showAnimation = true
  }, 0.2e3)
})
</script>

<template>
  <div
    :class="[
      'page-container-box',
      state.showAnimation ? 'activeOpt' : 'infoOpt',
    ]"
  >
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
    <div
      v-if="false"
      :class="[
        'page-container-center-top',
        state.showAnimation ? 'active' : '',
      ]"
    >
      <slot name="containerCenterTop"></slot>
    </div>

    <!-- XXX中下 -->
    <div
      v-if="false"
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
.activeOpt {
  opacity: 1;
}

.infoOpt {
  opacity: 0;
}

.page-container-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('@img/common/kejikuang.png') no-repeat center;
  background-size: 100% 100%;
  transition: opacity 1.7s linear;

  .page-container-content {
    // border: 1px solid pink;
    width: 319px;
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;

    &.page-container-left {
      left: 0;
      top: 0;
      transform: translateX(-110%);
      transition: all 1s;
      padding-left: 21px;
    }

    &.page-container-right {
      right: 0;
      top: 0;
      transform: translateX(110%);
      transition: all 1s;
      padding-right: 21px;
    }

    &.active {
      transform: translateX(0%) !important;
      transition: all 1s;
    }
  }

  .page-container-center-top {
    border: 1px solid red;
    position: absolute;
    top: 30px;
    left: 50%;
    z-index: 10;
    width: 800px;
    height: 100px;
    transform: translate(-50%, -30vh);
    transition: all 1s;

    &.active {
      transform: translate(-50%, 0%) !important;
    }
  }

  .page-container-center-bottom {
    border: 1px solid yellow;
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
