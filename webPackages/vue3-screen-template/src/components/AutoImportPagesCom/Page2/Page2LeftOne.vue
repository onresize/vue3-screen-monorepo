<script setup>
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

const state = reactive({
  LuBoList: [
    { name: '设备名称', txt: '这是设备设备设备' },
    { name: '设备型号', txt: '这是设备设备设备' },
    { name: '设备名称', txt: '这是设备设备设备' },
    { name: '设备型号', txt: '这是设备设备设备' },
    { name: '设备名称', txt: '这是设备设备设备' },
    { name: '设备型号', txt: '这是设备设备设备' },
  ],
  numberArr: [
    { name: '语文数量', num: 20 },
    { name: '数学数量', num: 20 },
    { name: '英语数量', num: 20 },
  ],
  dialogList: [
    { name: '直播课程名称', txt: '' },
    { name: '资源点播路径', txt: '' },
    { name: '作者姓名', txt: '' },
    { name: '关联的课表ID', txt: '' },
    { name: '学科', txt: '' },
    { name: '直播开始时间', txt: '' },
    { name: '直播结束时间', txt: '' },
    {},
    { name: '直播截图' },
  ],
  showDialog: false,
  loading: true,
  dialogLoading: true,
})

const argObj = reactive({
  styleObj: {
    width: '182px',
    height: '102px',
    'object-fit': 'cover',
    'border-radius': '2px',
  },
  renderNum: 2,
  txt: '查看',
})

const tableData = ref([])
setTimeout(() => {
  state.loading = true
  // 模拟数据
  const mockList = []
  for (let index = 0; index < 100; index++) {
    mockList.push({
      id: index,
      name: '张三' + index,
      sub: '语文',
      pic: 'https://p1.music.126.net/XVg-o_520Fds9Ut60-O8SA==/109951168608721637.jpg?param=30y30',
      author: '小崔',
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
  const $table = tableRef.value
  if ($table) {
    $table.clearCurrentRow()
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
  // console.log('表格行点击：', row)
}

const closeClick = () => {
  clearSelectEvent()
  state.showDialog = false
}

// watch(
//   () => [...props.dataArr],
//   (val) => {
//     // console.log('子组件监听：', val)
//     if (val.length) {
//       for (let i = 3; i--; ) {
//         state.renderArr[i].num = props.dataArr[i]
//       }
//     }
//   },
//   {
//     immediate: true,
//     deep: true,
//   }
// )
</script>

<template>
  <div
    class="box"
    v-loading.lock="state.loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="top_box" v-show="!state.loading">
      <div class="line_t_box">
        <div
          class="item"
          v-for="({ name, txt }, idx) in state.LuBoList"
          :key="idx"
        >
          <div class="left_name">{{ name }}:</div>
          <div class="right_txt">{{ txt }}</div>
        </div>
      </div>
      <div class="line_b_box">
        <div
          :class="['item', `bg${idx + 1}`]"
          v-for="({ name, num }, idx) in state.numberArr"
          :key="idx"
        >
          <div class="item_top">
            <CounttoTemplate
              :key="num"
              :endVal="Number(num)"
              :decimals="0"
              :duration="1e3"
            />
          </div>
          <div class="item_bottom">{{ name }}</div>
        </div>
      </div>
    </div>
    <div class="bottom_list" v-show="!state.loading">
      <div class="title">直播课程</div>
      <div class="vxe_list">
        <div class="table_header">
          <span>名称</span>
          <span>学科</span>
          <span>图片</span>
          <span>作者姓名</span>
        </div>
        <vxe-table
          ref="tableRef"
          show-overflow
          :show-header="false"
          height="76"
          min-height="70"
          align="center"
          :border="false"
          :row-config="{ isCurrent: true, isHover: true, height: 38 }"
          :data="tableData"
          :scroll-y="{ enabled: true }"
          @cell-click="cellClick"
        >
          <vxe-column field="name" width="75" title="名称">
            <template #default="{ row }">
              <span class="slot_span">
                {{ row.name }}
              </span>
            </template>
          </vxe-column>
          <vxe-column field="sub" width="50" title="学科">
            <template #default="{ row }">
              <span class="slot_span">
                {{ row.sub }}
              </span>
            </template>
          </vxe-column>
          <vxe-column field="pic" title="图片">
            <template #default="{ row }">
              <ImgMask
                v-bind="{
                  imgSrc: row.pic,
                  styleObj: {
                    width: '44px',
                    height: '21px',
                    'object-fit': 'cover',
                  },
                }"
              />
            </template>
          </vxe-column>
          <vxe-column field="author" width="70" title="作者姓名">
            <template #default="{ row }">
              <span class="slot_span">
                {{ row.author }}
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
            :class="['item_cell', !itemObj.name && 'removeOpt']"
          >
            <div class="ico"></div>
            <div class="name" :data-txt="['txt'] in itemObj ? ':' : ''">
              {{ itemObj.name }}
            </div>
            <div class="txt">{{ itemObj.txt }}</div>
          </div>
        </div>
        <div class="pic_bottom">
          <ImgMask v-bind="argObj" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;

  .top_box {
    width: 100%;
    height: 160px;
    // border: 1px solid red;
    padding: 10px;
    display: flex;
    flex-direction: column;

    .line_t_box {
      width: 100%;
      height: 90px;
      // border: 1px solid yellow;
      overflow: hidden scroll;

      .item {
        // border: 1px solid yellow;
        margin: 3px auto;
        width: 259px;
        height: 35px;
        background: url('@img/jxyy/shebeimingchen_bg.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;

        .left_name {
          font-size: 13px;
          font-family: 'PingFang SC';
          letter-spacing: 1px;
          font-weight: 500;
          color: #d6e0f3;
          margin: 0 6px 0 40px;
        }

        .right_txt {
          font-size: 14px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #ffffff;
        }
      }
    }

    .line_b_box {
      width: 100%;
      height: 78px;
      transform: translateY(5px);
      // border: 1px solid green;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;

      .item {
        width: 57px;
        height: 50px;
        border: 1px solid transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .item_top {
          font-size: 20px;
          font-family: 'QTPS';
          font-weight: normal;
          color: #ffffff;
        }

        .item_bottom {
          transform: translateY(17px);
          width: 60px;
          // border: 1px solid red;
          font-size: 14px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #d6e0f3;
        }
      }

      .BG(@i) when(@i <=3) {
        .bg@{i} {
          background: url('@img/jxyy/icon_jx@{i}.png') no-repeat center;
          background-size: 100% 100%;
        }

        .BG((@i + 1));
      }

      .BG(1);
    }
  }

  .bottom_list {
    width: 100%;
    height: 150px;
    // border: 1px solid yellow;
    padding: 4px 10px;
    position: relative;

    .title {
      // border: 1px solid red;
      box-sizing: border-box;
      width: 176px;
      height: 17px;
      line-height: 15px;
      padding-left: 31px;
      margin: 10px 0 3px 0;
      background: url('@img/jxyy/xiaobiaoti.png') no-repeat center;
      background-size: 100% 100%;
      font-size: 15px;
      font-family: 'PFB';
      color: #d2e9ff;
      letter-spacing: 2px;
    }

    .vxe_list {
      // border: 1px solid red;
      box-sizing: border-box;
      width: 100%;
      height: 120px;

      .table_header {
        width: 100%;
        height: 28px;
        margin-top: 10px;
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
          transform: translateX(6px);
        }

        & span:nth-child(2) {
          transform: translateX(8px);
        }

        & span:nth-child(3) {
          transform: translateX(6px);
        }

        & span:nth-child(4) {
          transform: translateX(3px);
        }
      }

      .slot_span {
        font-size: 13px;
        cursor: default !important;
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
    }

    .dialog {
      position: absolute;
      left: 105%;
      top: 0;
      width: 452px;
      height: 305px;
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
        padding: 15px 0 0 20px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        // justify-content: flex-start;

        .removeOpt {
          opacity: 0;
        }

        .item_cell {
          width: 46%;
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
              margin-right: 5px;
            }
          }

          .txt {
            font-size: 13px;
            font-family: 'PingFang SC';
            font-weight: 500;
            color: #fff;
          }
        }
      }

      .pic_bottom {
        // border: 1px solid red;
        width: 100%;
        height: 122px;
        padding: 0 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }

  // v-loading字体svg颜色
  :deep(.el-loading-spinner .path) {
    stroke: #fff;
    filter: drop-shadow(0 0 5px skyblue);
  }
}
</style>
