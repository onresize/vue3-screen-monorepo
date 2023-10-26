<script setup>
import { useSettingStore } from '@/stores'

const store = useSettingStore()

const state = reactive({
  val: '实验楼',
})

const options = [
  {
    value: '实验楼',
    label: '实验楼',
  },
  {
    value: '教研楼',
    label: '教研楼',
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
    <div class="select_box">
      <el-select
        :popper-append-to-body="false"
        popper-class="select_ZS"
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
</template>

<style>
/* 下拉弹出层 */
.select_ZS {
  margin: 0 0 -5px -1px;
  background-color: rgba(39, 56, 77, 1) !important;
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

  .select_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 27px;
    // border: 1px solid red;
  }
}

:deep(.el-input__wrapper) {
  background-color: rgba(39, 56, 77, 0.5) !important;
  border-color: transparent !important;
  box-shadow: none !important;
  padding: 1px 11px 1px 83px;
  box-shadow: 3px 3px 8px #8f9196 !important;

  &:hover {
    box-shadow: none !important;
  }
}

:deep(.el-input__inner) {
  border-color: transparent !important;
  box-shadow: none !important;
  height: 27px;
  font-size: 14px;
  font-family: 'PingFang SC';
  font-weight: 500;
  color: #ffffff;
  filter: drop-shadow(0 0px 5px #fff);
}

// 鼠标悬浮
:deep(.el-select:hover:not(.el-select--disabled) .el-input__wrapper) {
  box-shadow: 3px 3px 8px #8f9196 !important;
}

// 鼠标点击边框聚焦
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 3px 3px 8px #8f9196 !important;
}

// 鼠标选中内容后的边框样式
:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 3px 3px 8px #8f9196 !important;
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
