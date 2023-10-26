<script setup>
import { useSettingStore } from '@/stores'
import { LoadingOutTime } from '@/constants'

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const tableRef = ref(null)
const tableData = ref([])
const state = reactive({
  loading: false,
  dialogLoading: true,
  showDialog: false,
  todayInNum: 993,
  todayOutNum: 734,
  dialogList: [
    { name: '设备名称', txt: 'xxxx' },
    { name: '进出状态', txt: 'xxxx' },
    { name: '通行时间', txt: '2023-10-1 12:30:32' },
    { name: '通行方式', txt: '开车' },
    { name: '是否预约', txt: '否' },
  ],
})

const inWidth = computed(
  () =>
    (state.todayInNum / (state.todayInNum + state.todayOutNum) / 2).toFixed(2) *
      100 +
    '%'
)
const outWidth = computed(
  () =>
    (state.todayOutNum / (state.todayInNum + state.todayOutNum) / 2).toFixed(
      2
    ) *
      100 +
    '%'
)

setTimeout(() => {
  state.loading = true
  // 模拟数据
  const mockList = []
  for (let index = 0; index < 100; index++) {
    mockList.push({
      id: index,
      name: 'XXXX' + index,
      inState: '进入',
      timer: '2023-10-22 13:23:45',
    })
  }

  if (mockList.length) {
    hideComLoading()
    tableData.value = mockList
  } else {
    setTimeout(hideComLoading, LoadingOutTime)
  }
}, 0.1e3)

const hideComLoading = (option) => {
  state.loading = false
}

// 取消行高亮
const clearSelectEvent = () => {
  if (unref(tableRef)) {
    unref(tableRef).clearCurrentRow()
  }
}

// 行点击
const cellClick = ({ row }) => {
  state.dialogLoading = true
  if (!state.showDialog) {
    state.showDialog = true
  }
  setTimeout(() => {
    state.dialogLoading = false
  }, 0.5e3)
  console.log('表格行点击：', row)
}

const closeClick = () => {
  clearSelectEvent()
  state.showDialog = false
}
</script>

<template>
  <div class="box">
    <!-- 顶部 -->
    <div class="top_box">
      <div class="right_title">单位:个</div>
      <div class="bg_box">
        <div class="left_bg">
          <div class="number">
            <CounttoTemplate
              :endVal="Number(154)"
              :decimals="0"
              :duration="1e3"
            />
          </div>
        </div>

        <div class="center_bg">
          <div class="number">
            <CounttoTemplate
              :endVal="Number(100)"
              :decimals="0"
              :duration="1e3"
            />
          </div>
        </div>

        <div class="right_bg">
          <div class="number">
            <CounttoTemplate
              :endVal="Number(54)"
              :decimals="0"
              :duration="1e3"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom_box">
      <div class="inner_title">通行数据</div>
      <div class="inner_top_box">
        <div class="top_number">
          <div class="left_txt">993</div>
          <div class="center_progress">
            <div
              class="part_l"
              :style="{ width: inWidth }"
              :key="inWidth"
            ></div>
            <div
              class="part_r"
              :style="{ width: outWidth }"
              :key="outWidth"
            ></div>
          </div>
          <div class="right_txt">734</div>
        </div>
        <div class="bottom_txt">
          <div>今日进入人数</div>
          <div>今日外出人数</div>
        </div>
      </div>
      <div class="table_box">
        <!-- 表头 -->
        <div class="table_header">
          <span>设备名称</span>
          <span>进出状态</span>
          <span>通行时间</span>
        </div>
        <!-- 列表 -->
        <div class="table_list">
          <vxe-table
            ref="tableRef"
            show-overflow
            :show-header="false"
            height="110px"
            min-height="70"
            align="center"
            :border="false"
            :row-config="{ isCurrent: true, isHover: true, height: 37 }"
            :data="tableData"
            :scroll-y="{ enabled: true }"
            @cell-click="cellClick"
          >
            <vxe-column field="name" width="80" title="设备名称">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.name }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="inState" title="进出状态">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.inState }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="timer" width="135" title="通行时间">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.timer }}
                </span>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
        <!-- 下转弹窗 -->
        <div
          class="dialog"
          v-if="state.showDialog"
          v-loading.lock="state.dialogLoading"
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(0, 0, 0, 0.6)"
        >
          <div class="close" @click="closeClick"></div>
          <div class="label_top">
            <div
              v-for="(itemObj, idx) in state.dialogList"
              :key="idx"
              :class="['item_cell']"
            >
              <div class="ico"></div>
              <div class="name" data-txt=":">
                {{ itemObj.name }}
              </div>
              <div class="txt">{{ itemObj.txt }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;

  .top_box {
    width: 100%;
    height: 170px;
    display: flex;
    // border: 1px solid yellow;
    position: relative;

    .right_title {
      position: absolute;
      right: 10px;
      top: 3px;
      font-size: 9px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #8e9ebd;
      line-height: 9px;
    }

    .bg_box {
      width: 260px;
      height: 127px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;

      .left_bg {
        width: 120px;
        height: 96px;
        background: url('@img/zcgl/dzzs_tuxing.png') no-repeat center;
        background-size: 100% 100%;

        .number {
          font-size: 28px;
          font-family: 'QTPS';
          font-weight: normal;
          color: #9cedaa;
          transform: translateY(85px);
        }
      }

      .center_bg {
        width: 55px;
        height: 55px;
        background: url('@img/zcgl/zaixian_tuxing.png') no-repeat center;
        background-size: 100% 100%;

        .number {
          font-size: 20px;
          font-family: 'QTPS';
          font-weight: normal;
          color: #58c7ff;
          transform: translateY(56px);
        }
      }

      .right_bg {
        width: 55px;
        height: 55px;
        background: url('@img/zcgl/lixian_tuxing.png') no-repeat center;
        background-size: 100% 100%;
        transform: translateX(15px);

        .number {
          font-size: 20px;
          font-family: 'QTPS';
          font-weight: normal;
          color: #58c7ff;
          transform: translateY(56px);
        }
      }
    }
  }

  .bottom_box {
    width: 100%;
    height: 270px;
    // border: 1px solid red;

    .inner_title {
      box-sizing: border-box;
      width: 168px;
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

    .inner_top_box {
      width: 100%;
      height: 54px;
      margin: 10px auto;
      border: 1px solid transparent;
      background: url('@img/zcgl/txsj_tuxing.png') no-repeat center;
      background-size: 100% 100%;

      .top_number {
        width: 100%;
        height: 30px;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left_txt {
          text-align: left;
          width: 45px;
          font-size: 16px;
          font-family: 'QTPS';
          font-weight: normal;
          color: #d5c4ff;
        }

        .center_progress {
          // border: 1px solid yellow;
          width: 204px;
          height: 10px;
          display: flex;
          align-items: center;
          position: relative;
          top: 1px;

          .part_l {
            position: absolute;
            right: 50%;
            transition: all 0.6s linear;
            height: 8px;
            background-image: linear-gradient(
              to right,
              #9dabfa,
              #8895d8,
              #737fb6,
              #606a95,
              #4e5676
            );
            border-radius: 4px 0 0 4px;
          }

          .part_r {
            position: absolute;
            left: 50%;
            transition: all 0.6s linear;
            height: 8px;
            background-image: linear-gradient(
              to left,
              #61a3ff,
              #628edb,
              #5e7bb8,
              #586896,
              #4e5676
            );
            border-radius: 0 4px 4px 0;
          }
        }

        .right_txt {
          text-align: right;
          width: 45px;
          font-size: 16px;
          font-family: 'QTPS';
          font-weight: normal;
          color: #61a3ff;
        }
      }

      .bottom_txt {
        width: 100%;
        height: 24px;
        // border: 1px solid red;
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;

        & > div {
          margin: 0 8px;
        }
      }
    }

    .table_box {
      width: 100%;
      height: 150px;
      margin-top: 10px;
      border: 1px solid transparent;

      .table_header {
        width: 100%;
        height: 16px;
        margin-top: 15px;
        // border: 1px solid red;
        font-size: 13px;
        font-family: 'PingFang SC';
        letter-spacing: 1px;
        font-weight: 500;
        color: #a5c5de;
        display: flex;
        justify-content: space-around;
        align-items: center;

        & span:nth-child(1) {
          transform: translateX(-7px);
        }

        & span:nth-child(2) {
          transform: translateX(-28px);
        }

        & span:nth-child(3) {
          transform: translateX(-25px);
        }
      }

      .table_list {
        width: 100%;
        padding: 4px 0;
        // background: url('@img/zhaf/biaoge_line.png') no-repeat center;
        background-size: 100% 100%;

        .slot_span {
          font-size: 12px;
          cursor: default !important;
        }
      }

      // 选中行背景
      :deep(.vxe-table--render-default .vxe-body--row.row--current) {
        background: url('@img/jxyy/zbkc_kuang_d.png') no-repeat center;
        // background-color: transparent !important;
        background-size: 100% 100%;
      }

      // 默认行背景
      :deep(.vxe-table--render-default .vxe-table--body-wrapper table) {
        background-color: transparent;
        color: #fff;
      }

      // 鼠标悬浮行背景
      :deep(.vxe-table--render-default .vxe-body--row.row--hover) {
        background: url('@img/jxyy/zbkc_kuang.png') no-repeat center;
        background-size: 100% 100%;
      }

      // 外边框
      :deep(.vxe-table--render-default .vxe-table--border-line) {
        border: 0;
      }

      :deep(.vxe-table--render-default .vxe-footer--column) {
        background-color: transparent !important;
      }

      .dialog {
        position: absolute;
        left: 105%;
        bottom: 25px;
        width: 275px;
        height: 166px;
        background: url('@img/jxyy/zhibokecheng_tantu.png') no-repeat center;
        background-size: 100% 100%;

        .close {
          position: absolute;
          right: 4px;
          top: 6px;
          width: 18px;
          height: 18px;
          background: url('@img/common/close_d.png') no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;

          &:hover {
            background: url('@img/common/close.png') no-repeat center;
            background-size: 100% 100%;
          }
        }

        .label_top {
          width: 100%;
          height: 163px;
          padding: 0 0 0 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .removeOpt {
            opacity: 0;
          }

          .item_cell {
            width: 100%;
            height: 30px;
            // border: 1px solid #fff;
            display: flex;
            align-items: center;

            .ico {
              width: 14px;
              height: 15px;
              margin-right: 3px;
              background: url('@img/jxyy/dian.png') no-repeat center;
              background-size: 100% 100%;
            }

            .name {
              font-size: 13px;
              font-family: 'PingFang SC';
              font-weight: 500;
              color: #d6e0f3;

              &::after {
                content: attr(data-txt);
                margin-right: 8px;
              }
            }

            .txt {
              // border: 1px solid red;
              font-size: 13px;
              font-family: 'PingFang SC';
              font-weight: 500;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

:deep(.el-loading-spinner .path) {
  stroke: #fff;
  filter: drop-shadow(0 0 5px skyblue);
}
</style>
