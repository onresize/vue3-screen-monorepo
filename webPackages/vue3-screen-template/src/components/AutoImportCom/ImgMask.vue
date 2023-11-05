<script setup>
import { ZoomIn } from '@element-plus/icons-vue'

const props = defineProps({
  // 图片样式
  styleObj: {
    type: Object,
    default: {
      width: '100px',
      height: '100px',
    },
  },
  // 图片scr
  imgSrc: {
    type: String,
    require: true,
  },
  // 要渲染的数量
  renderNum: {
    type: [Number, String],
    default: 1,
  },
  // 遮罩层显示文字
  txt: {
    type: String,
    default: '',
  },
  // 图标大小
  size: {
    type: Number,
    default: 20,
  },
})

const infoImg = computed(
  () => new URL('/src/assets/img/common/info.png', import.meta.url).href
)

const errorInfoLogo = computed(() => ({ target }) => {
  target.src = infoImg.value
})

const { proxy } = getCurrentInstance()

const showPreview = (pic) => {
  // console.log('预览图片', pic)
  proxy.$PIC([pic], {
    initialIndex: 0,
    infinite: true,
    hideOnClickModal: false,
  })
}
</script>

<template>
  <div class="mask" v-for="_ in props.renderNum" :key="_">
    <img
      draggable="false"
      :style="{ ...props.styleObj }"
      :src="props.imgSrc || infoImg"
      :onerror="errorInfoLogo"
      alt=""
    />
    <div class="upload-handle" @click.stop v-show="props.imgSrc">
      <!-- 有文字的样式 -->
      <div
        class="handle-icon"
        v-if="props.txt"
        @click="showPreview(props.imgSrc)"
      >
        <el-icon :size="props.size">
          <ZoomIn />
        </el-icon>
        <span>{{ props.txt }}</span>
      </div>
      <!-- 没文字的样式 -->
      <div class="no-handle-icon" v-else @click="showPreview(props.imgSrc)">
        <el-icon :size="props.size">
          <ZoomIn />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mask {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: 1px dashed #cdd0d6;

    .upload-handle {
      opacity: 1;
    }
  }

  .upload-handle {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: rgb(0 0 0 / 60%);
    opacity: 0;
    transition: 0.2s;

    .handle-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 6%;
      color: aliceblue;

      .el-icon {
        margin-bottom: 40%;
        font-size: 130%;
        line-height: 130%;
      }

      span {
        font-size: 85%;
        line-height: 85%;
      }
    }

    .no-handle-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 6%;
      color: aliceblue;

      .el-icon {
        font-size: 130%;
        line-height: 130%;
      }
    }
  }
}
</style>
