<script setup>
import { $toolFunc } from '@/utils'
import { useSettingStore } from '@/stores'

const Router = useRouter()
const { sleepFunc } = $toolFunc

const store = useSettingStore()

// 以下均可没值则赋空(String)、子组件接收多种指定类型
const state = reactive({
  leftTwoDataArr: [15, 35, 30, 20, 75],
  leftThreeDataObj: {
    bookObj: {
      total: 15000, // 总数
      outTotal: 5100, // 总借出
      outToday: 300, // 今日借出
      outMonth: 2000, // 本月借出
      inTotal: 5100, // 总还入
      inToday: 300, // 今日还入
      inMonth: 2000, // 本月还入
    },
    boy: [200, 300, 400, 500, 600, 700],
    grily: [700, 600, 500, 400, 300, 200],
  },
})
</script>

<template>
  <pageContainer>
    <!-- XXX左边 -->
    <template v-slot:containerLeft>
      <div class="left_innerBox">
        <div class="next_box">
          <!-- 录播系统 -->
          <div class="box1">
            <div class="item_title">
              <div class="title">录播系统</div>
              <div class="end_txt">单位:人</div>
            </div>
            <div class="content_box">
              <Page2LeftOne />
            </div>
          </div>
          <!-- 阅卷系统 -->
          <div class="box2">
            <div class="item_title">
              <div class="title">阅卷系统</div>
              <div class="end_txt">单位:分</div>
            </div>
            <div class="content_box">
              <!-- [优秀、良好、合格、不合格、平均分] -->
              <Page2LeftTwo :dataArr="state.leftTwoDataArr" />
            </div>
          </div>
          <!-- 图书馆管理 -->
          <div class="box3">
            <div class="item_title">
              <div class="title">图书馆管理</div>
              <div class="end_txt">单位:本</div>
            </div>
            <div class="content_box">
              <Page2LeftThree :dataObj="state.leftThreeDataObj" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- XXX右边 -->
    <template v-slot:containerRight>
      <div class="right_innerBox">
        <div class="next_box">
          <!-- 学情分析大数据 -->
          <div class="box1">
            <div class="item_title">
              <div class="title">学情分析大数据</div>
            </div>
            <div class="content_box">
              <Page2RightOne />
            </div>
          </div>
          <!-- VR实训室 -->
          <div class="box2">
            <div class="item_title">
              <div class="title">VR实训室</div>
            </div>
            <div class="content_box">
              <Page2RightTwo />
            </div>
          </div>
          <!-- 教室展示 -->
          <div class="box3">
            <div class="item_title">
              <div class="title">教室展示</div>
            </div>
            <div class="content_box">
              <Page2RightThree />
            </div>
          </div>
        </div>
      </div>
    </template>
  </pageContainer>
</template>

<style scoped lang="less">
@import url('@/styles/page2.less');
</style>
