<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores'
import { getTimeState } from '@LT/utils'
import { pButton } from '@LT/components'
import { getTableList } from '@/api/page1'

const store = useMessageStore()
const { message } = storeToRefs(store)

const iptData = ref('我是被复制的内容 🍒 🍉 🍊')

ElNotification({
  title: getTimeState(),
  message: '欢迎登录 vue3-screen-template',
  type: 'success',
  duration: 3000,
})

// eslint-disable-next-line
const getList = async () => {
  const [err, res] = await getTableList()
  console.log('mock接口测试：', res)
}
getList()
</script>

<template>
  <el-input class="!w-200px my-10px" v-model="iptData"></el-input>
  <el-button v-copy="iptData">复制</el-button>

  <pButton>公共按钮组件</pButton>

  <blockquote>
    <p>{{ message }}</p>
  </blockquote>
</template>

<style lang="less" scoped>
blockquote {
  color: var(--c-black);
  background-color: var(--c-gray);
  padding: calc(var(--w-space) / 2);
  border-radius: var(--w-radius-xs);

  p {
    margin: 0;
  }
}
</style>
