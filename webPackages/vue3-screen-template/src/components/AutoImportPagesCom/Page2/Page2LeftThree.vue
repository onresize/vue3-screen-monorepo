<script setup>
import * as echarts from 'echarts'
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataObj: {
    type: Object,
    default: {
      bookObj: {
        total: 0, // 总数
        outTotal: 0, // 总借出
        outToday: 0, // 今日借出
        outMonth: 0, // 本月借出
        inTotal: 0, // 总还入
        inToday: 0, // 今日还入
        inMonth: 0, // 本月还入
      },
      boy: [0, 0, 0, 0, 0, 0],
      grily: [0, 0, 0, 0, 0, 0],
    },
  },
})

const ChartRef = ref(null)
const Chart = ref(null)

const state = reactive({
  loading: false,
})

const dataComputed = computed(() => props.dataObj)

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
      formatter: '{b}岁({a})：{c}个',
      textStyle: {
        fontSize: 10,
      },
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '5%',
      top: '16%',
      containLabel: true,
    },
    legend: {
      selectedMode: false, // 不允许变化
      data: ['女', '男'],
      right: 8,
      top: 4,
      textStyle: {
        color: '#A4B3D1',
      },
      itemWidth: 12,
      itemHeight: 6,
      // itemGap: 35
    },
    xAxis: {
      type: 'category',
      data: ['1-10', '11-20', '21-30', '31-40', '41-50', '50以上'],
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.08)',
        },
      },
      axisLabel: {
        // interval: 0,
        // rotate: 40,
        color: '#A4B3D1',
        fontSize: '9px',
        fontFamily: 'Microsoft YaHei',
      },
    },

    yAxis: {
      type: 'value',
      // max: "800",
      axisLine: {
        show: false,
        lineStyle: {
          color: '#A4B3D1',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.08)',
        },
      },
      axisLabel: {
        color: '#A4B3D1',
        fontSize: '9px',
        fontFamily: 'Microsoft YaHei',
      },
    },
    series: [
      {
        name: '女',
        type: 'bar',
        barWidth: '15%',
        barGap: '1',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7FBEEE',
            },
            {
              offset: 1,
              color: '#1267C8',
            },
          ]),
          borderRadius: 1,
        },
        data: dataComputed.value.grily,
      },
      {
        name: '男',
        type: 'bar',
        barWidth: '15%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7EF2D7',
            },
            {
              offset: 1,
              color: '#0C7651',
            },
          ]),
          borderRadius: 1,
        },
        data: dataComputed.value.boy,
      },
    ],
  }

  if (props.dataObj?.bookObj?.total) {
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
  () => ({ ...dataComputed.value }),
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
      <!-- 顶部 -->
      <div class="top_box">
        <div class="left">
          <div class="pic"></div>
          <div class="txt">馆藏图书</div>
          <div class="line"></div>
        </div>
        <div class="right">
          <CounttoTemplate
            :key="dataComputed?.bookObj?.total"
            :endVal="Number(dataComputed?.bookObj?.total || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>

      <!-- 中间 -->
      <div class="center_box">
        <div class="top">
          <div class="t_l">借出书籍数量</div>
          <div class="t_r">还入书籍数量</div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="title_t">
              <div class="left_name">总借出</div>
              <div class="right_num">
                <CounttoTemplate
                  :key="dataComputed?.bookObj?.outTotal"
                  :endVal="Number(dataComputed?.bookObj?.outTotal || 0)"
                  :decimals="0"
                  :duration="1e3"
                />
              </div>
            </div>
            <div class="inner_item inner_c">
              <div class="left_name">今日借出</div>
              <div class="right_num1">
                <CounttoTemplate
                  :key="dataComputed?.bookObj?.outToday"
                  :endVal="Number(dataComputed?.bookObj?.outToday || 0)"
                  :decimals="0"
                  :duration="1e3"
                />
              </div>
            </div>
            <div class="inner_item">
              <div class="left_name">本月借出</div>
              <div class="right_num1">
                <CounttoTemplate
                  :key="dataComputed?.bookObj?.outMonth"
                  :endVal="Number(dataComputed?.bookObj?.outMonth || 0)"
                  :decimals="0"
                  :duration="1e3"
                />
              </div>
            </div>
          </div>
          <div class="item">
            <div class="title_t">
              <div class="left_name">总还入</div>
              <div class="right_num">
                <CounttoTemplate
                  :key="dataComputed?.bookObj?.inTotal"
                  :endVal="Number(dataComputed?.bookObj?.inTotal || 0)"
                  :decimals="0"
                  :duration="1e3"
                />
              </div>
            </div>
            <div class="inner_item inner_c">
              <div class="left_name">今日还入</div>
              <div class="right_num1">
                <CounttoTemplate
                  :key="dataComputed?.bookObj?.inToday"
                  :endVal="Number(dataComputed?.bookObj?.inToday || 0)"
                  :decimals="0"
                  :duration="1e3"
                />
              </div>
            </div>
            <div class="inner_item">
              <div class="left_name">本月还入</div>
              <div class="right_num1">
                <CounttoTemplate
                  :key="dataComputed?.bookObj?.inMonth"
                  :endVal="Number(dataComputed?.bookObj?.inMonth || 0)"
                  :decimals="0"
                  :duration="1e3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <div class="bottom_chart_box">
        <div class="title_top">读者性别及年龄分布</div>
        <div class="bottom_chart" ref="ChartRef"></div>
      </div>
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

    .top_box {
      width: 100%;
      height: 36px;
      // border: 1px solid red;
      display: flex;
      padding: 0 5px;

      .left {
        width: 200px;
        height: 100%;
        // border: 1px solid greenyellow;
        display: flex;
        align-items: center;

        .pic {
          transform: translateY(1px);
          width: 36px;
          height: 36px;
          background: url('@img/jxyy/gcts_icon.png') no-repeat center;
          background-size: 100% 100%;
        }

        .txt {
          width: 65px;
          font-size: 15px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #ffffff;
        }

        .line {
          width: 90px;
          height: 12px;
          background: url('@img/jxyy/gcts_line.png') no-repeat center;
          background-size: 100% 100%;
        }
      }

      .right {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 23px;
        font-family: 'QTPS';
        font-weight: 500;
        color: #77bdff;
        // border: 1px solid pink;
      }
    }

    .center_box {
      width: 100%;
      height: 94px;
      border: 1px solid transparent;

      .top {
        // border: 1px solid red;
        width: 100%;
        height: 20px;
        font-size: 13px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #d6e0f3;
        display: flex;
        justify-content: space-around;

        .t_l {
          width: 81px;
          height: 13px;
          margin-left: 10px;
        }

        .t_r {
          width: 81px;
          height: 13px;
          margin-left: 5px;
        }
      }

      .bottom {
        width: 100%;
        height: 68px;
        // border: 1px solid yellow;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;

        .item {
          margin-left: 5px;
          width: 130px;
          height: 65px;
          background: url('@img/jxyy/jcsjsl_kuang.png') no-repeat center;
          background-size: 100% 100%;
          opacity: 0.8;

          .title_t {
            width: 100%;
            padding: 0 5px 0 10px;
            display: flex;
            justify-content: space-between;

            .left_name {
              font-size: 13px;
              font-family: 'PingFang SC';
              font-weight: 500;
              color: #c2e4ff;
            }

            .right_num {
              width: 42px;
              font-size: 13px;
              font-family: 'QTPS';
              font-weight: normal;
              color: #ffffff;
            }
          }

          .inner_item {
            width: 100%;
            height: 22px;
            padding: 0 5px 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left_name {
              font-size: 12px;
              font-family: 'PingFang SC';
              font-weight: 500;
              color: #c2e4ff;
            }

            .right_num1 {
              width: 42px;
              font-size: 12px;
              font-family: 'QTPS';
              font-weight: normal;
              color: #ffffff;
            }
          }

          .inner_c {
            transform: translateY(4px);
          }
        }
      }
    }

    .bottom_chart_box {
      flex: 1;
      width: 100%;
      // border: 1px solid #fff;

      .title_top {
        // border: 1px solid red;
        box-sizing: border-box;
        width: 206px;
        height: 17px;
        line-height: 15px;
        padding-left: 31px;
        margin: 15px 0 3px 0;
        background: url('@img/jxyy/xiaobiaoti.png') no-repeat center;
        background-size: 100% 100%;
        font-size: 15px;
        font-family: 'PFB';
        color: #d2e9ff;
        letter-spacing: 2px;
      }

      .bottom_chart {
        width: 100%;
        height: 190px;
        // border: 1px solid red;
      }
    }
  }
}
</style>
