export default {
  methods: {
    sleepFunc(delay = 200) {
      return new Promise((res) => setTimeout(res, delay))
    },
    awaitPromise(resData) {
      return new Promise((res) => {
        setTimeout(() => {
          res(resData)
        }, 0)
      })
    },
    // 同步化localStorage存取值
    asyncLocalStorage() {
      return {
        setItem: function (key, value) {
          return Promise.resolve().then(function () {
            window.localStorage.setItem(key, value)
          })
        },
        getItem: function (key) {
          return Promise.resolve().then(function () {
            return window.localStorage.getItem(key)
          })
        },
      }
    },
    // 姓名脱敏
    formatName(name) {
      var newStr
      if (name.length === 2) {
        newStr = name.substr(0, 1) + '*'
      } else if (name.length > 2) {
        var char = ''
        for (var i = 0, len = name.length - 2; i < len; i++) {
          char += '*'
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1)
      } else {
        newStr = name
      }
      return newStr
    },
    /**
     * 身份证脱敏、formatIdString(row.iCard, 4, 15, "***********")
     * 手机号脱敏、formatIdString(row.phone, 3, 7, "****")
     */
    formatIdString(idCard, start, end, val) {
      let res = idCard.replace(idCard?.substring(start, end), val)
      return res
    },
    // 处理url获取
    getImageUrl(name, folder) {
      return new URL(`/src/assets/${folder}/${name}.png`, import.meta.url).href
      // return new URL("@/assets/charts/bar_y.png", import.meta.url).href;
    },
    // 截取字符
    toSubstr(str, startNum = 0, endNum) {
      return str?.substring(startNum, endNum)
    },
    // 超出对应长度字段用...代替
    substrSting(str, num) {
      if (str) {
        let strVal = str.substring(0, num) + (str?.length > num ? '...' : '')
        return strVal
      }
    },
    // 根据字符长度加上对应数量的0
    sureStrLen(str) {
      let r = null
      if (str) {
        switch (String(str).length) {
          case 1:
            r = '0000' + str
            break
          case 2:
            r = '000' + str
            break
          case 3:
            r = '00' + str
            break
          case 4:
            r = '0' + str
            break
          case 5:
            r = str + ''
            break
        }
      } else {
        r = '00000'
      }
      console.log('计算后的字符：', r)
      return r
    },
    // 获取url参数
    getQueryString(name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      const r = window.location.search.substr(1).match(reg)
      if (r !== null) {
        return decodeURI(r[2])
      }
      return null
    },
    // 设置cookie
    setCookie(cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      var expires = 'expires=' + d.toGMTString()
      document.cookie = cname + '=' + cvalue + ';' + expires
    },
    // 获取cookie
    getCookie(cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        if (ca[i].indexOf(name) >= 0) {
          return ca[i].split('=')[1]
        }
      }
      return ''
    },
    //清空cookie
    clearCookie() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
      console.log(keys)
      if (keys) {
        for (var i = keys.length; i--; ) {
          document.cookie =
            keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() //清除当前域名下的,例如：m.kevis.com
          // document.cookie = keys[i] + "=0;path=/;domain=" + document.domain + ";expires=" + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
          // document.cookie = keys[i] + "=0;path=/;domain=kevis.com;expires=" + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
        }
      }
      console.log('已清除cookie')
    },
    OpenWindow(url, w, h) {
      console.log('url:', url)
      var left = Math.round((window.screen.availWidth - w) / 2)
      var top = Math.round((window.screen.availHeight - 100 - h) / 2)
      var MyWin = window.open(
        url,
        '',
        'height=' +
          h +
          ', width=' +
          w +
          ',top=' +
          top +
          ',left=' +
          left +
          ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
      )
    },
    // 检测全屏
    checkIsFullScreen() {
      var isFullScreen =
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen
      return isFullScreen == undefined ? false : isFullScreen
    },
    // 分时函数 (要分时渲染的数组, 回调, 每次分时渲染的片长度)
    timerChunk(sourceArr, callback, chunk = 1) {
      let ret,
        timer = null,
        count = 0
      const renderData = () => {
        for (let i = 0; i < Math.min(chunk, sourceArr.length); i++) {
          // 取出数据
          ret = sourceArr.shift()
          callback(ret)

          if (i == Math.min(chunk, sourceArr.length) - 1) {
            console.log(`分批执行第${++count}次`)
            if (sourceArr.length === 0) return
            renderData()
          }
        }
      }
      return () => renderData()
    },
  },
}
