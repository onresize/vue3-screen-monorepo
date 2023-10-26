<script setup>
import { $toolFunc } from '@/utils'

const Router = useRouter()
const { sleepFunc } = $toolFunc
</script>

<template>
  <pageContainer>
    <!-- XXX左边 -->
    <template v-slot:containerLeft>
      <div class="left_innerBox">
        <div class="next_box">
          <!-- 设备管理 -->
          <div class="box1">
            <div class="item_title">
              <div class="title">设备管理</div>
              <div class="end_txt">单位:个</div>
            </div>
            <div class="content_box">
              <Page3LeftOne />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- XXX右边 -->
    <template v-slot:containerRight>
      <div class="right_innerBox">
        <div class="next_box">
          <!-- 告警事件 -->
          <div class="box1">
            <div class="item_title">
              <div class="title">告警事件</div>
              <div class="end_txt"></div>
            </div>
            <div class="content_box">
              <Page3RightOne />
            </div>
          </div>
          <!-- 电子巡更 -->
          <div class="box2">
            <div class="item_title">
              <div class="title">电子巡更</div>
              <div class="end_txt">
                <SwitchBtn :textArr="['本月', '今日']" btnKey="date_DZXG" />
              </div>
            </div>
            <div class="content_box">
              <Page3RightTwo />
            </div>
          </div>
          <!-- 电子围栏 -->
          <div class="box3">
            <div class="item_title">
              <div class="title">电子围栏</div>
              <div class="end_txt">
                <SwitchBtn :textArr="['本月', '今日']" btnKey="date_DZWL" />
              </div>
            </div>
            <div class="content_box">
              <Page3RightThree :dataArr="[30, 65, 45, 100, 120]" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </pageContainer>
</template>

<style scoped lang="less">
@import url('@/styles/page3.less');
</style>
