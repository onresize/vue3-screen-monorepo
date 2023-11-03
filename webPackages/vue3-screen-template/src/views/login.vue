<script setup name="login">
import { useSettingStore } from '@/stores'

const store = useSettingStore()
const Router = useRouter()
const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
})
const state = reactive({
  loading: false,
})

const handleLogin = () => {
  Router.push({ path: '/page1' })

  // state.loading = true
  // store
  //   .login_Async(loginForm.value)
  //   .then(async () => {
  //     await Router.push({ path: '/page1' })
  //     await store.getGlobalSelectList_Async()
  //   })
  //   .catch(() => {
  //     state.loading = false
  //   })
}
</script>

<template>
  <div class="login_box">
    <div class="content_mask">
      <el-input
        class="ipt1 ipt"
        v-model="loginForm.username"
        placeholder="请输入账号"
      />
      <el-input
        type="password"
        show-password
        class="ipt2 ipt"
        v-model="loginForm.password"
        placeholder="请输入密码"
        @keydown.enter="$D(handleLogin, 200, '')"
      />
      <div class="submit" @click="$D(handleLogin, 200, '')">
        <span v-if="!state.loading">登 录</span>
        <span v-else>登 录 中...</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/login.less');
</style>
