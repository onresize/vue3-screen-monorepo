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
  <router-view :key="key" class="app_box" />
</template>

<style>
.app_box {
  width: 100%;
  height: 100%;
}
</style>
