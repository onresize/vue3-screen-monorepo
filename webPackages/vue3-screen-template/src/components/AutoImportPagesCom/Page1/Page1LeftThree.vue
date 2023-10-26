<script setup>
import * as echarts from 'echarts'
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataArr: {
    type: [Array, String],
    default: [0, 0, 0, 0, 0],
  },
})

const ChartRef = ref(null)
const Chart = ref(null)

onMounted(() => {
  Chart.value = echarts.init(ChartRef.value)
})

const hideComLoading = (arg) => {
  Chart.value.hideLoading()
  Chart.value.setOption(arg)
}

// 加载chart
const loadChart = () => {
  Chart.value.showLoading({
    text: '',
    color: '#fff',
    textColor: '#000',
    maskColor: 'rgba(0, 0, 0, 0.3)',
    spinnerRadius: 12,
    lineWidth: 4,
    zlevel: 10,
  })

  var bgImg =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAilJREFUeNrs1rENwjAURdEfC0pmQAwBDfuwE8wDDSULIGagTGEcFNHQpfPXseT0V0ryzrA/XzcRsWt3HX2fsd1XSRITc8O2JIn5RZVIdsr87mU54xT0TBL1/Sms2uPd7qPXivvp+PfKpfuGBAkStPxMf7muLXe43FiO5ViO5VjOsAoSxHIsx3Isx3Isx3KGVZAglmM5lmM5lmM5liMFQYJYjuVYjuVYjuVYTpAgQSzHcizHcizHcoZVkCCWYzmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcIEGCWI7lWI7lWI7lDKsgQYJYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLGdYBQliOZZjOZZjOZZjOUGCBLEcy7Ecy7EcyxlWQYJYjuVYjuVYjuVYzrAKEsRyLMdyLMdyLMdypCBIEMuxHMuxHMuxnGEVJEgQy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLCdIkCCWYzmWYzmWYznDKkgQy7Ecy7Ecy7EcyxlWQYJYjuVYjuVYjuVYjhQECWI5lmM5lmM5ljOsggQJYjmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUECRLEcizHcizHcixnWAUJYjmWYzmWYzmWYznDKkgQy7Ecy7Ecy7Ecy5GCIEEsx3Isx3Isx3IsJ0iQIJZjOZZjOZZjOcMqSBDLsRzLsRzL9Wy5odZqhwQJWn4+AgwApGqd0LftHcgAAAAASUVORK5CYII='
  var fillImg =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFhJREFUeNrs3U+O1DgUgHHblUFzhb7GCCHNtnfMFUasOA9HYEWfAQlpZq6AEOIIdPcFZgMVe5L6Q6pLzQjFLZK2fpZSKbVioQ8n9b68+Dnxz39fXYYYrkIIF+Fxt5the5kagQkHhtepEZhvUCk01tLh3Gul3aZQwovxSwMwn8cfhW74+Lul66jJawgQIEB1QJfDdj1s5ZFvI8NzLsfluByX43KAlmzjKRdyTkYIEJeb6XK5JC7H5bhchculmLmcOASoAqjPGyMEiMtVuFyMhctxOS5X4XKlRC4nDgECBIjLLeVyXSnpqhQux+W43FyXi/Jy4hCgKqC+74wQIC5XkZdLKcvLcTkuV+FyOScuJw4Bmt/MlwPE5WprH4LaBy7H5WpcbvjgcuIQIECAuByXe0iXy4eJtOONXilx2NJh238PIYbpmPP9qvpc7O5YU+r351/KB9hyAl7C3WPO9+vqs3O5hkZocrn9H+PJwdP3Y87h/n9sNX24HKBFgLaesQLiclUul9Q+yMvJy1Xl5bLaB3EIUE3biVzvGSsgLjfb5Yb7ci7H5bhchcvFWLicOAQIECAux+W43P1QXcmpuWuotbyc2gdxCFBF29c+FHk5QFzOfDl5OS63jMsFtQ/iECBAgLgcl+Ny34PqcoMrot+cFkzEWIbtuN9/H0/R/yuyWFGf2zR8vBiLIHa5hTsFE3FGkcWifT4Pey63fqDt9hemsOYWSylGaM2t++P6zWUjS7KNuZGX1pdbO5S83Mqb9eXEIUC1gfV4r2GEAP08IHk5LsfluNzkcsEzVnEIULXLFS4HiMvNdrnh+uFyXI7LVbhcTN7hJQ4BqnU5eTlAXG6+y/XbjstxOS5X4XJ93nA5cQhQrcupYwXE5Wa7XLRWMJfjclUuV6wVLA4BAgSIyy3ncl0p6aoULsfluNxcl4vRM1ZxCBAgQFxuybWC25ov1+Wc2nK543tOj/tpeYxpOz9mzX3GERpd7uI4PWZcGuO8Hf82vSr07n5FfW7TZrPlcuIQoAqgL19+NUKAuFyFyw1xyDPWVbtci9dQY/Pl+o7LiUOA5rdD7cPGCAHicubLcTkut4jLmS8nDgF6CJdT+wCIy3kfK5fjcsu43HA/xOXEIUCVLnffhAYjBIjL/ZjLZevLcTkuV+Vyyfpy4hCgKqCvX58YIUBcbr7Lxd8/vb1u6Gf7hstxuZ/tcp6xikOAAAHicubLPYz2BHk5LsfluJzA+tja7hlrr/YBEJeb63Lx2cd38nJcjstVuFyyvpw4BAgQIC7H5bgcl3u0Lpd77/AShwBVNGuSAOJylS739MNf7blcSv1+uFI+LFmbT5avzbv/gOmY8/2q+lzc+ZWbqvZPK76OS9duvrNfV5/2XG4YMS4nDgECBIjLcbmHdLmGzjh5OS7H5cShxoGsLweIy1W63G/v/+FyXI7LVbic+XLiECBAgLgcl+NyXI7LrcXlYilFHAIEaH77T4ABAKzsRPWz+TQ7AAAAAElFTkSuQmCCgg'

  var data = [
    {
      name: '20-30',
      value: props.dataArr?.[0] || 0,
    },
    {
      name: '30-40',
      value: props.dataArr?.[1] || 0,
    },
    {
      name: '40-50',
      value: props.dataArr?.[2] || 0,
    },
    {
      name: '50-60',
      value: props.dataArr?.[3] || 0,
    },
    {
      name: '60以上',
      value: props.dataArr?.[4] || 0,
    },
  ]
  var bodyMax = Math.max(...props.dataArr)
  var maxData = []
  var maxNumArray = []
  data.forEach(function (value) {
    maxNumArray.push(value.value)
  })
  data.forEach(function (value) {
    maxData.push({
      name: value.name,
      value: Math.max.apply(null, maxNumArray),
    })
  })
  let option = {
    grid: {
      left: '0%',
      right: '5%',
      top: '15%',
      bottom: '3%',
      containLabel: true,
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0b5263',
          },
        },
        axisTick: {
          show: false,
          inside: true,
          length: 10,
        },
        axisLabel: {
          textStyle: {
            fontSize: 10,
            color: '#A4B3D1',
          },
        },
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: ['20-30', '30-40', '40-50', '50-60', '60以上'],
        boundaryGap: ['20%', '20%'],
        splitLine: {
          show: false,
        },
        axisLine: {
          // show: false,
          lineStyle: {
            color: '#0b5263',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          // rotate: 45,
          // padding: [15, 0, 0, 0],
          textStyle: {
            fontSize: 10,
            color: '#A4B3D1',
          },
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'pictorialBar',
        stack: '总量',
        z: 3,
        barWidth: '45%',
        data: data,
        symbol: 'image://' + fillImg,
        symbolClip: true,
        symbolBoundingData: bodyMax,
        symbolSize: [18, '100%'],
      },
      {
        name: '',
        type: 'pictorialBar',
        barWidth: '45%',
        barGap: '-100%',
        silent: true,
        label: {
          show: true,
          formatter: function (params) {
            var stuNum = 0
            data.forEach(function (value, index, array) {
              if (params.name == value.name) {
                stuNum = value.value
              }
            })
            return stuNum
          },
          position: 'top',
          fontWeight: 'bolder',
          fontSize: '12',
          color: '#fff',
        },
        symbol: 'image://' + bgImg,
        symbolClip: true,
        symbolBoundingData: bodyMax,
        symbolSize: [18, '100%'],
        data: maxData,
      },
    ],
  }

  if (props.dataArr.length) {
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
</template>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  // border: 1px solid red;
}
</style>
