<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const Router = useRouter()
</script>

<template>
  <pageContainer>
    <!-- 左边 -->
    <template v-slot:containerLeft>
      <div></div>
    </template>

    <!-- 中下 -->
    <template v-slot:containerCenterBottom>
      <div></div>
    </template>

    <!-- 右边 -->
    <template v-slot:containerRight>
      <div></div>
    </template>
  </pageContainer>
</template>

<style scoped lang="less"></style>
