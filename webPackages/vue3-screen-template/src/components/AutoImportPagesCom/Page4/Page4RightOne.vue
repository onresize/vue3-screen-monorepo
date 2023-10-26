<script setup>
import { useSettingStore } from '@/stores'
import { LoadingOutTime } from '@/constants'
import { ClickOutside as vClickOutside } from 'element-plus'
import { $flowDialog } from '@cp/FlowDialog/index'

const store = useSettingStore()

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
const state = reactive({
  loading: true,
  dialogLoading: true,
  showDialog: false,
  SXT_tableData: [],
  JF_tableData: [],
  val: '设备类型（门禁摄像头）',
  BF_ico: new URL('@img/zhaf/bofang1.png', import.meta.url).href,
  ZT_ico: new URL('@img/zhaf/zanting.png', import.meta.url).href,
  dialogList: [
    { name: '告警类型', txt: '特殊人员' },
    { name: '告警时间', txt: '2023-10-1 12:30:32' },
    { name: '处理情况+处理人', txt: 'xxxx(张三)' },
  ],
})

const options = [
  {
    value: '摄像头',
    label: '摄像头',
  },
  {
    value: '摄像头0',
    label: '摄像头1',
  },
  {
    value: '摄像头2',
    label: '摄像头3',
  },
  {
    value: '摄像头4',
    label: '摄像头5',
  },
  {
    value: '摄像头6',
    label: '摄像头7',
  },
  {
    value: '摄像头8',
    label: '摄像头9',
  },
]

setTimeout(() => {
  state.loading = true
  // 模拟数据
  const mockList = []
  const mockList1 = []
  for (let index = 0; index < 100; index++) {
    mockList.push({
      id: index,
      name: 'XX' + index,
      sub: '在线',
      playState: false, // 播放状态
    })
    mockList1.push({
      id: index,
      name: '类型' + index,
      timer: '2023-10-05 12:30:42',
      finishPercent: '未处理',
    })
  }

  if (mockList.length && mockList1.length) {
    hideComLoading()
    state.SXT_tableData = mockList
    state.JF_tableData = mockList1
  } else {
    setTimeout(hideComLoading, LoadingOutTime)
  }
}, 0.1e3)

const hideComLoading = (option) => {
  state.loading = false
}

// 播放、暂停
const changePlaySate = (row) => {
  row.playState = !row.playState

  if (row.playState) {
    $flowDialog.show((close) => {
      console.log('点击了关闭走进了回调----', close)
      close() //关闭弹窗
      state.SXT_tableData.forEach((v) => {
        if (v.playState) {
          v.playState = false
        }
      })
    })
  }

  console.log('播放状态（取反后）：', row.playState)
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
    <div class="top">
      <div class="bg_box">
        <div class="top_cell">
          <CounttoTemplate
            :endVal="Number(520)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
        <div class="center_cell">
          <CounttoTemplate
            :endVal="Number(121)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
        <div class="bottom_cell">
          <CounttoTemplate
            :endVal="Number(641)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
    </div>

    <!-- 中间 -->
    <div class="center">
      <div class="select_box">
        <el-select
          :popper-append-to-body="false"
          popper-class="select_SBLX"
          size="default"
          v-model="state.val"
          placeholder=" "
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="table_box">
        <!-- 表头 -->
        <div class="table_header">
          <span>设施名称</span>
          <span>联网状态</span>
          <span>播放</span>
        </div>
        <!-- 列表 -->
        <div class="table_list">
          <vxe-table
            ref="tableRef"
            show-overflow
            :show-header="false"
            height="300px"
            min-height="70"
            align="center"
            :border="false"
            :row-config="{ isCurrent: true, isHover: true, height: 37 }"
            :data="state.SXT_tableData"
            :scroll-y="{ enabled: true }"
          >
            <vxe-column field="name" width="100" title="设施名称">
              <template #default="{ row }">
                <div
                  :class="[
                    'item_name_box',
                    row.playState ? 'activeBgc' : 'infoBgc',
                  ]"
                >
                  {{ row.name }}
                </div>
              </template>
            </vxe-column>
            <vxe-column field="sub" width="115" title="联网状态">
              <template #default="{ row }">
                <div :class="['online_state']">
                  {{ row.sub }}
                </div>
              </template>
            </vxe-column>
            <vxe-column title="播放">
              <template #default="{ row }">
                <div class="edit_box">
                  <!-- 播放、暂停 -->
                  <img
                    class="icon1"
                    :src="row.playState ? state.BF_ico : state.ZT_ico"
                    alt=""
                    @click.stop="$D(changePlaySate, 200, row)"
                  />
                </div>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <div class="inner_title">机房告警</div>
      <div class="table_box">
        <!-- 表头 -->
        <div class="table_header">
          <span>类型</span>
          <span>时间</span>
          <span>处理情况</span>
        </div>
        <!-- 列表 -->
        <div class="table_list">
          <vxe-table
            ref="tableRef"
            show-overflow
            :show-header="false"
            height="296px"
            min-height="70"
            align="center"
            :border="false"
            :row-config="{ isCurrent: true, isHover: true, height: 37 }"
            :data="state.JF_tableData"
            :scroll-y="{ enabled: true }"
            @cell-click="cellClick"
          >
            <vxe-column field="name" width="80" title="类型">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.name }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="timer" width="135" title="时间">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.timer }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="finishPercent" title="处理情况">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.finishPercent }}
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

<style lang="less">
/* 下拉弹出层 */
.select_SBLX {
  margin: -7px 0 0 0;
  background-color: rgba(39, 65, 102, 0.95) !important;
  filter: drop-shadow(0 0px 5px rgba(39, 65, 102, 0.65));
}

.el-popper.is-light {
  border-color: transparent !important;
}

.el-select__popper.el-popper {
  border-color: transparent !important;
  box-shadow: none !important;
}

.el-select__popper.el-popper {
  border-color: transparent !important;
  box-shadow: none !important;
}

/* 隐藏下拉框小三角 */
.el-popper.is-light .el-popper__arrow::before {
  border: none !important;
  background: transparent !important;
}
</style>
<style scoped lang="less">
@import url('@/styles/Page4RightOne.less');
</style>
