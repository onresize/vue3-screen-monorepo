import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores'
import websocket from './websocket'
import XR from './xrframework'

//处理回调消息
export const CallBackMessage = async (cmdName, argString, callback) => {
  const store = useMessageStore()
  const { message } = storeToRefs(store)
  console.log(cmdName + ': ===>', argString)

  let data = {}
  try {
    data = JSON.parse(argString)
  } catch (e) {
    data = {}
  }
  switch (cmdName) {
    case 'LevelLoadComplete':
      break
    case 'OnPlaceNewPoint':
      break
    case 'OnHitNCAreaUI':
      break
    case 'OnHitXFBox':
      break
    case 'OnHit3DUI':
      break
    case 'OnTraceHit3DUI':
      break
    case 'XFOnHitButtonCallBack':
    default:
      break
  }
}

export const WebSocketUtil = () => {
  //websocket连接出错的回调
  websocket.onConnectWebSocketError = (error) => {
    console.log('重试链接')
    setTimeout(function () {
      XR.ConnectWebSocket('127.0.0.1')
    }, 2000)
  }

  let isInit = true
  let touchCtrl

  //websocket正常连接的回调
  websocket.onConnectWebSocket = (guidHexString) => {
    console.log('websocket onConnectWebSocket')
    if (!touchCtrl)
      touchCtrl = new XR.TouchCtrl(document.getElementById('UeTouch')) //初始化Touch web界面
    if (isInit) {
      console.log('init ws')
      XR.CallFunction('OnNoServerModeStart')
      XR.SendMessage('GetWebRTCProxyState') //获取webrtc状态
      XR.SetMouseHoverState(false)
      // XR.CallFunction("EnableSetMousePosition true");
      isInit = false
    }
    XR.CallFunction('ShowDevTools')
  }

  //websocket接收的消息的回调
  websocket.onDefaultMessage = CallBackMessage

  //websocket退出连接的回调
  websocket.onRemoteClientExit = () => {
    XR.DebugToHtml('RemoteClient已断开')
  }

  //是否处于测试模式：true：是，false：正式环境
  XR.Init(false, websocket, false, true)
  XR.ConnectWebSocket('127.0.0.1')
}

export default WebSocketUtil
