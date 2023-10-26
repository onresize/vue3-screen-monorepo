<script setup>
import * as echarts from 'echarts'
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataArr: {
    type: Array,
    default: [0, 0, 0, 0, 0],
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
    color: ['#3EB4F5', '#6D4CD5', '#33DCB4', '#205AF4'],
    grid: {
      left: -100,
      top: 60,
      bottom: 10,
      right: 20,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      formatter: '人数占比: {d}%',
      textStyle: {
        fontSize: 10,
        fontFamily: 'QTPS',
      },
    },
    polar: {},
    angleAxis: {
      interval: 1,
      type: 'category',
      data: [],
      z: 10,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#0B4A6B',
          width: 1,
          type: 'solid',
        },
      },
      axisLabel: {
        interval: 0,
        show: true,
        color: '#0B4A6B',
        margin: 8,
        fontSize: 16,
      },
    },
    radiusAxis: {
      min: 40,
      max: 120,
      interval: 20,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#585A62',
          width: 1,
          type: 'solid',
        },
      },
      axisLabel: {
        formatter: '{value} %',
        show: false,
        padding: [0, 0, 20, 0],
        color: '#0B3E5E',
        fontSize: 16,
      },
      splitLine: {
        lineStyle: {
          color: '#585A62',
          width: 1,
          type: 'dashed',
        },
      },
    },
    calculable: true,
    series: [
      {
        stack: 'a',
        type: 'pie',
        radius: ['20%', '80%'],
        roseType: 'area',
        zlevel: 10,
        avoidLabelOverlap: true,

        label: {
          show: true,
          position: 'outside',
          // formatter: `{b|{b}}\n{d|{d}%}`,
          // rich: {
          //   b: {
          //     color: '#D6E0F3',
          //   },
          //   d: {
          //     color: '#65E6CE',
          //   },
          // },
          formatter: `{b}`,
          fontSize: 12,
          color: '#D6E0F3',
        },
        labelLine: {
          show: true,
          lineStyle: {
            width2: 20,
            color: '#1FCBD3', // 改变标示线的颜色
          },
        },
        data: [
          {
            value: props.dataArr[1] || 0,
            name: '良好人数\n良好占比',
          },
          {
            value: props.dataArr[2] || 0,
            name: '合格人数\n合格占比',
          },
          {
            value: props.dataArr[3] || 0,
            name: '不合格人数\n不合格占比',
          },
          {
            value: props.dataArr[0] || 0,
            name: '优秀人数\n优秀占比',
          },
        ],
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
  <div
    class="box"
    v-loading.lock="state.loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="content" v-show="!state.loading">
      <div class="top_box">
        <!-- 左边三个盒子 -->
        <div class="left">
          <div class="pic"></div>
          <div class="txt">学生平均得分</div>
          <div class="line"></div>
        </div>
        <!-- 右边数字 -->
        <div class="right">
          <CounttoTemplate
            :key="props.dataArr[4]"
            :endVal="Number(props.dataArr[4] || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="bottom_chart" ref="ChartRef"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;
  padding: 10px 0;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // border: 1px solid red;

    .top_box {
      width: 100%;
      height: 36px;
      // border: 1px solid red;
      display: flex;
      padding: 0 5px;

      .left {
        width: 219px;
        height: 100%;
        // border: 1px solid greenyellow;
        display: flex;
        align-items: center;

        .pic {
          transform: translateY(1px);
          width: 36px;
          height: 36px;
          background: url('@img/jxyy/pjdf_icon.png') no-repeat center;
          background-size: 100% 100%;
        }

        .txt {
          width: 93px;
          font-size: 15px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #ffffff;
        }

        .line {
          width: 90px;
          height: 12px;
          background: url('@img/jxyy/pjdf_line.png') no-repeat center;
          background-size: 100% 100%;
        }
      }

      .right {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 23px;
        margin-left: 5px;
        font-family: 'QTPS';
        font-weight: 500;
        color: #ffac40;
        // border: 1px solid pink;
      }
    }

    .bottom_chart {
      flex: 1;
      width: 100%;
      // border: 1px solid #fff;
    }
  }
}
</style>
