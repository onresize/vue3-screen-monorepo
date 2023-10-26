<script setup>
import { useSettingStore } from '@/stores'
import { LoadingOutTime } from '@/constants'

const tableData = ref([])
const state = reactive({
  loading: false,
  domList: [
    { name: '巡更点位数', num: '841' },
    { name: '未巡更点数', num: '41' },
    { name: '超时巡更点数', num: '451' },
    { name: '巡更完成率', numPercent: '35%' },
  ],
})

setTimeout(() => {
  state.loading = true
  // 模拟数据
  const mockList = []
  for (let index = 0; index < 100; index++) {
    mockList.push({
      id: index,
      name: 'XXXX' + index,
      timer: '2023-10-22 13:23:45',
      finishPercent: '未处理',
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
</script>

<template>
  <div class="box">
    <!-- 顶部 -->
    <div class="top">
      <div :class="['item']" v-for="(item, idx) in state.domList" :key="idx">
        <div :class="['left_bg', `row_${idx + 1}`]"></div>
        <div class="right_box">
          <div class="name">{{ item.name }}</div>
          <div v-if="item?.num" :class="['txt', `number${idx + 1}`]">
            <CounttoTemplate
              :key="item.num"
              :endVal="Number(item.num || 0)"
              :decimals="0"
              :duration="1e3"
            />
          </div>
          <div v-else :class="['txt', `number${idx + 1}`]">
            {{ item.numPercent }}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="title">巡更记录</div>
      <div class="table_box">
        <!-- 表头 -->
        <div class="table_header">
          <span>名称</span>
          <span>时间</span>
          <span>完成率</span>
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
          >
            <vxe-column field="name" width="80" title="名称">
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
            <vxe-column field="finishPercent" title="完成率">
              <template #default="{ row }">
                <span class="slot_span">
                  {{ row.finishPercent }}
                </span>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </div>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    // border: 1px solid red;

    .item {
      margin: 2px;
      width: 140px;
      height: 50px;
      // border: 1px solid red;
      display: flex;

      .left_bg {
        width: 47px;
        height: 43px;
        margin-right: 3px;
      }

      .BG(@i) when(@i <=4) {
        .row_@{i} {
          background: url('@img/zhaf/dzxg@{i}.png') no-repeat center;
          background-size: 100% 100%;
        }

        .BG((@i + 1));
      }

      .BG(1);

      .right_box {
        .name {
          font-size: 13px;
          font-family: 'PingFang SC';
          font-weight: 500;
          color: #ffffff;
        }

        .txt {
          font-size: 19px;
          font-family: 'QTPS';
          font-weight: normal;
          transform: translateY(-5px);
        }

        .number1 {
          color: #9eb5f4;
        }

        .number2 {
          color: #fea763;
        }

        .number3 {
          color: #cca3ff;
        }

        .number4 {
          color: #96ca94;
        }
      }
    }
  }

  .bottom {
    width: 100%;
    height: 168px;
    // border: 1px solid green;

    .title {
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

    .table_box {
      width: 100%;
      height: 150px;
      // border: 1px solid yellow;

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
          transform: translateX(-8px);
        }

        & span:nth-child(2) {
          transform: translateX(5px);
        }

        & span:nth-child(3) {
          transform: translateX(12px);
        }
      }

      .table_list {
        width: 100%;
        // height: 110px;
        padding: 4px 0;
        // border: 1px solid yellow;
        // background: url('@img/zhaf/biaoge_line.png') no-repeat center;
        background-size: 100% 100%;

        .slot_span {
          font-size: 12px;
          cursor: default !important;
        }
      }

      // 选中行背景
      :deep(.vxe-table--render-default .vxe-body--row.row--current) {
        // background: url('@img/jxyy/zbkc_kuang_d.png') no-repeat center;
        background-color: transparent !important;
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
    }
  }
}
</style>
