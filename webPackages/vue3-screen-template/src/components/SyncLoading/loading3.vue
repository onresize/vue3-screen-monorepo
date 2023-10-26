<script setup>
const props = defineProps({
  rate: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['loadend'])

watch(
  () => props.rate,
  (val) => {
    // console.log('监听：', val)
    if (val >= 100) {
      emits('loadend')
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div class="pre_loading">
    <div class="num">{{ props.rate }}</div>
  </div>
</template>

<style scoped lang="less">
.pre_loading {
  width: 100%;
  height: 100%;
  position: fixed;
  box-sizing: border-box;
  background: url('@img/common/loading.jpg') no-repeat center;
  background-size: 100% 100%;
  display: flex;
  .num {
    color: #fff;
    font-size: 45px;
    font-family: 'LT';
    width: fit-content;
    height: fit-content;
    // border: 2px solid red;
    margin: 0 auto;
    transform: translateY(877px);
  }
}
</style>
