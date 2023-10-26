<script setup>
const props = defineProps({
  value: {
    type: [String, Number],
    default: 0,
  },
})

const numberItemRef = ref(null)

// 设置每一位数字的偏移
const setNumberTransform = () => {
  let numberItems = numberItemRef.value
  let obj = {}
  Array.from(numberItems).forEach((c) => {
    let key = c.dataset.index
    let value = c.dataset.number
    let init = 0
    obj[key] = setInterval(() => {
      if (init < value * 10) {
        init += 1
        c.style.transform = `translateY(-${init}%)`
      } else {
        clearInterval(obj[key])
        obj[key] = null
      }
    }, 10)
  })
}

watch(
  () => props.value,
  async (newVal) => {
    if (newVal) {
      await nextTick()
      setNumberTransform()
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

const numberList = computed(() => String(props.value).split(''))

onMounted(setNumberTransform)
</script>

<template>
  <!--
    页面使用：<ScrollNumber :value="'00000'" />
  -->
  <div style="display: flex; user-select: none">
    <div v-for="(item, index) in numberList" :key="index" style="display: flex">
      <span v-if="isNaN(item)">{{ item }}</span>
      <div class="number" v-else>
        <span
          class="number-item"
          ref="numberItemRef"
          :data-number="item"
          :data-index="index"
          >0123456789</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.number {
  width: 45px;
  height: 45px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 5px 0;
  margin: 10px 10px;
  border: 1px solid #7683a6;
  border-radius: 3px;

  & > span {
    color: #fff;
    opacity: 0.8;
    writing-mode: vertical-rl;
    text-orientation: upright;
    transform: translateY(0%);
    font-size: 35px;
    font-family: 'AZ';
  }
}
</style>
