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

// 针对数组内每项中文第一个字符转成数字并返回拼接后的字符
const chineseToNumber = (str) => {
  let NumberMap = new Map([
    ['一', '1'],
    ['二', '2'],
    ['三', '3'],
    ['四', '4'],
    ['五', '5'],
    ['六', '6'],
  ])
  let matchStr = str.slice(0, 1)
  let endStr = str.slice(1)
  return NumberMap.get(matchStr) + endStr
}

const hideComLoading = (option) => {
  state.loading = false
  Chart.value.setOption(option)
}

// 加载chart
const loadChart = () => {
  state.loading = true

  const img =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAHCAYAAADj/NY7AAAAAXNSR0IArs4c6QAAAChJREFUKFNj9Igv/cUABTsWdrPB2CAaWQ5ZnFg246jh2IJqNFiwJiAATDkqooX3nWIAAAAASUVORK5CYII='

  const obliqueRectangle = echarts.graphic.extendShape({
    animation: true,
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      offset: 10,
    },
    buildPath: (ctx, shape) => {
      ctx.moveTo(shape.x + shape.offset, shape.y)
      ctx.lineTo(shape.x + shape.width + shape.offset, shape.y)
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height)
      ctx.lineTo(shape.x, shape.y + shape.height)
      ctx.closePath()
    },
  })
  echarts.graphic.registerShape('obliqueRectangle', obliqueRectangle)

  let option = {
    grid: [
      {
        left: '4%',
        right: '4%',
        bottom: '2%',
        top: '2%',
        containLabel: true,
      },
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'value',
        axisLabel: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
      },
      {
        gridIndex: 0,
        type: 'value',
        // max: 100,
        axisLabel: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'category',
        inverse: true,
        data: props.dataObj.dataName.map((str) => chineseToNumber(str)),
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          width: 80,
          padding: [0, 0, 0, -80],
          align: 'right',
          formatter: (name, index) => {
            return `{value|${name}}`
          },
          rich: {
            value: {
              fontSize: 12,
              color: '#D6E0F3',
              fontFamily: 'SourceHanSerifSC-Bold',
              fontWeight: 500,
            },
          },
        },
      },
      {
        gridIndex: 0,
        type: 'category',
        inverse: true,
        margin: 20,
        data: props.dataObj.dataName.map((str) => chineseToNumber(str)),
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          padding: [0, 0, 0, 5],
          formatter: (_, index) => {
            return `{icon|}{value|${props.dataObj.dataSource[index] || 0}}`
          },
          rich: {
            icon: {
              width: 16,
              height: 6,
              verticalAlign: 'middle',
              backgroundColor: {
                image: img,
              },
            },
            value: {
              padding: [0, 0, 0, 5],
              fontSize: 12,
              color: '#fff',
              fontFamily: 'QTPS',
              fontWeight: 500,
              marginLeft: '5px',
            },
          },
        },
      },
    ],
    series: [
      {
        type: 'custom',
        xAxisIndex: 1,
        yAxisIndex: 0,
        data: props.dataObj.dataSource.map(() => 100),
        renderItem: (params, api) => {
          const barLayout = api.barLayout({
            count: 1,
            barWidth: 6,
          })
          const { bandWidth, offsetCenter, width } = barLayout[0]
          const x = params.coordSys.x
          const y =
            bandWidth * (params.dataIndex + 1 / 2) +
            offsetCenter +
            params.coordSys.y -
            width / 2
          return {
            type: 'obliqueRectangle',
            shape: {
              x: x,
              y: y + 2,
              width: api.size([api.value()])[0],
              height: width,
              offset: width * 0.5,
            },
            style: api.style(),
          }
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#22324A', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#1C3D57', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        silent: true,
      },
      {
        type: 'custom',
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: props.dataObj.dataSource,
        silent: true,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#2FC7FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#73F3FF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        renderItem: (params, api) => {
          const barLayout = api.barLayout({
            barWidth: 8,
            count: 1,
          })
          const { bandWidth, offsetCenter, width } = barLayout[0]
          const x = params.coordSys.x
          const y =
            bandWidth * (params.dataIndex + 1 / 2) +
            offsetCenter +
            params.coordSys.y -
            width / 2
          return {
            type: 'obliqueRectangle',
            shape: {
              x: x,
              y: y,
              width: api.size([api.value()])[0],
              height: width,
              offset: width * 0.5,
            },
            style: api.style(),
          }
        },
      },
      // {
      //   type: 'pictorialBar',
      //   data: props.dataObj.dataSource,
      //   xAxisIndex: 0,
      //   yAxisIndex: 0,
      //   symbol: 'path://M15,0L5,20L0,20L10,0Z',
      //   symbolRotate: null,
      //   symbolSize: [13, 12],
      //   symbolPosition: 'end',
      //   symbolOffset: [10, 0],
      //   itemStyle: {
      //     color: 'white',
      //     shadowColor: 'rgba(115, 243, 255, 0.2)',
      //     shadowBlur: 6,
      //   },
      // },
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
