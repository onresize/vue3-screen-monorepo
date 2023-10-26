<script setup>
import { useSettingStore } from '@/stores'
import { LoadingOutTime } from '@/constants'
import { ClickOutside as vClickOutside } from 'element-plus'
import { $flowDialog } from '@cp/FlowDialog/index'

const store = useSettingStore()
const {
  globalPollingDiffId,
  tableData,
  globalPlayDiffId,
  sxtBoxList,
  winBtnList,
} = storeToRefs(store)

const { proxy } = getCurrentInstance()

const tableRef = ref(null)
const PopoverRef = ref(null)

const state = reactive({
  val: '摄像头分类',
  loading: true,
  BF_ico: new URL('@img/zhaf/bofang.png', import.meta.url).href,
  ZT_ico: new URL('@img/zhaf/zanting.png', import.meta.url).href,
  add_ico: new URL('@img/zhaf/jiahao.png', import.meta.url).href,
  add_d_ico: new URL('@img/zhaf/jiahao_d.png', import.meta.url).href,
  showPlayBtnState: true, // 弹窗显隐
  clientY: 0, // 弹出层-顶部距离
})

const distanceY = computed(() => state.clientY - 220 + 'px')

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

// 是否有某个轮巡状态高亮
const isSomePolling = computed(() =>
  sxtBoxList.value.some((v) => v.show == true)
)

setTimeout(() => {
  state.loading = true
  // 模拟数据
  const mockList = []
  for (let index = 0; index < 100; index++) {
    mockList.push({
      id: index,
      name: 'XX' + index,
      sub: '在线',
      playState: false, // 播放状态
      isPolling: false, // 轮巡状态
    })
  }

  if (mockList.length) {
    hideComLoading()
    store.changeTableData_Sync(mockList)
  } else {
    setTimeout(hideComLoading, LoadingOutTime)
  }
}, 0.1e3)

const hideComLoading = (option) => {
  state.loading = false
}

// 清除轮巡高亮状态
const resetTablePollingState = () => {
  tableData.value.forEach((v) => {
    v.isPolling = false
  })
  state.showPlayBtnState = false
}

// 播放、暂停
const changePlaySate = (row) => {
  row.playState = !row.playState

  if (row.playState) {
    store.changeGlobalPlayDiffId_Sync(row.id)
    $flowDialog.show((close) => {
      console.log('点击了关闭走进了回调----', close)
      close() //关闭弹窗
      // 重置列表状态
      unref(tableData).forEach((v) => {
        if (v.id == globalPlayDiffId.value) {
          v.playState = false
        }
      })
    })
  }

  console.log('播放状态（取反后）：', row.playState)
}

// 轮巡加号
const showWillPlayList = ({ e, row }) => {
  console.log('showWillPlayList', row.id)
  state.clientY = e.y

  store.changeWinBtnListAllId_Sync(row.id) // 把表格数据行的id、赋值给轮巡视窗按钮数据上、比对备用

  if (globalPollingDiffId.value == row?.id) {
    // XXX点击是同一项
    row.isPolling = !row.isPolling
    state.showPlayBtnState = !state.showPlayBtnState
  } else {
    // XXX点击不是同一项
    resetTablePollingState()
    store.changeGlobalPollingDiffId_Sync(row?.id)
    nextTick(() => {
      row.isPolling = !row.isPolling
      if (!state.showPlayBtnState) {
        state.showPlayBtnState = true
      }
      console.log('轮巡状态（取反后）：', row.isPolling)
    })
  }
}

// 轮巡视窗按钮、添加到重点轮巡集合
const changeSxtBoxListShow = ({ idx, id }) => {
  console.log('改变视窗口id：', id)
  store.changeSxtBoxList_Sync(idx)
  store.changeSxtBoxListItemId_Sync(idx, id)

  // 四个按钮全部非高亮
  if (!unref(isSomePolling)) {
    nextTick(() => {
      resetTablePollingState()
      state.showPlayBtnState = false
    })
  }
}

// 关闭轮巡视窗
const toCloseWindow = (idx) => {
  unref(sxtBoxList)[idx].show = false

  // 四个视窗全部关闭
  if (!unref(isSomePolling)) {
    nextTick(() => {
      resetTablePollingState()
      state.showPlayBtnState = false
    })
  }
}

// 列表滚动触发
const vxeScroll = () => {
  unref(isSomePolling) &&
    nextTick(() => {
      console.log('列表滚动触发状态销毁重置:', unref(isSomePolling))
      resetTablePollingState()
      state.showPlayBtnState = false
    })
}
</script>

<template>
  <div class="box">
    <!-- 顶部 -->
    <div class="top">
      <div class="top_t">
        <div class="pic"></div>
        <div class="txt">监控摄像头</div>
        <div class="num">
          <CounttoTemplate
            :key="8571"
            :endVal="Number(8571 || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="top_b">
        <div class="top_b_item">
          <div class="pic_l"></div>
          <div class="box_r">
            <div class="txt">人行门禁</div>
            <div class="num">
              <CounttoTemplate
                :key="71"
                :endVal="Number(71 || 0)"
                :decimals="0"
                :duration="1e3"
              />
            </div>
          </div>
        </div>
        <div class="top_b_item">
          <div class="pic_r"></div>
          <div class="box_r">
            <div class="txt">车行道闸</div>
            <div class="num">
              <CounttoTemplate
                :key="8"
                :endVal="Number(8 || 0)"
                :decimals="0"
                :duration="1e3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间 -->
    <div class="center">
      <div class="inner_title">摄像头列表</div>
      <div class="select_box">
        <el-select
          :popper-append-to-body="false"
          popper-class="select_SXT"
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
          <span>添加轮巡</span>
        </div>
        <!-- 列表 -->
        <div class="table_list">
          <vxe-table
            ref="tableRef"
            show-overflow
            :show-header="false"
            height="370px"
            min-height="70"
            align="center"
            :border="false"
            :row-config="{ isCurrent: true, isHover: true, height: 37 }"
            :data="tableData"
            :scroll-y="{ enabled: true }"
            @scroll="$T(vxeScroll)"
          >
            <vxe-column field="name" width="90" title="设施名称">
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
            <vxe-column field="sub" width="65" title="联网状态">
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

                  <!-- 加号 -->
                  <img
                    class="icon2"
                    :src="row.isPolling ? state.add_d_ico : state.add_ico"
                    alt=""
                    @click.stop.prevent="
                      (e) => $D(showWillPlayList, 200, { e, row })
                    "
                  />
                </div>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </div>
    </div>

    <!-- 轮巡按钮弹出层 -->
    <div class="btn_box_popover" v-show="state.showPlayBtnState">
      <div
        :class="[
          'btn_box_item_p',
          sxtBoxList[idx].show ? 'btnActive' : 'btnInfo',
        ]"
        v-for="({ id }, idx) in winBtnList"
        :key="idx"
        @click="$D(changeSxtBoxListShow, 200, { idx, id })"
      >
        {{ `轮巡视窗${idx + 1}-${id}` }}
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <div class="inner_title">重点轮巡</div>
      <div class="sxt_box">
        <div class="item_sxt_box" v-for="(item, idx) in sxtBoxList" :key="idx">
          <div class="outer_box" v-if="item.show">
            <div class="win_title">{{ `轮巡视窗${idx + 1}-${item.id}` }}</div>
            <div class="close" @click="toCloseWindow(idx)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
/* 下拉弹出层 */
.select_SXT {
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

.btn_box_popover {
  // backdrop-filter: blur(5px);
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  padding: 10px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  left: 330px;
  top: v-bind(distanceY);
  transition: 0.6s;

  .btn_box_item_p {
    width: 143px;
    height: 29px;
    text-align: center;
    line-height: 29px;
    cursor: pointer;
    color: #fff;
    font-size: 13px;
    font-family: 'PingFang SC';
    font-weight: 500;
    border-radius: 3px;

    // &:hover {
    //   background: url('@img/zhaf/btn_lxsc_xt.png') no-repeat center;
    //   background-size: 100% 100%;
    // }
  }

  .btnActive {
    background: url('@img/zhaf/btn_lxsc_d.png') no-repeat center;
    background-size: 100% 100%;
  }

  .btnInfo {
    background: url('@img/zhaf/btn_lxsc.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
<style scoped lang="less">
@import url('@/styles/Page3LeftOne.less');
</style>
