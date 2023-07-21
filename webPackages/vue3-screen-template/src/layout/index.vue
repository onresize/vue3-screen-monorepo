<script setup name="pageContainer">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './header.vue'
import { autofit, onceFunc } from '@LT/utils'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)

// 1920*1080 宽高比：1.78
// 2560*1440 宽高比：1.5
// 3840*2160 宽高比：1.5
// 4096*2160 宽高比：1.89
// 分辨率自适应布局
autofit.init(
  {
    dw: window.screen.width - 0,
    dh: window.screen.height - 0,
    el: '#app',
    resize: true,
    transition: 1,
  },
  true
) // false为关闭控制台运行提示输出
</script>

<template>
  <div class="container_box">
    <Header class="header" />
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
    height: 100px;
    border: 10px solid green;
    cursor: -webkit-zoom-in;
  }

  .content {
    width: 100%;
    flex: 1;
    border: 10px solid red;
    position: relative;
  }
}
</style>
