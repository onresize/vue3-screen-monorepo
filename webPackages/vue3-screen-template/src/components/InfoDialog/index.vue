<script setup>
import { ref, watch } from 'vue'
import { useSettingStore } from '@/stores'
import { Debounce, $toolFunc } from '@/utils'
import { ClickOutside as vClickOutside } from 'element-plus'

const props = defineProps({
  pathInfo: {
    type: [Object],
    require: false,
  },
})

const emit = defineEmits(['click', 'showVideo'])

const store = useSettingStore()
const { sleepFunc, substrSting } = $toolFunc

const info = ref([
  { title: '设备名称', value: '' },
  { title: '在线情况', value: '' },
])

const beforeCloseFunc = () => {
  console.log('关闭info之前触发-----', props.pathInfo)
  emit('click')
}

const toShowHlsVideo = () => {
  console.log('去开启video弹窗---')
  emit('showVideo')
}

// 监听接收到的参数
watch(
  () => props.pathInfo,
  (val) => {
    if (val) {
      info.value[0].value = val.properties?.name
      info.value[1].value = val.properties?.status ? '在线' : '离线'
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div class="info_dialog_com">
    <!-- 关闭按钮 -->
    <div class="close" @click.stop="beforeCloseFunc">x</div>
  </div>
</template>

<style scoped lang="less">
.info_dialog_com {
  width: 247px;
  height: 137px;
  position: absolute;
  left: 330px;
  bottom: 120px;
  z-index: 100;

  .close {
    width: 22px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    transition: 0.6s;
    border: 1px solid red;

    &:hover {
      filter: drop-shadow(0 0 20px #fff);
    }
  }
}
</style>
