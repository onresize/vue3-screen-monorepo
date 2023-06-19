<script setup name="pageContainer">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './header.vue'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)
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
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 100px;
    border: 10px solid green;
  }

  .content {
    width: 100%;
    flex: 1;
    border: 10px solid red;
    position: relative;
  }
}
</style>
