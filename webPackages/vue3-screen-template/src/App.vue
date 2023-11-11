<script setup>
import { isMobile, watchResize } from '@bassist/utils'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)

const commonStyles = computed(() =>
  ['page5', 'page6', 'login', 'preLoading'].includes(route.name)
    ? 'info_box'
    : 'app_box'
)

watchResize(() => {
  document.body.className = `platform-${isMobile() ? 'mobile' : 'desktop'}`
})
</script>

<template>
  <!-- <router-view :key="key" class="app_box" /> -->

  <router-view :class="commonStyles" v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="['login', 'redirect', 'preLoading']">
        <component :is="Component" :key="key"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
.app_box {
  width: 100%;
  height: 100%;
  background: url('@img/common/yinying.png') no-repeat center;
  background-size: 100% 100%;
}

.info_box {
  width: 100%;
  height: 100%;
}
</style>
