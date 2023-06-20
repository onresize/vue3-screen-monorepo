<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const Router = useRouter()
</script>

<template>
  <pageContainer>
    <!-- 左边 -->
    <template v-slot:containerLeft>
      <div>
        <h2 class="font">左边</h2>
        <el-button @click="Router.push({ name: 'home' })">返回home</el-button>
      </div>
    </template>

    <!-- 中下 -->
    <template v-slot:containerCenterBottom>
      <div>
        <h2 class="font">中下</h2>
      </div>
    </template>

    <!-- 右边 -->
    <template v-slot:containerRight>
      <div>
        <h2 class="font">右边</h2>
      </div>
    </template>
  </pageContainer>
</template>

<style scoped>
.font {
  font-size: 30px;
  font-weight: bold;
}
</style>
