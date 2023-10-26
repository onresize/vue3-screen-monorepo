<script setup>
const Router = useRouter()

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
  <div :class="['box', state.showAnimation ? 'activeOpt' : 'infoOpt']">
    <div class="mask"></div>
    <el-carousel
      class="carousel"
      arrow="always"
      height="610px"
      :interval="5e3"
      indicator-position="none"
    >
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/page5.less');
</style>
