export const $toolFunc = {
  sleepFunc(delay = 200) {
    return new Promise((res) => setTimeout(res, delay));
  },
  awaitPromise(resData) {
    return new Promise((res) => {
      setTimeout(() => {
        res(resData);
      }, 0);
    });
  },
  // 同步化localStorage存取值
  asyncLocalStorage() {
    return {
      setItem: function (key, value) {
        return Promise.resolve().then(function () {
          window.localStorage.setItem(key, value);
        });
      },
      getItem: function (key) {
        return Promise.resolve().then(function () {
          return window.localStorage.getItem(key);
        });
      },
    };
  },
  // 姓名脱敏
  formatName(name) {
    var newStr;
    if (name.length === 2) {
      newStr = name.substr(0, 1) + "*";
    } else if (name.length > 2) {
      var char = "";
      for (var i = 0, len = name.length - 2; i < len; i++) {
        char += "*";
      }
      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
      newStr = name;
    }
    return newStr;
  },
  /**
   * 身份证脱敏、formatIdString(row.iCard, 4, 15, "***********")
   * 手机号脱敏、formatIdString(row.phone, 3, 7, "****")
   */
  formatIdString(idCard, start, end, val) {
    let res = idCard.replace(idCard?.substring(start, end), val);
    return res;
  },
  // 处理url获取
  getImageUrl(name, folder) {
    return new URL(`/src/assets/${folder}/${name}.png`, import.meta.url).href;
    // return new URL("@/assets/charts/bar_y.png", import.meta.url).href;
  },
  // 截取字符
  toSubstr(str, startNum = 0, endNum) {
    return str?.substring(startNum, endNum);
  },
  // 超出对应长度字段用...代替
  substrSting(str, num) {
    if (str) {
      let strVal = str.substring(0, num) + (str?.length > num ? "..." : "");
      return strVal;
    }
  },
  // 根据字符长度加上对应数量的0
  sureStrLen(str) {
    let r = null;
    if (str) {
      switch (String(str).length) {
        case 1:
          r = "0000" + str;
          break;
        case 2:
          r = "000" + str;
          break;
        case 3:
          r = "00" + str;
          break;
        case 4:
          r = "0" + str;
          break;
        case 5:
          r = str + "";
          break;
      }
    } else {
      r = "00000";
    }
    console.log("计算后的字符：", r);
    return r;
  },
  // 获取url参数
  getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return decodeURI(r[2]);
    }
    return null;
  },
  // 设置cookie
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
  },
  // 获取cookie
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      if (ca[i].indexOf(name) >= 0) {
        return ca[i].split("=")[1];
      }
    }
    return "";
  },
  //清空cookie
  clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    console.log(keys);
    if (keys) {
      for (var i = keys.length; i--; ) {
        document.cookie = keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
        // document.cookie = keys[i] + "=0;path=/;domain=" + document.domain + ";expires=" + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
        // document.cookie = keys[i] + "=0;path=/;domain=kevis.com;expires=" + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
      }
    }
    console.log("已清除cookie");
  },
  OpenWindow(url, w, h) {
    console.log("url:", url);
    var left = Math.round((window.screen.availWidth - w) / 2);
    var top = Math.round((window.screen.availHeight - 100 - h) / 2);
    var MyWin = window.open(
      url,
      "",
      "height=" + h + ", width=" + w + ",top=" + top + ",left=" + left + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
    );
  },
  // 检测全屏
  checkIsFullScreen() {
    var isFullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    return isFullScreen == undefined ? false : isFullScreen;
  },
  // 分时函数 (要分时渲染的数组, 回调, 每次分时渲染的片长度)
  timerChunk(sourceArr, callback, chunk = 1) {
    let ret,
      timer = null,
      count = 0;
    const renderData = () => {
      for (let i = 0; i < Math.min(chunk, sourceArr.length); i++) {
        // 取出数据
        ret = sourceArr.shift();
        callback(ret);

        if (i == Math.min(chunk, sourceArr.length) - 1) {
          console.log(`分批执行第${++count}次`);
          if (sourceArr.length === 0) return;
          renderData();
        }
      }
    };
    return () => renderData();
  },
};

export function getTimeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

// 函数只执行一次
export function onceFunc(func) {
  return function (arg) {
    console.log("arg形参-------", arg);
    if (!arg) {
      func.apply(this, arguments);
    }
  };
}

// 生成唯一 uuid
export function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

// 生成随机数
export function randomNum(min, max) {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

// 获取浏览器默认语言
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

// 防抖
let timeout = null;
export function Debounce(func, delay, event = {}, immediate = false) {
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
    if (callNow) typeof func === "function" && func(event);
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时delay毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === "function" && func(event);
    }, delay);
  }
}

/**
 * 节流原理：在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */

export function Throttle(func, wait = 500, event = {}, immediate = true) {
  let flag = null;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func(event);
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false;
      typeof func === "function" && func(event);
    }, wait);
  }
}

// 全屏
let element = document.documentElement;
export const ScreenObj = {
  // 进入全屏
  FullScreen() {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  },
  // 退出全屏
  NarrowScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },
};

// const loadFileAsync = async () => {
//   await loadScript('/static/ue/xxx.js', () => {
//     console.log('加载成功--->>')
//   })
// }
// 动态引入脚本
export function loadScript(url, callback) {
  return new Promise((resolve) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof callback != "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            resolve(() => {
              document.body.removeChild(script);
              console.log("remove------------");
            }) & callback();
          }
        };
      } else {
        script.onload = function () {
          resolve(() => {
            document.body.removeChild(script);
            console.log("remove------------");
          }) & callback();
        };
      }
    }
    script.src = url;
    document.body.appendChild(script);
  });
}

// 获取当前时间
export function getCurrentTime() {
  return new Promise((resolve, reject) => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    // 为了保证2位数字，补齐0
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    resolve(`${hours}:${minutes}:${seconds}`);
  });
}
