<script setup>
import { useMessageStore, useSettingStore } from '@/stores'
import { $toolFunc, getTimeState, onceFunc } from '@/utils'

const messageStore = useMessageStore()
const settingStore = useSettingStore()
const { onlyRunOnce } = storeToRefs(messageStore)
const { switchBtnObj } = storeToRefs(settingStore)

const Router = useRouter()
const { proxy } = getCurrentInstance()
const { sleepFunc, usedLocalStorageHow } = $toolFunc

onceFunc(() => {
  messageStore.changeOnlyRunOnce_Sync(true)
  setTimeout(() => {
    ElNotification({
      title: getTimeState(),
      message: '欢迎登录',
      type: 'success',
      duration: 3e3,
      customClass: 'notification',
    })
  }, 1.5e3)
})(onlyRunOnce.value)

usedLocalStorageHow()

// 以下均可没值则赋空(String)、子组件接收多种指定类型
const state = reactive({
  leftOneDataArr: [4412, 3115, 88],
  leftTwoDataArr: [801, 1088],
  leftThreeDataArr: [53, 100, 60, 88, 32],
  leftFourDataObj: {
    ZkJs: 120, // 主科教室
    St: 100, // 食堂
    DmtJs: 100, // 多媒体教室
    Tsg: 100, // 图书馆
    Cc: 100, // 操场
    ZhKj: 100, // 智慧空间
    HdCg: 100, // 活动场馆
    XkJs: 100, // 学科教室
  },
  leftFiveDataArr: [3845, 2415],
  rightOneDataArr: [14523, 5471, 4715],
  rightThreeDataArr: [19333, 22822],
})

void (() => {
  messageStore.changeBtn_Sync(1)
})()
</script>

<template>
  <pageContainer>
    <!-- XXX左边 -->
    <template v-slot:containerLeft>
      <div class="left_innerBox">
        <!-- 教学条件 -->
        <div class="first_box">
          <div class="pic"></div>
          <div class="text">
            <div class="text_t">教学条件</div>
            <div class="text_b">
              {{ 'teaching conditions'.toLocaleUpperCase() }}
            </div>
          </div>
        </div>
        <div class="next_box">
          <!-- 教师管理 -->
          <div class="box1">
            <div class="item_title">
              <div class="title">教师管理</div>
              <div class="end_txt">单位:人</div>
            </div>
            <div class="content_box">
              <Page1LeftOne :dataArr="state.leftOneDataArr" />
            </div>
          </div>
          <!-- 教师管理 -->
          <div class="box2">
            <div class="item_title">
              <div class="title">教师管理</div>
              <div class="end_txt">单位:人</div>
            </div>
            <div class="content_box">
              <Page1LeftTwo :dataArr="state.leftTwoDataArr" />
            </div>
          </div>
          <!-- 教师年龄分布 -->
          <div class="box3">
            <div class="item_title">
              <div class="title">教师年龄分布</div>
              <div class="end_txt">单位:人</div>
            </div>
            <div class="content_box">
              <Page1LeftThree :dataArr="state.leftThreeDataArr" />
            </div>
          </div>
          <!-- 办学规模 -->
          <div class="box4">
            <div class="item_title">
              <div class="title">办学规模</div>
              <div class="end_txt">单位:个</div>
            </div>
            <div class="content_box">
              <Page1LeftFour :dataObj="state.leftFourDataObj" />
            </div>
          </div>
          <!-- 登记车辆统计 -->
          <div class="box5">
            <div class="item_title">
              <div class="title">登记车辆统计</div>
              <div class="end_txt">单位:辆</div>
            </div>
            <div class="content_box">
              <Page1LeftFive :dataArr="state.leftFiveDataArr" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- XXX右边 -->
    <template v-slot:containerRight>
      <div class="right_innerBox">
        <!-- 学生管理 -->
        <div class="first_box">
          <div class="pic"></div>
          <div class="text">
            <div class="text_t">学生管理</div>
            <div class="text_b">
              {{ 'teaching conditions'.toLocaleUpperCase() }}
            </div>
          </div>
          <SetYear />
        </div>
        <div class="next_box">
          <div class="box1">
            <Page1RightOne :dataArr="state.rightOneDataArr" />
          </div>
          <!-- 班级情况 -->
          <div class="box2">
            <div class="item_title">
              <div class="title">班级情况</div>
              <div class="end_txt">
                <span>单位:人</span>
                <SwitchBtn btnKey="grade_BJQK" />
              </div>
            </div>
            <div class="content_box">
              <Page1RightTwo :dataObj="switchBtnObj['grade_BJQK']" />
            </div>
          </div>
          <!-- 学生男女比例 -->
          <div class="box3">
            <div class="item_title">
              <div class="title">学生男女比例</div>
              <div class="end_txt">单位:人</div>
            </div>
            <div class="content_box">
              <Page1RightThree :dataArr="state.rightThreeDataArr" />
            </div>
          </div>
          <!-- 年级班级均班额 -->
          <div class="box4">
            <div class="item_title">
              <div class="title">年级班级均班额</div>
              <div class="end_txt">
                <span>单位:个</span>
                <SwitchBtn btnKey="grade_NJBJ" />
              </div>
            </div>
            <div class="content_box">
              <Page1RightFour :dataObj="switchBtnObj['grade_NJBJ']" />
            </div>
          </div>
          <!-- 年级学生总数 -->
          <div class="box5">
            <div class="item_title">
              <div class="title">年级学生总数</div>
              <div class="end_txt">
                <span>单位:人</span>
                <SwitchBtn btnKey="grade_NJXS" />
              </div>
            </div>
            <div class="content_box">
              <Page1RightFive :dataObj="switchBtnObj['grade_NJXS']" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </pageContainer>
</template>

<style lang="less">
.notification {
  width: 280px;
}
</style>
<style scoped lang="less">
@import url('@/styles/page1.less');
</style>
