let currRenderDom = null;
let currelRectification = "";
let currelRectificationLevel = "";
let resizeListener = null;
let timer = null;
let currScale = 1;
let isAutofitRunnig = false;
let isElRectification = false;
export const AutoFit = {
  init(options = {}, isShowInitTip = true) {
    if (isShowInitTip) {
      console.log(
        `%c` + `autofit.js` + ` is running`,
        `font-weight: bold; color: #ffb712; background:linear-gradient(-45deg, #bd34fe 50%, #47caff 50% );background: -webkit-linear-gradient( 120deg, #bd34fe 30%, #41d1ff );background-clip: text;-webkit-background-clip: text; -webkit-text-fill-color:linear-gradient( -45deg, #bd34fe 50%, #47caff 50% ); padding: 8px 12px; border-radius: 4px;`
      );
    }
    const { dw = 1920, dh = 1080, el = typeof options === "string" ? options : "#app", resize = true, transition = "none", delay = 0 } = options;
    currRenderDom = el;
    let dom = document.querySelector(el);
    if (!dom) {
      console.error(`autofit: '${el}' is not exist`);
      return;
    }
    dom.style.transitionProperty = `all`;
    dom.style.transitionTimingFunction = `cubic-bezier(0.4, 0, 0.2, 1)`;
    dom.style.transitionDuration = `400ms`;
    dom.style.transformOrigin = `left top`;
    keepFit(dw, dh, dom);
    resizeListener = () => {
      clearTimeout(timer);
      if (delay != 0)
        timer = setTimeout(() => {
          keepFit(dw, dh, dom);
          isElRectification && elRectification(currelRectification, currelRectificationLevel);
        }, delay);
      else {
        keepFit(dw, dh, dom);
        isElRectification && elRectification(currelRectification, currelRectificationLevel);
      }
    };
    resize && window.addEventListener("resize", resizeListener);
    isAutofitRunnig = true;
  },
  off(el = "#app") {
    try {
      isElRectification = false;
      window.removeEventListener("resize", resizeListener);
      document.querySelector("#autofit-style").remove();
      document.querySelector(currRenderDom ? currRenderDom : el).style = "";
      isElRectification && offelRectification();
    } catch (error) {
      console.error(`autofit: Failed to remove normally`, error);
      isAutofitRunnig = false;
    }
    isAutofitRunnig && console.log(`%c` + `autofit.js` + ` is off`, `font-weight: bold;color: #707070; background: #c9c9c9; padding: 8px 12px; border-radius: 4px;`);
  },
};
function elRectification(el, level = 1) {
  if (!isAutofitRunnig) {
    console.error("autofit.js：autofit has not been initialized yet");
  }
  !el && console.error(`autofit.js：bad selector: ${el}`);
  currelRectification = el;
  currelRectificationLevel = level;
  const currEl = document.querySelectorAll(el);
  if (currEl.length == 0) {
    console.error("autofit.js：elRectification found no element");
    return;
  }
  for (let item of currEl) {
    if (!isElRectification) {
      item.originalWidth = item.clientWidth;
      item.originalHeight = item.clientHeight;
    }
    let rectification = currScale == 1 ? 1 : currScale * level;
    item.style.width = `${item.originalWidth * rectification}px`;
    item.style.height = `${item.originalHeight * rectification}px`;
    item.style.transform = `scale(${1 / currScale})`;
    item.style.transformOrigin = `0 0`;
  }
  isElRectification = true;
}
function offelRectification() {
  if (!currelRectification) return;
  for (let item of document.querySelectorAll(currelRectification)) {
    item.style.width = ``;
    item.style.height = ``;
    item.style.transform = ``;
  }
}
function keepFit(dw, dh, dom) {
  // 获取真实视口尺寸
  let clientWidth = document.documentElement.clientWidth; // 1920
  let clientHeight = document.documentElement.clientHeight; // 985
  // 计算缩放比例、y缩放比小于1、赋默认值
  let clientH = clientHeight / dh;
  currScale = `${[clientWidth / dw, clientH]}`;
  //  clientH < 1 ? `${[clientWidth / dw, 1]}` :
  console.log("autofitJS缩放比：", `scale(${currScale})`, dw, dh);
  dom.style.width = `${dw}px`;
  dom.style.height = `${dh}px`;
  dom.style.transform = `scale(${currScale})`;
}
