<script setup>
import { useSettingStore } from '@/stores'

const store = useSettingStore()

const state = reactive({
  val: '精装',
})

const options = [
  {
    value: '精装',
    label: '精装',
  },
  {
    value: '精装0',
    label: '精装1',
  },
  {
    value: '精装2',
    label: '精装3',
  },
  {
    value: '精装4',
    label: '精装5',
  },
  {
    value: '精装6',
    label: '精装7',
  },
  {
    value: '精装8',
    label: '精装9',
  },
]
</script>

<template>
  <div class="box">
    <div class="left_logo"></div>
    <div class="right_select">
      <div class="select_box">
        <el-select
          :popper-append-to-body="false"
          popper-class="select_VR"
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
    </div>
  </div>
</template>

<style>
/* 下拉弹出层 */
.select_VR {
  margin: 0 0 -3px -1px;
  background-color: rgba(39, 65, 102, 0.85) !important;
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
.box {
  width: 100%;
  height: 100%;
  position: relative;

  .left_logo {
    // border: 1px solid red;
    width: 147px;
    height: 119px;
    background: url('@img/jxyy/vrsys.png') no-repeat center;
    background-size: 100% 100%;
  }

  .right_select {
    position: absolute;
    right: 0;
    top: 17px;
    // border: 1px solid red;
    width: 200px;
    height: 76px;
    background: url('@img/jxyy/vrsxs_kuangxuan_bg.png') no-repeat center;
    background-size: 100% 100%;

    .select_box {
      width: 140px !important;
      height: 20px !important;
      position: absolute;
      left: 51%;
      transform: translate(-50%, 20px);
      border: none !important;
    }
  }
}

:deep(.el-input__wrapper) {
  background-color: rgba(39, 56, 77, 0) !important;
  border-color: transparent !important;
  box-shadow: none !important;
  padding: 1px 11px 1px 50px;

  &:hover {
    box-shadow: none !important;
  }
}

:deep(.el-input__inner) {
  border-color: transparent !important;
  box-shadow: none !important;
  height: 26px;
  font-size: 14px;
  font-family: 'PingFang SC';
  font-weight: 500;
  color: #ffffff;
  filter: drop-shadow(0 0px 5px #fff);
}

// 鼠标悬浮
:deep(.el-select:hover:not(.el-select--disabled) .el-input__wrapper) {
  box-shadow: none !important;
}

// 鼠标点击边框聚焦
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}

// 鼠标选中内容后的边框样式
:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}

// 选中数据样式
.el-select-dropdown__item.selected {
  color: #fff !important;
  background: url('@img/jxyy/zbkc_kuang_d.png') no-repeat center;
  background-size: 100% 100%;
}

// 每项数据样式
.el-select-dropdown__item {
  font-size: 13px;
  font-family: 'PingFang SC';
  font-weight: 500;
  color: #a5c5de !important;
  background-color: transparent !important;
  text-align: center !important;

  &:hover {
    background: url('@img/jxyy/zbkc_kuang.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
