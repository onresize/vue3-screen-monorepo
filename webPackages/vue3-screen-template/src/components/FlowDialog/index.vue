<script setup>
import { ClickOutside as vClickOutside } from 'element-plus'

const emit = defineEmits(['click'])

let isShow = ref(true)

const beforeCloseFunc = () => {
  console.log('关闭之前触发-----')
  emit('click')
}
</script>

<template>
  <el-dialog
    modal-class="modalClass"
    class="myDialog"
    v-model="isShow"
    :before-close="beforeCloseFunc"
    :show-close="false"
    destroy-on-close
    align-center
    draggable
    :close-on-click-modal="true"
  >
    <template #header="{ close, titleClass }">
      <div :class="[titleClass, 'closeEl']" @click.stop.prevent="close"></div>
    </template>
    <div class="DialogBody"></div>
  </el-dialog>
</template>

<style lang="less">
.myDialog {
  width: 969px !important;
  height: 604px !important;
  background: url('@img/zhaf/shishishiping.png') no-repeat center;
  background-size: 100% 100%;
  position: relative;

  .closeEl {
    width: 26px;
    height: 26px;
    position: absolute;
    right: 32px;
    top: 30px;
    cursor: pointer !important;
  }

  .DialogBody {
    width: 907px;
    height: 509px;
    transform: translateX(10px);
    // border: 1px solid red;
  }
}

.modalClass {
  background: rgba(0, 0, 0, 0.2) !important;
}
</style>
