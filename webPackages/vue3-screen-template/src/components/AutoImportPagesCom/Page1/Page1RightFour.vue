<script setup>
import * as echarts from 'echarts'
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataObj: {
    type: [Object, String],
    default: {
      dataName: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], // x轴名称
      dataSource: [0, 0, 0, 0, 0], // 对应x轴数据
    },
  },
})

const ChartRef = ref(null)
const Chart = ref(null)

const state = reactive({
  loading: false,
})

onMounted(() => {
  Chart.value = echarts.init(ChartRef.value)
})

const hideComLoading = (option) => {
  state.loading = false
  Chart.value.setOption(option)
}

// 加载chart
const loadChart = () => {
  state.loading = true

  let option = {
    animation: true,
    grid: {
      left: '5%',
      right: '5%',
      bottom: '6%',
      top: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: props.dataObj.dataName,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ffffff',
            width: 1,
            type: 'solid',
            opacity: 0.3,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 11,
            color: '#A5C5DE',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#dabbfe',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: '#ffffff',
            opacity: 0.15,
            type: 'dotted',
          },
        },
      },
    ],
    series: [
      {
        type: 'pictorialBar',
        symbol: 'path://M35,0L35,70L0,70z M35,0L35,70L70,70z',
        data: props.dataObj.dataSource,
        barWidth: 23, //柱子宽度
        barGap: 1, //柱子之间间距
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0,244,255,1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0,77,167,1)', // 100% 处的颜色
              },
            ],
            false
          ),
          opacity: 1,
        },
        label: {
          formatter: '{c}',
          show: true,
          position: 'top',
          fontWeight: 'bolder',
          fontSize: '11',
          color: '#fff',
        },
      },
    ],
  }

  if (props.dataObj.dataSource.length) {
    hideComLoading(option)
  } else {
    setTimeout(() => {
      hideComLoading(option)
    }, LoadingOutTime)
  }
}

// 销毁chart
const destroyChart = () => {
  ChartRef.value?.dispose()
}

watch(
  () => ({ ...props.dataObj }),
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
  <div
    class="box"
    v-loading.lock="state.loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="chart" ref="ChartRef" v-show="!state.loading"></div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;
  display: flex;

  // border: 1px solid red;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
