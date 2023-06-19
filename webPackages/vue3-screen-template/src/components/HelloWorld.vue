<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores'
import { getTimeState } from '@LT/utils'
import { pButton } from '@LT/components'

defineProps<{ msg: string }>()

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <h1>{{ getTimeState() }}</h1>

  <pButton>公共按钮组件</pButton>

  <blockquote>
    <p>{{ message }}</p>
  </blockquote>
</template>

<style lang="less" scoped>
ul {
  li {
    line-height: 2;
  }
}

blockquote {
  color: var(--c-black);
  background-color: var(--c-gray);
  padding: calc(var(--w-space) / 2);
  border-radius: var(--w-radius-xs);

  p {
    margin: 0;
  }
}

hr {
  width: 60%;
  border-color: var(--c-border);
  margin: var(--w-space) auto;
  opacity: 0.2;
}

a {
  color: #42b983;
}

p {
  margin: 0;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
