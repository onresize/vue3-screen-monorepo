<!--
 * @Author: Embrance-T 2069814988@qq.com
 * @Date: 2023-10-12 16:17:24
 * @LastEditTime: 2023-10-13 16:03:48
 * @LastEditors: Embrance-T 2069814988@qq.com
 * @Description:
 * @FilePath: \Sr_School_Vue\webPackages\ShangRaoSchoolVUE\src\App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isMobile, watchResize } from '@bassist/utils'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)

watchResize(() => {
  document.body.className = `platform-${isMobile() ? 'mobile' : 'desktop'}`
})
</script>

<template>
  <!-- <router-view :key="key" class="app_box" /> -->
  <router-view class="app_box" :key="key" v-slot="{ Component }">
    <keep-alive include="">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style>
.app_box {
  width: 100%;
  height: 100%;
  background: url('@img/common/yinying.png') no-repeat center;
  background-size: 100% 100%;
}
</style>
