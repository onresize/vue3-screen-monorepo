/*
	需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

	思路：
		1、设置需要拖拽的元素为absolute，其父元素为relative。
		2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
		3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
		4、鼠标松开(onmouseup)时完成一次拖拽

	使用：在 Dom 上加上 v-draggable 即可
	<div class="dialog-model" v-draggable></div>
*/

// vue-drag-resize拖拽库： https://github.com/kirillmurashov/vue-drag-resize
import { getCurrentInstance } from 'vue'
// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
const getStyle = (function () {
  if (window.document.currentStyle) {
    return (dom, attr) => dom.currentStyle[attr]
  } else {
    return (dom, attr) => getComputedStyle(dom, false)[attr]
  }
})()

const draggable = {
  mounted: function (el) {
    console.log(el.children)
    // el.style.cursor = "move";
    el.children[0].style.cursor = 'move'
    el.style.position = 'absolute'
    el.children[0].onmousedown = function (ev) {
      // console.log("拖拽指令：", ev);
      // 鼠标按下的位置
      const mouseXStart = ev.clientX
      const mouseYStart = ev.clientY
      // console.log("鼠标xy坐标", mouseXStart, mouseYStart);
      // 当前滑块位置
      const rectLeft = el.offsetLeft
      const rectTop = el.offsetTop
      document.onmousemove = (e) => {
        let maxX = el.parentNode.offsetWidth - el.offsetWidth
        let maxY = el.parentNode.offsetHeight - el.offsetHeight
        // 鼠标移动的位置
        let mouseXEnd = e.clientX
        let mouseYEnd = e.clientY
        let moveX = mouseXEnd - mouseXStart + rectLeft
        let moveY = mouseYEnd - mouseYStart + rectTop
        console.log(rectLeft, rectTop)
        // console.log("移动距左上：", moveX, moveY);
        // console.log("移动最大xy距离：", maxX, maxY);

        // 限制在父级盒子内部
        if (moveX < 0) {
          moveX = 0
        } else if (moveX > maxX) {
          moveX = maxX
        }
        if (moveY < 0) {
          moveY = 0
        } else if (moveY > maxY) {
          moveY = maxY
        }
        el.style['top'] = moveY + 'px'
        el.style['left'] = moveX + 'px'
      }
      document.onmouseup = () => {
        // console.log("鼠标抬起");
        // 取消事件
        document.onmousemove = null
      }
    }
  },
}
export default draggable
