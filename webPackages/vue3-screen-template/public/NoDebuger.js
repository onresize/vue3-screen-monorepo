window.onload = () => {
  let r = new Date().getTime() - performance.timing.navigationStart
  console.log('白屏时间', r)

  // 反爬虫 | 反调试
  // setInterval(function () {
  //   check()
  // }, 1000);
  let check = function () {
    function doCheck(a) {
      if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
        ;(function () {})['constructor']('debugger')()
      } else {
        ;(function () {})['constructor']('debugger')()
      }
      doCheck(++a)
    }
    try {
      doCheck(0)
    } catch (err) {}
  }
  // check();

  let noF12 = function (allow = false) {
    if (!allow) return
    window.oncontextmenu = function (e) {
      e.stopPropagation() // 阻止事件冒泡、向上
      e.preventDefault() // 阻止默认行为、事件代理、向下
      return false
    }
    //禁止任何键盘敲击事件（防止F12和shift+ctrl+i调起开发者工具）
    window.onkeydown =
      window.onkeyup =
      window.onkeypress =
        function () {
          window.event.returnValue = false
          return false
        }
    //如果用户在工具栏调起开发者工具，那么判断浏览器的可视高度和可视宽度是否有改变，如有改变则关闭本页面
    var h = window.innerHeight,
      w = window.innerWidth
    window.onresize = function () {
      if (h != window.innerHeight || w != window.innerWidth) {
        window.close()
        window.location = 'about:blank'
      }
    }
  }
  // noF12(true)
}
