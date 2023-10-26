<script setup name="SvgIcon">
/**
 * 名称：SvgIcon
 * 依赖：src/plugins/svgBuilder.js 需要在 vite中配置
 * 使用方式：
 * 在 template 中使用 <svg-icon name="bug"/>
 */

const props = defineProps(['name', 'className', 'color'])
// console.log('当前props：', props)
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon icon-${props.name}`
  } else {
    return 'svg-icon'
  }
})
</script>

<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    v-on="$attrs"
    :style="{ color: props.color }"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
