<script setup name="pageContainer">
import Header from '@/layout/header.vue'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)
const showWatherTimeCom = computed(() => ['page1'].includes(route.name))
const showGlobalSelectCom = computed(
  () => !['page3', 'page5', 'page6'].includes(route.name)
)

const state = reactive({
  showAnimation: false,
})

onMounted(() => {
  setTimeout(() => {
    state.showAnimation = true
  }, 0.2e3)
})
</script>

<template>
  <div class="container_box">
    <!-- 头部 -->
    <Header class="header" />

    <!-- 天气时间组件 -->
    <div
      v-show="showWatherTimeCom"
      :class="[
        'centerTop',
        state.showAnimation ? 'active activeOpt' : 'infoOpt',
      ]"
    >
      <WeatherTimeCom />
    </div>

    <!-- 全局下拉 -->
    <div
      v-show="showGlobalSelectCom"
      :class="[
        'global_select',
        state.showAnimation ? 'active activeOpt' : 'infoOpt',
      ]"
    >
      <GlobalSelect />
    </div>

    <!-- 占位符 -->
    <router-view :key="key" class="content" />
  </div>
</template>

<style scoped lang="less">
.container_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 98px;
    // border: 1px solid green;
    position: relative;
    z-index: 10;
    background: url('@img/zhts/taitou.png') no-repeat center;
    background-size: 100% 100%;
  }

  .centerTop {
    // border: 1px solid red;
    position: absolute;
    top: 110px;
    left: 300px;
    z-index: 10;
    box-sizing: border-box;
    width: fit-content;
    transform: translateX(-35vw);
    transition: all 1s;

    &.active {
      transform: translateX(0%) !important;
    }
  }

  .content {
    width: 100%;
    flex: 0.985;
    box-sizing: border-box;
    // border: 2px solid red;
    position: relative;
    top: 13px;
  }

  .infoOpt {
    opacity: 0;
  }

  .activeOpt {
    opacity: 1;
  }

  .global_select {
    position: absolute;
    top: 112px;
    right: 342px;
    z-index: 10;
    box-sizing: border-box;
    width: fit-content;
    transform: translateX(35vw);
    transition: all 1s;

    &.active {
      transform: translateX(0%) !important;
    }
  }
}
</style>
