import auth from './modules/auth'
import copy from './modules/copy'
import waterMarker from './modules/waterMarker'
import draggable from './modules/draggable'
import debounce from './modules/debounce'
import throttle from './modules/throttle'
import longpress from './modules/longpress'
import permission from './modules/permission'
import lazy from './modules/lazy'
import sound from './modules/sound'

const directivesList = {
  // Custom directives
  auth,
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  longpress,
  permission,
  lazy,
  sound,
}

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
