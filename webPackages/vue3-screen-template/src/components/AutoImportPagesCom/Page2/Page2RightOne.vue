<script setup>
import * as echarts from 'echarts'
import { useSettingStore } from '@/stores'
import { LoadingOutTime } from '@/constants'

const store = useSettingStore()
const { subBtnActive } = storeToRefs(store)

const TopChartRef = ref(null)
const BottomChartRef = ref(null)

const state = reactive({
  btnList: [{ name: '语文' }, { name: '数学' }, { name: '英语' }],
  ChartTop: null,
  ChartBottom: null,
  loading: false,
})

const btnClick = ({ numKey, from = 'JS' }) => {
  if (from == 'DOM') {
    if (subBtnActive.value == numKey) return
  }
  console.log('触发btnClick方法：', numKey, from)
  state.loading = true
  let opt = {}
  // TODO:请求接口
  switch (numKey) {
    // 语文
    case 1:
      opt = {
        // 雷达图-逆时针顺序
        TopChartObj: {
          avg: [3500, 14000, 20000, 25000, 32000],
          best: [3000, 9000, 16000, 20000, 28000],
        },
        BottomChartObj: {
          avg: [5000, 14000, 28000, 31000, 42000],
          best: [4300, 10000, 28000, 35000, 50000],
        },
      }
      break
    // 数学
    case 2:
      opt = {
        TopChartObj: {
          avg: [350, 1400, 20, 2500, 3200],
          best: [300, 900, 1600, 720, 2800],
        },
        BottomChartObj: {
          avg: [503, 1430, 2830, 3130, 4230],
          best: [430, 1000, 2800, 3500, 5000],
        },
      }
      break
    // 英语
    case 3:
      opt = {
        TopChartObj: {
          avg: [
            // 503, 1430, 2830, 3130, 4230
          ],
          best: [
            // 430, 1000, 2800, 3500, 5000
          ],
        },
        BottomChartObj: {
          avg: [
            // 350, 1400, 20, 2500, 3200
          ],
          best: [
            // 300, 900, 1600, 20, 2800
          ],
        },
      }
      break
  }
  store.changeSubBtnActive_Sync(numKey)
  loadTopChart(opt)
  loadBottomChart(opt)

  if (opt.TopChartObj.avg.length && opt.BottomChartObj.avg.length) {
    hideComLoading()
  } else {
    setTimeout(hideComLoading, LoadingOutTime)
  }
}

onMounted(() => {
  state.ChartTop = echarts.init(TopChartRef.value)
  state.ChartBottom = echarts.init(BottomChartRef.value)
})

const hideComLoading = () => {
  state.loading = false
}

// 加载顶部chart
const loadTopChart = ({ TopChartObj }) => {
  let option = {
    tooltip: {
      textStyle: {
        fontSize: 10,
      },
    },
    legend: {
      data: ['本校平均', '本校最好'],
      right: 55,
      bottom: 4,
      itemWidth: 20,
      itemHeight: 4,
      itemGap: 30,
      textStyle: {
        color: '#A4B3D1',
        fontSize: '10px',
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '理解' },
        { name: '记忆' },
        { name: '写作' },
        { name: '阅读' },
        { name: '联想' },
      ],
      axisName: {
        fontSize: '11px',
        color: '#fff',
      },
      splitArea: {
        areaStyle: {
          color: [
            'rgba(43,69,109, .4)',
            'rgba(56,88,138, .4)',
            'rgba(74,109,167, .6)',
            'rgba(83,126,198, .7)',
            'rgba(93,144,229, .8)',
          ].reverse(),
        },
      },
      // 雷达区域
      // splitArea: {
      //   show: false,
      // },
      // 雷达竖线
      splitLine: {
        show: false,
      },
      // 雷达环状线
      axisLine: {
        show: false,
      },
    },
    color: ['#ED9D35', '#EA68A2'],
    series: [
      {
        name: '',
        type: 'radar',
        symbolSize: 0, //边角圆珠的大小
        symbolRotate: 90,
        // areaStyle: {normal: {}},
        data: [
          {
            value: TopChartObj.avg,
            name: '本校平均',
          },
          {
            value: TopChartObj.best,
            name: '本校最好',
          },
        ],
      },
    ],
  }
  state.ChartTop.setOption(option)
}

// 加载底部chart
const loadBottomChart = ({ BottomChartObj }) => {
  let option = {
    tooltip: {
      textStyle: {
        fontSize: 10,
      },
    },
    legend: {
      data: ['本校平均', '本校最好'],
      right: 55,
      bottom: 4,
      itemWidth: 20,
      itemHeight: 4,
      itemGap: 30,
      textStyle: {
        color: '#A4B3D1',
        fontSize: '10px',
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '体育意识' },
        { name: '体质健康' },
        { name: '体育技能' },
        { name: '体育行为' },
        { name: '体育知识' },
      ],
      // (圆外的标签)雷达图每个指示器名称的配置项。
      axisName: {
        fontSize: '11px',
        color: '#fff',
        formatter: function (value) {
          if (['体质健康', '体育知识'].includes(value)) {
            let startTxt = value.slice(0, 2)
            let endTxt = value.slice(2)
            return `${startTxt}\n{end|${endTxt}}`
          } else {
            return value
          }
        },
        rich: {
          end: {
            lineHeight: 18,
          },
        },
      },
      splitArea: {
        areaStyle: {
          color: [
            'rgba(43,69,109, .4)',
            'rgba(56,88,138, .4)',
            'rgba(74,109,167, .6)',
            'rgba(83,126,198, .7)',
            'rgba(93,144,229, .8)',
          ].reverse(),
        },
      },
      // 雷达区域
      // splitArea: {
      //   show: false,
      // },
      // 雷达竖线
      splitLine: {
        show: false,
      },
      // 雷达环状线
      axisLine: {
        show: false,
      },
    },
    color: ['#ED9D35', '#EA68A2'],
    series: [
      {
        name: '',
        type: 'radar',
        symbolSize: 0, //边角圆珠的大小
        symbolRotate: 90,
        // areaStyle: {normal: {}},
        data: [
          {
            value: BottomChartObj.avg,
            name: '本校平均',
          },
          {
            value: BottomChartObj.best,
            name: '本校最好',
          },
        ],
      },
    ],
  }
  state.ChartBottom.setOption(option)
}

// 销毁chart
const destroyChart = () => {
  TopChartRef.value?.dispose()
  BottomChartRef.value?.dispose()
}

watch(
  () => subBtnActive.value,
  async (val) => {
    if (val) {
      console.log('子组件监听：', val)
      await nextTick()
      btnClick({ numKey: subBtnActive.value })
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
      <div class="top">
        <div class="title_top">学生主科能力水平掌握程度</div>
        <div class="center_btn_box">
          <div
            :class="[
              'item_btn',
              subBtnActive == idx + 1 ? 'btn_active' : 'btn_info',
            ]"
            v-for="({ name }, idx) in state.btnList"
            :key="idx"
            @click="$D(btnClick, 200, { numKey: idx + 1, from: 'DOM' })"
          >
            {{ name }}
          </div>
        </div>
        <div class="top_chart" ref="TopChartRef"></div>
      </div>

      <!-- 底部 -->
      <div class="bottom">
        <div class="title_top">学生体育素养评价</div>
        <div class="bottom_chart" ref="BottomChartRef"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height: 100%;

    .top {
      width: 100%;
      height: 53%;
      border: 1px solid transparent;

      .title_top {
        // border: 1px solid red;
        box-sizing: border-box;
        width: 266px;
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

      .center_btn_box {
        width: 100%;
        height: 40px;
        // border: 1px solid red;
        padding: 0 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .item_btn {
          width: 80px;
          height: 21px;
          display: grid;
          place-content: center;
          font-size: 14px;
          font-family: 'PingFang SC';
          color: #f2f4ff;
          transition: 0.3s;
        }

        .btn_info {
          background: url('@img/jxyy/btn_xszknlspzwd.png') no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;

          &:hover {
            background: url('@img/jxyy/btn_xszknlspzwd_xt.png') no-repeat center;
            background-size: 100% 100%;
          }
        }

        .btn_active {
          background: url('@img/jxyy/btn_xszknlspzwd_d.png') no-repeat center;
          background-size: 100% 100%;
          cursor: default;
        }
      }

      .top_chart {
        height: 265px;
        border: 1px solid transparent;
      }
    }

    .bottom {
      width: 100%;
      height: 47%;
      // border: 1px solid green;

      .title_top {
        // border: 1px solid red;
        box-sizing: border-box;
        width: 188px;
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
        transform: translateY(3px);
        height: 265px;
        border: 1px solid transparent;
      }
    }
  }
}
</style>
