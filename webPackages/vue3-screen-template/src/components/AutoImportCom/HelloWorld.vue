<script setup>
import { useMessageStore } from '@/stores'
import { getTimeState, onceFunc } from '@LT/utils'
import { pButton } from '@LT/components'
import { getTableList } from '@/api/page1'

const store = useMessageStore()
const { message, onlyRunOnce, num } = storeToRefs(store)

const iptData = ref('我是被复制的内容 🍒 🍉 🍊')

onceFunc(() => {
  store.changeOnlyRunOnce_Sync(true)
  ElNotification({
    title: getTimeState(),
    message: '欢迎登录',
    type: 'success',
    duration: 3000,
  })
})(onlyRunOnce.value)

// eslint-disable-next-line
const getList = async () => {
  const [err, res] = await getTableList()
  console.log('mock接口测试：', res)
}
getList()
</script>

<template>
  <div>
    <el-button v-copy="iptData">复制</el-button>

    <pButton>公共按钮组件</pButton>

    <blockquote @click="store.changeNum_Sync">
      <p>{{ message + '：' + num }}</p>
    </blockquote>
  </div>
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
