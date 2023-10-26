<script setup>
import { Search } from '@element-plus/icons-vue'
import { $toolFunc } from '@/utils'

const Router = useRouter()
const { sleepFunc } = $toolFunc

const state = reactive({
  iptVal: '',
})

const searchClick = () => {}
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
              <Page4LeftOne />
            </div>
          </div>
          <!-- 停车系统 -->
          <div class="box2">
            <div class="item_title">
              <div class="title">停车系统</div>
              <div class="end_txt">
                <el-input
                  v-model="state.iptVal"
                  placeholder="模糊搜索"
                  size="small"
                  class="ipt"
                  :prefix-icon="Search"
                  @keydown.enter="$D(searchClick, 200, '')"
                ></el-input>
              </div>
            </div>
            <div class="content_box">
              <Page4LeftTwo />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- XXX右边 -->
    <template v-slot:containerRight>
      <div class="right_innerBox">
        <div class="next_box">
          <!-- 监控设备 -->
          <div class="box1">
            <div class="item_title">
              <div class="title">监控设备</div>
              <div class="end_txt">单位:人</div>
            </div>
            <div class="content_box">
              <Page4RightOne />
            </div>
          </div>
        </div>
      </div>
    </template>
  </pageContainer>
</template>

<style scoped lang="less">
@import url('@/styles/page4.less');
</style>
