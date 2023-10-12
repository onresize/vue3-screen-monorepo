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
