<script setup name="home">
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/img/logo.png'

const { proxy } = getCurrentInstance()
const Router = useRouter()

const showPreview = (picArr) => {
  console.log('预览图片', picArr)
  proxy.$PIC([picArr], {
    initialIndex: 0,
    infinite: true,
    hideOnClickModal: false,
  })
}
</script>

<template>
  <div class="home">
    <img
      alt="Vue logo"
      style="cursor: pointer"
      :src="logo"
      @click.stop="showPreview(logo)"
    />
    <ToggleTheme />
    <el-button @click="Router.push({ name: 'page1' })">跳转page1</el-button>
    <HelloWorld />
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--c-text);
  padding: calc(var(--w-space) * 3) 0;
  margin: 0 auto;
  border: 5px solid red;
  position: absolute;
  inset: 0;
  z-index: 2;
}
</style>
