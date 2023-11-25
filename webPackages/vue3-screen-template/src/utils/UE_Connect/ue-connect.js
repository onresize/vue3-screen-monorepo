import { useMessageStore } from '@/stores'

//处理回调消息
export const CallBackMessage = async (cmdName, argString, callback) => {
  const store = useMessageStore()
  // console.log(cmdName + ':👇👇\n', argString)

  let data = {}
  try {
    data = JSON.parse(argString)
  } catch (e) {
    data = {}
  }

  switch (cmdName) {
    case 'OnHit3DUI':
      store.setWebsocketMsgRet_Sync(cmdName, data)
      break
    default:
      break
  }
}

export const WebSocketUtil = () => {
  //websocket连接出错的回调
  websocket.onConnectWebSocketError = (error) => {
    console.log('重试连接🌐🌐🌐')
    setTimeout(function () {
      XR.ConnectWebSocket('127.0.0.1')
    }, 2e3)
  }

  let isInit = true
  let touchCtrl

  //websocket正常连接的回调
  websocket.onConnectWebSocket = (guidHexString) => {
    if (!touchCtrl) {
      touchCtrl = new XR.TouchCtrl(document.getElementById('UeTouch')) //初始化Touch web界面
    }

    let viewportSize = { width: window.innerWidth, height: window.innerHeight }
    XR.SendMessage('SetClientType', 'H5', JSON.stringify(viewportSize))

    if (isInit) {
      console.log('init ws🚀🚀🚀')
      XR.CallFunction('OnNoServerModeStart')
      XR.SendMessage('GetWebRTCProxyState') //获取webrtc状态
      XR.SetMouseHoverState(false)
      // XR.CallFunction("EnableSetMousePosition true");
      isInit = false
    }
    XR.CallFunction('ShowDevTools')
  }

  websocket.onConnectRemoteClient = (guidHexString) => {
    XR.SendMessage('GetWebRTCProxyState') //获取webrtc状态
  }

  //websocket接收的消息的回调
  websocket.onDefaultMessage = CallBackMessage

  //websocket退出连接的回调
  websocket.onRemoteClientExit = () => {
    XR.DebugToHtml('连接已断开💥💥💥')
  }

  //是否处于测试模式：true：是，false：正式环境
  XR.Init(false, websocket, false, true)
  console.log(
    `%c当前socket连接url:%c${import.meta.env.VITE_UE_CONNECT_Socket_URL}`,
    'padding: 3px; color: #000; background: #FDC830; border-radius: 5px 0 0 5px;',
    'padding: 3px; color: white; background: #F37335;border-radius: 0 5px 5px 0;'
  )
  XR.ConnectWebSocket(import.meta.env.VITE_UE_CONNECT_Socket_URL || '127.0.0.1')
}

export default WebSocketUtil
