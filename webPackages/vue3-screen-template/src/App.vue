<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isMobile, watchResize } from '@bassist/utils'
import { autofit } from '@LT/utils'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)

watchResize(() => {
  document.body.className = `platform-${isMobile() ? 'mobile' : 'desktop'}`
})

// 1920*1080 宽高比：1.78
// 2560*1440 宽高比：1.5
// 3840*2160 宽高比：1.5
// 4096*2160 宽高比：1.89
// 分辨率自适应布局
autofit.init(
  {
    dw: window.screen.width * window.devicePixelRatio - 0,
    dh: window.screen.height * window.devicePixelRatio - 0,
    el: '#app',
    resize: true,
    transition: 1,
  },
  true
) // false为关闭控制台运行提示输出
</script>

<template>
  <router-view :key="key" class="app_box" />
</template>

<style>
.app_box {
  width: 100%;
  height: 100%;
}
</style>
