<script setup>
import { useSettingStore } from '@/stores'
import { LoadingOutTime } from '@/constants'

// const props = defineProps({
//   dataArr: {
//     type: Array,
//     default: [0, 0, 0],
//   },
// })

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
  loading: true,
  dialogLoading: true,
  showDialog: false,
  dialogList: [
    { name: '告警类型', txt: '特殊人员' },
    { name: '告警照片', txt: 'xxxx' },
    { name: '告警时间', txt: '2023-10-1 12:30:32' },
    { name: '处理情况+处理人', txt: '未处理(张三)' },
  ],
})

const dateBrComputed = computed(() => (str) => {
  let topDate = str.slice(0, 10) // 日期
  let bottomTime = str.slice(10) // 时间
  return `${topDate}\n${bottomTime}`
})

setTimeout(() => {
  state.loading = true
  // 模拟数据
  const mockList = []
  for (let index = 0; index < 100; index++) {
    mockList.push({
      id: index,
      type: '类型区' + index,
      pic: 'https://p1.music.126.net/XVg-o_520Fds9Ut60-O8SA==/109951168608721637.jpg?param=30y30',
      time: '2023-09-11 12:23:51',
      completeSchedule: '未处理',
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
  <div class="table_box">
    <!-- 表头 -->
    <div class="table_header">
      <span>类型</span>
      <span>照片</span>
      <span>时间</span>
      <span>处理情况</span>
    </div>
    <!-- 列表 -->
    <div class="table_list">
      <vxe-table
        ref="tableRef"
        show-overflow="title"
        :show-header="false"
        height="165px"
        min-height="70"
        align="center"
        :border="false"
        :row-config="{ isCurrent: true, isHover: true, height: 41 }"
        :data="tableData"
        :scroll-y="{ enabled: true }"
        @cell-click="cellClick"
      >
        <vxe-column field="type" width="70" title="类型">
          <template #default="{ row }">
            <span class="slot_span">
              {{ row.type }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="pic" title="照片">
          <template #default="{ row }">
            <ImgMask
              v-bind="{
                imgSrc: row.pic,
                styleObj: {
                  width: '44px',
                  height: '25px',
                  'object-fit': 'cover',
                },
              }"
            />
          </template>
        </vxe-column>
        <vxe-column field="time" width="100" title="时间">
          <template #default="{ row }">
            <span class="slot_span">
              <!-- {{ row.time }} -->
              {{ dateBrComputed(row.time) }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="completeSchedule" title="处理情况">
          <template #default="{ row }">
            <span class="slot_span">
              {{ row.completeSchedule }}
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
</template>

<style scoped lang="less">
.table_box {
  width: 100%;
  height: 200px;
  padding: 6px 0 0 0;
  // border: 1px solid yellow;

  .table_header {
    width: 100%;
    height: 26px;
    margin-top: 4px;
    // border: 1px solid red;
    font-size: 13px;
    font-family: 'PingFang SC';
    letter-spacing: 1px;
    font-weight: 500;
    color: #a5c5de;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & span:nth-child(3) {
      transform: translateX(5px);
    }

    & span:nth-child(4) {
      transform: translateX(10px);
    }
  }

  .table_list {
    width: 100%;
    height: 165px;
    // border: 1px solid red;
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
    background-size: 100% 100%;
  }

  // 默认行背景
  :deep(.vxe-table--render-default .vxe-table--body-wrapper table) {
    background-color: transparent;
    color: #fff;
    cursor: pointer;
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
    right: 105%;
    top: 60px;
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

:deep(.el-loading-spinner .path) {
  stroke: #fff;
  filter: drop-shadow(0 0 5px skyblue);
}
</style>
