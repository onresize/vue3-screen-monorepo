<script setup name="preLoading">
import FakeProgress from '@/utils/tools/fakeProgress'
import SyncLoading from '@cp/SyncLoading/loading3.vue'

const Router = useRouter()
const rate = ref(0)
const faker = new FakeProgress({
  timeConstant: 1e3,
  autoStart: true,
})

let Timer = setInterval(() => {
  rate.value = ~~(faker?.progress * 100)
  if (rate.value >= 99) {
    rate.value = 100
    faker.stop()
    clearTimeout(Timer)
  }
}, 100)

const emitChange = {
  loadend(e) {
    console.log('加载完成---------->')
    Router.push('/page1')
  },
}
</script>

<template>
  <SyncLoading :rate="rate" v-on="emitChange"></SyncLoading>
</template>

<style scoped></style>
