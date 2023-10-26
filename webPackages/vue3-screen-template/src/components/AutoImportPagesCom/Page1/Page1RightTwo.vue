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
    tooltip: {
      // trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '0%',
      top: '10%',
      height: '85%',
      containLabel: true,
      z: 22,
    },
    xAxis: [
      {
        type: 'category',
        data: props.dataObj.dataName,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
        axisLabel: {
          margin: 10,
          color: '#e2e9ff',
          textStyle: {
            fontSize: 10,
          },
        },
      },
    ],
    yAxis: [
      {
        axisLabel: {
          formatter: '{value}',
          color: '#e2e9ff',
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        data: props.dataObj.dataSource,
        barWidth: '10px',
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
          borderRadius: [30, 30, 30, 30],
          shadowColor: 'rgba(0,160,221,1)',
          shadowBlur: 2,
        },
        label: {
          show: true,
          width: 6,
          height: 6,
          borderRadius: 100,
          color: 'rgba(0,0,0,0)',
          backgroundColor: 'rgba(32,43,72, 1)',
          position: ['20%', 4],
          shadowBlur: 6,
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
