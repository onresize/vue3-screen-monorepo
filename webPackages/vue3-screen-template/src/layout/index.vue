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
}
</style>
