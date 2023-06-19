<script setup>
import { reactive } from 'vue'
</script>

<template>
  <pageContainer>
    <!-- 左边 -->
    <template v-slot:containerLeft>
      <div>
        <h2>左边</h2>
      </div>
    </template>

    <!-- 中下 -->
    <template v-slot:containerCenterBottom>
      <div>
        <h2>中下</h2>
      </div>
    </template>

    <!-- 右边 -->
    <template v-slot:containerRight>
      <div>
        <h2>右边</h2>
      </div>
    </template>
  </pageContainer>
</template>

<style scoped></style>
