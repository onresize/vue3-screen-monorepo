<script setup>
import { isEmptyObj } from '@LT/utils'
import { LoadingOutTime } from '@/constants'

const props = defineProps({
  dataObj: {
    type: [Object, String],
    default: {
      ZkJs: 0, // 主科教室
      St: 0, // 食堂
      DmtJs: 0, // 多媒体教室
      Tsg: 0, // 图书馆
      Cc: 0, // 操场
      ZhKj: 0, // 智慧空间
      HdCg: 0, // 活动场馆
      XkJs: 0, // 学科教室
    },
  },
})

const state = reactive({
  loading: true,
})

const dataComputed = computed(() => props.dataObj)

watch(
  () => ({ ...dataComputed.value }),
  (val) => {
    // console.log('子组件监听：', val)
    if (!isEmptyObj(val)) {
      state.loading = false
    } else {
      setTimeout(() => {
        state.loading = false
      }, LoadingOutTime)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div
    class="box"
    v-loading.lock="state.loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="ellipseBox" v-show="!state.loading">
      <div class="item1 info">
        <div class="txt">主科教室</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.ZkJs || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item2 info">
        <div class="txt">食堂</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.St || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item3 info">
        <div class="txt">多媒体教室</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.DmtJs || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item4 info">
        <div class="txt">图书馆</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.Tsg || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item5 info">
        <div class="txt">操场</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.Cc || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item6 info">
        <div class="txt">智慧空间</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.ZhKj || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item7 info">
        <div class="txt">活动场馆</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.HdCg || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
      <div class="item8 info">
        <div class="txt">学科教室</div>
        <div class="num">
          <CounttoTemplate
            :endVal="Number(dataComputed.XkJs || 0)"
            :decimals="0"
            :duration="1e3"
          />
        </div>
      </div>
    </div>
    <div class="center_bg" v-show="!state.loading"></div>
  </div>
</template>

<style scoped lang="less">
@import url('@/styles/deepCommmon.less');

.box {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .ellipseBox {
    margin: auto;
    width: 250px;
    height: 150px;
    // border: 2px solid red;
    border-radius: 50%;
    display: grid;
    place-content: center;

    .info {
      // border: 2px solid pink;
      width: 80px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;

      .txt {
        font-size: 13px;
        color: #a5c5de;
      }

      .num {
        font-size: 13px;
        color: #ffff;
        width: 100%;
        margin-top: -4px;
      }
    }

    .item1 {
      transform: translate(-110px, 120px);
    }

    .item2 {
      transform: translate(-45px, 40px);
    }

    .item3 {
      transform: translate(45px, 0px);
    }

    .item4 {
      transform: translate(105px, 0px);
    }

    .item5 {
      transform: translate(105px, 10px);
    }

    .item6 {
      transform: translate(45px, 15px);
    }

    .item7 {
      transform: translate(-45px, -25px);
    }

    .item8 {
      transform: translate(-110px, -110px);
    }
  }

  .center_bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 151px;
    height: 98px;
    background: url('@img/zhts/jianzhu.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
