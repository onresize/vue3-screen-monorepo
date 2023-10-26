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

const state = reactive({
  cardList: [
    {
      title: '防区告警\n总数',
      num: '413',
    },
    {
      title: '已处理告\n警数',
      num: '323',
    },
    {
      title: '本月防区\n告警数',
      num: '315',
    },
    {
      title: '本月已处\n理告警数',
      num: '223',
    },
  ],
})

onMounted(() => {
  Chart.value = echarts.init(ChartRef.value)
})

const hideComLoading = (arg) => {
  Chart.value.setOption(arg)
}

// 加载chart
const loadChart = () => {
  var yMax = 5
  var dataShadow = []
  var data = props.dataArr

  for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax)
  }
  let option = {
    grid: {
      left: '3%',
      right: '7%',
      top: '10%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {},
    xAxis: {
      data: ['10.01', '10.02', '10.03', '10.04', '10.05'],
      axisLabel: {
        color: '#fff', //X轴文字颜色
        fontSize: '12px',
      },
      axisLine: {
        lineStyle: {
          color: '#434952',
        },
      },
      boundaryGap: false,
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(135,140,147,0.8)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#fff',
          fontSize: '12px',
        },
      },
      {
        type: 'value',
        position: 'right',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: 'circle', //将小圆点改成实心 不写symbol默认空心
        symbol:
          'image://data:image/png;base64,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',
        symbolSize: 25, //标记的大小
        itemStyle: {
          color: '#5DA882', //折线拐点标志的样式
        },
        lineStyle: {
          width: 2,
          color: '#7F96CF',
        },
        areaStyle: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(42, 98, 180, .9)',
              },
              {
                offset: 1,
                color: 'rgba(28, 41, 60, 0.2)',
              },
            ],
            false
          ),
        },
        data: data,
      },
      {
        name: '',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#84E5C0',
            },
            {
              offset: 1,
              color: '#20595C',
            },
          ]),
        },
        data: data,
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
  <div class="box">
    <!-- 顶部 -->
    <div class="top">
      <div class="item" v-for="(item, idx) in state.cardList" :key="idx">
        <div class="title" v-text="item.title"></div>
        <div class="number">
          <CounttoTemplate
            :key="item.num"
            :endVal="Number(item.num || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="inner_title">告警趋势</div>
      <div class="bottom_chart" ref="ChartRef"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;

  .top {
    width: 100%;
    height: 130px;
    // border: 1px solid red;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;

    .item {
      width: 65px;
      height: 83px;
      background: url('@img/zhaf/dzwl_bg.png') no-repeat center;
      background-size: 100% 100%;
      // filter: drop-shadow(0 0px 1px #8f9196);

      .title {
        width: 100%;
        font-size: 13px;
        font-family: 'PingFang SC';
        color: #ffffff;
        text-shadow: 0px 0px 30px blue;
        text-align: center;
        transform: translateY(14px);
      }

      .number {
        width: 100%;
        font-size: 19px;
        color: #77e7ff;
        font-family: 'QTPS';
        text-align: center;
        transform: translateY(14px);
      }
    }
  }

  .bottom {
    width: 100%;
    height: 215px;
    // border: 1px solid yellow;

    .inner_title {
      box-sizing: border-box;
      width: 158px;
      height: 17px;
      line-height: 15px;
      padding-left: 31px;
      margin: 0 0 3px 0;
      background: url('@img/jxyy/xiaobiaoti.png') no-repeat center;
      background-size: 100% 100%;
      font-size: 15px;
      font-family: 'PFB';
      color: #d2e9ff;
      letter-spacing: 2px;
    }

    .bottom_chart {
      width: 100%;
      height: 194px;
      // border: 1px solid red;
    }
  }
}
</style>
