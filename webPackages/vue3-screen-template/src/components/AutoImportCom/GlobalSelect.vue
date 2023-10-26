<script setup>
import { useSettingStore } from '@/stores'

const selectRef = ref(null)

const store = useSettingStore()
const { globalSelectVal } = storeToRefs(store)
const options = [
  {
    value: '全部',
    label: '全部',
  },
  {
    value: '全部0',
    label: '全部1',
  },
  {
    value: '全部2',
    label: '全部3',
  },
  {
    value: '全部4',
    label: '全部5',
  },
  {
    value: '全部6',
    label: '全部7',
  },
  {
    value: '全部8',
    label: '全部9',
  },
]
</script>

<template>
  <div class="select_box">
    <el-select
      :popper-append-to-body="false"
      popper-class="select_class"
      size="default"
      v-model="globalSelectVal"
      placeholder=" "
      ref="selectRef"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<style>
/* 下拉弹出层 */
.select_class {
  margin-top: -3px;
  background-color: rgba(39, 56, 77, 0.85) !important;
  filter: drop-shadow(0 0px 5px #8f9196);
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

/* 调整下拉三角形样式 */
/* .select_class.el-popper[data-popper-placement^=bottom] .el-popper__arrow::before {
  background: #254277 !important;
  border: 1px solid #254277 !important;
}

.select_class.el-popper[data-popper-placement^=top] .el-popper__arrow::before {
  background: #254277 !important;
  border: 1px solid #254277 !important;
} */
</style>
<style scoped lang="less">
.select_box {
  width: 188px;
  height: 100%;
  border: none !important;
  filter: drop-shadow(0 0px 5px #8f9196);
}

:deep(.el-input__wrapper) {
  background-color: rgba(39, 56, 77, 0.85) !important;
  border-color: transparent !important;
  box-shadow: none !important;
  padding: 1px 11px 1px 30px;

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
  color: #a5c5de;
  background-color: transparent !important;
  padding-left: 15%;

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 80%;
    left: 10%;
    top: 33px;
    opacity: 0.8;
    background: url('@img/zhts/line.png') no-repeat center;
    background-size: 100% 100%;
  }

  &:hover {
    background: url('@img/jxyy/zbkc_kuang.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
