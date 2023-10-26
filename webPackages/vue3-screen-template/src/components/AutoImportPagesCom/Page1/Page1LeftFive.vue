<script setup>
import * as echarts from 'echarts'
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataArr: {
    type: [Array, String],
    default: [0, 0],
  },
})

const ChartRef = ref(null)
const Chart = ref(null)

const state = reactive({
  showDom: true,
})

onMounted(() => {
  Chart.value = echarts.init(ChartRef.value)
})

const hideComLoading = () => {
  state.showDom = false
  Chart.value.hideLoading()
}

// 加载chart
const loadChart = () => {
  state.showDom = true
  Chart.value.showLoading({
    text: '',
    color: '#fff',
    textColor: '#000',
    maskColor: 'rgba(0, 0, 0, 0.3)',
    spinnerRadius: 12,
    lineWidth: 4,
    zlevel: 10,
  })

  var echartData = [
    {
      name: '机动车',
      value: props.dataArr[0],
    },
    {
      name: '非机动车',
      value: props.dataArr[1],
    },
  ]
  let option = {
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['62%', '70%'],
        color: ['#257DC1', '#46B45B'],
        data: echartData,
        label: {
          show: false,
        },
      },
    ],
  }

  if (props.dataArr.length) {
    hideComLoading()
    Chart.value.setOption(option)
  } else {
    setTimeout(hideComLoading, LoadingOutTime)
  }
}

// 销毁chart
const destroyChart = () => {
  ChartRef.value?.dispose()
}

watch(
  () => [...props.dataArr],
  async (val) => {
    if (val) {
      // console.log('子组件监听：', val)
      await nextTick()
      loadChart()
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

onUnmounted(destroyChart)
</script>

<template>
  <div class="box" ref="ChartRef"></div>
  <div class="bg" v-show="!state.showDom">
    <div class="labelBox">
      <div class="left">
        <div class="title">机动车</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(props.dataArr[0] || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="right">
        <div class="title">非机动车</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(props.dataArr[1] || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  // border: 1px solid red;
}

.bg {
  position: relative;
  top: -143px;
  width: 291;
  height: 130px;
  background: url('@img/zhts/djclxj_yuan_bg.png') no-repeat center;
  background-size: 100% 100%;

  .labelBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    // border: 2px solid red;
    .left {
      margin-top: -15px;
      width: 65px;
      height: 60px;
      // border: 2px solid pink;
      text-align: right;

      .title {
        font-size: 15px;
        color: #a5c5de;
      }

      .num {
        width: 80px;
        // border: 1px solid red;
        text-align: center;
        transform: translate(2px, 12px);
        font-size: 17px;
        font-family: 'QTPS';
        font-weight: normal;
        color: #72d483;
      }
    }

    .right {
      margin-top: -15px;
      width: 65px;
      height: 60px;
      // border: 2px solid pink;
      text-align: left;

      .title {
        font-size: 15px;
        color: #a5c5de;
      }

      .num {
        width: 80px;
        // border: 1px solid red;
        text-align: center;
        transform: translate(-12px, 10px);
        font-size: 17px;
        font-family: 'QTPS';
        font-weight: normal;
        color: #6fade1;
      }
    }
  }
}
</style>
