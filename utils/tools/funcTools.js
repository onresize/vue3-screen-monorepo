export const $toolFunc = {
  sleepFunc(delay = 200) {
    return new Promise((res) => setTimeout(res, delay));
  },
  sleepProFunc(func, delay = 200) {
    return new Promise((res) =>
      setTimeout(() => {
        func();
        res();
      }, delay)
    );
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
  // 截取字符
  toSubstr(str, startNum = 0, endNum) {
    return str?.substring(startNum, endNum);
  },
  // 超出对应长度字段用...代替
  substrSting(str, num) {
    if (str) {
      let strVal = str.substring(0, num) + (str?.length > num ? ".." : "");
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
  // 根据场景改造shift方法、每次提出定义长度的数组项
  shiftPro(arr, num = 10) {
    let PArr = [];
    for (let i = num; i--; ) {
      PArr.push(arr.shift());
    }
    let filterArr = PArr.filter(Boolean);
    console.log(filterArr);
    return filterArr;
  },
  // 分时函数 (要分时渲染的数组, 回调, 每次分时渲染的片长度)
  timerChunk(sourceArr, callback, chunk = 1, wait = 0) {
    let ret;
    const renderData = async () => {
      let forCount = Math.ceil(sourceArr.length / chunk);
      for (let i = 1; i <= forCount; i++) {
        // ret = sourceArr.shift(); // 提出1条
        // 取出数据、特别大的数据可以使用shiftPro进一步优化速度
        console.log(`分批执行第${i}次👇`);
        ret = $toolFunc.shiftPro(sourceArr, chunk); // 提出(chunk: 100)条
        await $toolFunc.sleepFunc(wait);
        callback(ret);
      }
    };
    return () => renderData();
  },
  // 使用了多少localStorage容量(最大 5 * 1024)kb
  usedLocalStorageHow() {
    if (!window.localStorage) {
      console.log("浏览器不支持localStorage");
      return;
    }
    let size = 0;
    for (let item in window.localStorage) {
      if (window.localStorage.hasOwnProperty(item)) {
        size += window.localStorage.getItem(item).length;
      }
    }
    console.log(
      `%c当前已使用localStorage容量:%c${(size / 1024).toFixed(2) + "KB"}`,
      "padding: 3px; color: white; background: #023047; border-radius: 5px 0 0 5px;",
      "padding: 3px; color: white; background: #219EBC;border-radius: 0 5px 5px 0;"
    );
  },
};

// 预加载图片
export function preloadImg(arg) {
  let images = new Array();
  for (let i = 0; i < arg.length; i++) {
    images[i] = new Image();
    images[i].src = arg[i];
  }
}

// 判断单张图片是否有效
export function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    };
    ImgObj.onerror = function (err) {
      reject(err);
    };
  });
}

// 获取网站公网ip、或域名
export function getWebUrlName(url) {
  let domain = url.split("/"); //以“/”进行分割

  if (domain[2]) {
    domain = domain[2];
  } else {
    domain = ""; //如果url不正确就取空
  }
  return domain;
}

// 判断是域名、公网ip
export function checkDomain(str) {
  //验证是否是域名
  let doname =
    /^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|   (io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/;
  let flag_domain = doname.test(str);
  if (!flag_domain) {
    //错误的域名
    return false;
  } else {
    return true;
  }
}

// 检查网站是否能正常加载
export function checkSite(url) {
  // 新建一个图片
  let img = new Image();
  // 设置图片的链接
  if (checkDomain(url)) {
    img.src = "https://" + url + "/favicon.ico";
  } else {
    img.src = "http://" + url + "/favicon.ico";
  }
  console.log("进入检查网址正常方法");

  return new Promise((res, rej) => {
    // 设定超时事件，延迟 3000 毫秒
    var timeout = setTimeout(function () {
      // 清除 onerror 和 onload 事件
      img.onerror = img.onload = null;
      console.log("time out.....");
      res(false);
    }, 1000);

    // 设定错误事件
    img.onerror = function () {
      // 先清除超时事件
      clearTimeout(timeout);
      console.log("load error.....");
      res(false);
    };

    // 设定可以加载的事件
    img.onload = function () {
      // 先清除超时事件
      clearTimeout(timeout);
      console.log("ok.....");
      res(true);
    };
  });
}

/**
 * 触发自定义事件
 * @param action
 * @param data
 * @constructor
 */
export function AddDispatchEvent(action, data) {
  // 创建自定义事件
  var event = document.createEvent("HTMLEvents");
  // 初始化testEvent事件
  event.initEvent(action, false, true);
  event.data = data;
  // 触发自定义事件
  window.dispatchEvent(event);
}

// 是否空对象
export function isEmptyObj(obj) {
  return Reflect.ownKeys(obj).length == 0;
}

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

// 树递归筛入指定字段数据
export function treeListCallee(list = [], key = "value") {
  list.forEach((row) => {
    row[key] = generateUUID();
    if (row?.children?.length) {
      treeListCallee(row?.children);
    }
  });
}

// 小数转百分比
export function toPercent(point) {
  var percent = Number((point - 0) * 100).toFixed(0);
  percent += "%";
  return percent;
}

// 中文数字一到十、转成阿拉伯数字1-10
export function convertChineseToNumber(str) {
  const map = {
    一: 1,
    壹: 1,
    二: 2,
    贰: 2,
    两: 2,
    三: 3,
    叁: 3,
    四: 4,
    肆: 4,
    五: 5,
    伍: 5,
    六: 6,
    陆: 6,
    七: 7,
    柒: 7,
    八: 8,
    捌: 8,
    九: 9,
    玖: 9,
    十: 10,
    拾: 10,
  };
  let result = "";
  for (let i = 0; i < str?.length; i++) {
    const char = str?.charAt(i);
    const value = map[char];
    if (value !== undefined) {
      result += value;
    } else {
      result += char;
    }
  }
  return result;
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

let timer = null;
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

    resolve(`${hours}:${minutes}:${seconds} `);
  });
}
