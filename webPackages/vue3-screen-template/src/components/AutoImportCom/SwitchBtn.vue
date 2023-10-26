<script setup>
import { useSettingStore } from '@/stores'

const store = useSettingStore()
const props = defineProps({
  textArr: {
    type: Array,
    default: ['小学', '初中'],
  },
  btnKey: String,
})

const SwitchClick = ({ idx, val, key }) => {
  if (idx) {
    // XXX第二个按钮
    if (!store.switchBtn[key]) return

    // 年级切换
    if (key.includes('grade')) {
      store.changeSwitchBtnData_Sync(key, {
        dataName: ['一年级', '二年级', '三年级'],
        dataSource: [850, 830, 830, 800, 810, 900],
      })
    }
    // 日期切换
    if (key.includes('date')) {
      // TODO:
    }
  } else {
    // XXX第一个按钮
    if (store.switchBtn[key]) return

    // 年级切换
    if (key.includes('grade')) {
      store.changeSwitchBtnData_Sync(key, {
        dataName: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        dataSource: [550, 630, 430, 900, 810, 790],
      })
    }
    // 日期切换
    if (key.includes('date')) {
      // TODO:
    }
  }
  console.log('点击了按钮值为:', val, key, idx)
  store.changeSwitchBtn_Sync(key)
}
</script>

<template>
  <div class="switchBox">
    <div
      :class="['left', store.switchBtn[props.btnKey] ? 'btnActive' : 'btnInfo']"
      id="leftBtn"
      :data-value="props.textArr[0]"
      @click="
        $D(SwitchClick, 200, {
          val: props.textArr[0],
          key: props.btnKey,
          idx: 0,
        })
      "
    ></div>
    <div
      :class="[
        'right',
        !store.switchBtn[props.btnKey] ? 'btnActive' : 'btnInfo',
      ]"
      id="rightBtn"
      :data-value="props.textArr[1]"
      @click="
        $D(SwitchClick, 200, {
          val: props.textArr[1],
          key: props.btnKey,
          idx: 1,
        })
      "
    ></div>
  </div>
</template>

<style scoped lang="less">
.switchBox {
  width: 70px;
  height: 17px;
  text-align: center;
  line-height: 17px;
  box-sizing: border-box;
  // border: 1px solid red;
  margin-bottom: 3.5px;
  display: flex;

  .btnActive {
    background-color: #7b95b6 !important;
    color: #1d222b !important;
    cursor: default;
  }

  .btnInfo {
    cursor: pointer;
    background-color: #2a568d !important;
    color: #97b5d9 !important;

    &:hover {
      box-shadow: 0 0 10px #fff;
    }
  }

  .left {
    box-sizing: border-box;
    transition: all 1s;
    border-radius: 7px 0 0 1px;
    width: 50%;
    height: 100%;
    font-size: 12px;

    &::after {
      content: attr(data-value);
    }
  }

  .right {
    box-sizing: border-box;
    transition: all 1s;
    border-radius: 0 1px 7px 0;
    width: 50%;
    height: 100%;
    font-size: 12px;

    &::after {
      content: attr(data-value);
    }
  }
}
</style>
