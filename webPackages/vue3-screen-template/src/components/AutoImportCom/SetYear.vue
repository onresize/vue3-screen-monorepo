<script setup>
import { useSettingStore } from '@/stores'
import { dayjs } from 'element-plus'

const store = useSettingStore()
const { yearNumber } = storeToRefs(store)

const state = reactive({
  showScrollBox: false, // 显隐下拉盒子
  showShake: false, // 显隐闪动动画
  boxDom: null,
})

onMounted(() => {
  state.boxDom = document.getElementById('scroll_box_ID')
})

// 当前年份前num年
const yearArr = computed(() => (num) => {
  let end = dayjs().format('YYYY') - 0
  let start = end - num
  let ret = []
  for (let i = start; i <= end; i++) {
    ret.push(i)
  }
  return ret.sort((a, b) => b - a)
})

// 移入
const mouseenterFunc = () => {
  console.log('移入---')
  state.showScrollBox = true
}

// 移出
const mouseleaveFunc = () => {
  state.showScrollBox = false
  state.showShake = false
}

const changeYear = (year) => {
  if (year == yearNumber.value) {
    state.showShake = true
    setTimeout(() => {
      state.showShake = false
    }, 0.9e3)
    return
  }
  store.changeYearNumber_Sync(year)
  setTimeout(mouseleaveFunc, 0.1e3)
}
</script>

<template>
  <div
    class="dater"
    @mouseenter="$T(mouseenterFunc)"
    @mouseleave="mouseleaveFunc"
  >
    <span>
      <CounttoTemplate
        :key="yearNumber"
        :endVal="Number(yearNumber)"
        :decimals="0"
        :duration="0.6e3"
      />
    </span>
    <Transition name="opt">
      <div
        id="scroll_box_ID"
        :class="['scroll_box', state.showShake && 'apply-shake']"
        v-show="state.showScrollBox"
      >
        <div
          :class="['item', temp == yearNumber && 'item_active']"
          v-for="temp in yearArr(30)"
          :key="temp"
          @click="$D(changeYear, 200, temp)"
        >
          {{ temp }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
.opt-enter-active,
.opt-leave-active {
  transition: opacity 0.5s ease;
}

.opt-enter-from,
.opt-leave-to {
  opacity: 0;
}

.dater {
  position: relative;
  z-index: 20;
  text-align: center;
  width: 65px;
  height: fit-content;
  line-height: 46px;
  font-size: 12px;
  font-family: 'QTPS';
  font-weight: normal;
  color: #f0eff4;
  cursor: default;

  span {
    display: inline-block;
    width: 42px;
  }

  &::after {
    content: '';
    font-size: 12px;
    width: 9px;
    height: 7px;
    display: inline-block;
    vertical-align: center;
    margin-left: 2px;
    background: url('@img/zhts/xiala_anniu.png') no-repeat center;
    background-size: 100% 100%;
    transition: 0.3s;
  }

  &:hover span {
    filter: drop-shadow(0 0 10px #fff);
  }

  &:hover::after {
    content: '';
    transform: rotate(-180deg);
  }

  .scroll_box {
    position: absolute;
    right: -2px;
    top: 40px;
    width: 71px;
    height: 130px;
    overflow: hidden scroll;
    background-color: rgba(39, 56, 77, 1);
    border-radius: 5px 0 0 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);

    .item {
      width: 100%;
      height: 25px;
      line-height: 25px;
      cursor: pointer;

      &:hover {
        background: url('@img/jxyy/zbkc_kuang.png') no-repeat center;
        background-size: 100% 100%;
      }
    }

    .item_active {
      background: url('@img/jxyy/zbkc_kuang_d.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

  .apply-shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  }
}
</style>
