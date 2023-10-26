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
  loading: true,
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
  // 整个圆拆分成20份
  let percentage = props.dataArr[0] / (props.dataArr[0] + props.dataArr[1]) // 占比
  let count = ~~(percentage * 20) // 女学生所占的份数
  let echartData = [{ value: 20 * (20 - count), name: 'boy' }]

  for (let i = count; i--; ) {
    echartData.push(
      { value: 5, name: 'girly', itemStyle: { color: 'rgba(0,0,0,0)' } },
      { value: 20, name: 'girly' },
      { value: 5, name: 'girly', itemStyle: { color: 'rgba(0,0,0,0)' } }
    )
  }

  let option = {
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '82%'],
        avoidLabelOverlap: false,
        emphasis: {
          scale: false,
        },
        itemStyle: {
          borderRadius: 0,
          // borderColor: '#fff',
          // borderWidth: 6,
          color: function (val) {
            if (val.name == 'boy') {
              return '#408ECA'
            } else {
              return '#00BF94'
            }
          },
        },
        tooltip: {
          show: false,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: echartData,
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
    class="content"
    v-loading.lock="state.loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div :class="['bg', !state.loading ? 'activeOpt' : 'infoOpt']">
      <div class="chart_box" ref="ChartRef"></div>
    </div>
    <div class="rightBox" v-show="!state.loading">
      <div class="top">
        <div class="box_left">
          <div class="title">女学生</div>
          <div class="line_bg"></div>
        </div>
        <div class="num">
          <CounttoTemplate
            :key="props.dataArr[0]"
            :endVal="Number(props.dataArr[0] || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="bottom">
        <div class="box_left">
          <div class="title">男学生</div>
          <div class="line_bg"></div>
        </div>
        <div class="num">
          <CounttoTemplate
            :key="props.dataArr[1]"
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
@import url('@/styles/deepCommmon.less');

.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .infoOpt {
    opacity: 0;
  }

  .activeOpt {
    opacity: 1;
  }

  .bg {
    width: 100px;
    height: 100px;
    background: url('@img/zhts/xueshengnannvblie_yuan.png') no-repeat center;
    background-size: 60px 60px;
    background-position-x: 22px;
    // border: 1px solid yellow;

    .chart_box {
      width: 100px !important;
      height: 100px !important;
    }
  }

  .rightBox {
    width: calc(100% - 100px);
    height: 70px;
    display: flex;
    flex-direction: column;

    .top {
      width: 100%;
      height: 50%;
      // border: 1px solid yellow;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .box_left {
        width: 113px;
        border: 1px solid transparent;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;

        .title {
          font-size: 15px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #d6e0f3;
        }

        .line_bg {
          width: 55px;
          height: 3px;
          margin: 0 5px;
          background: url('@img/zhts/line_nvxuesheng.png') no-repeat center;
          background-size: 100% 100%;
        }
      }

      .num {
        font-size: 17px;
        font-family: 'QTPS';
        font-weight: bold;
        color: #80d28e;
      }
    }

    .bottom {
      width: 100%;
      height: 50%;
      // border: 1px solid yellow;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .box_left {
        width: 113px;
        border: 1px solid transparent;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;

        .title {
          font-size: 15px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #d6e0f3;
        }

        .line_bg {
          width: 55px;
          height: 3px;
          margin: 5px;
          background: url('@img/zhts/line_nanxuesheng.png') no-repeat center;
          background-size: 100% 100%;
        }
      }

      .num {
        font-size: 17px;
        font-family: 'QTPS';
        font-weight: bold;
        color: #80b2e0;
      }
    }
  }
}
</style>
