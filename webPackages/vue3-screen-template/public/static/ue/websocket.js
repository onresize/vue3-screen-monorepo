//netsh http add urlacl url=http://192.168.31.172:23456/  user=Everyone

const ToClientMessageType = {
  QualityControlOwnership: 0,
  Response: 1,
  Command: 2,
  FreezeFrame: 3,
  UnfreezeFrame: 4,
  VideoEncoderAvgQP: 5,
}

var freezeFrame = {
  receiving: false,
  size: 0,
  jpeg: undefined,
  height: 0,
  width: 0,
  valid: false,
}

let websocket = {
  onConnectWebSocket: function () {},
  onConnectWebSocketError: function () {},
  onConnectWebSocketClose: function () {},
  onGetClientList: function () {},
  onConnectRemoteClient: function () {},
  onRemoteClientExit: function () {},
  onTransmitMessage: function () {},
  onCallUeFunction: function () {},
  //onWebRTCProxyState: function () {},
  onWebRTCMessage: function () {},
  onBroadcastMessage: function () {},
  onVRMouseQRCodeImage: function () {},
  onDefaultMessage: function () {},

  targetServer: '', //由主服务器返回的目标服务器

  webSocketMessage: {
    cmdName: '',
    argString: '',
    jsonData: '{}',
  },
  ws: {},
  MESSAGEEND: '#FILEEND#',
  yourGuid: '9475c19f31ba4c028b0b56fa44533d90',
  remoteGuid: '',
  isClose: false,

  toUnicode: function (s) {
    return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function (newStr) {
      return '\\u' + newStr.charCodeAt(0).toString(16)
    })
  },

  hexCharCodeToStr: function (hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim()
    var rawStr =
      trimedStr.substr(0, 2).toLowerCase() === '0x'
        ? trimedStr.substr(2)
        : trimedStr
    var len = rawStr.length
    if (len % 2 !== 0) {
      alert('Illegal Format ASCII Code!')
      return ''
    }
    var curCharCode
    var resultStr = []
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16) // ASCII Code Value
      resultStr.push(String.fromCharCode(curCharCode))
    }
    return resultStr.join('')
  },
  ConncetMasterServer: function (inMasterServer = '127.0.0.1', port = '23456') {
    websocket.targetServer = ''
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        //4代表执行完成
        if (xmlhttp.status == 200) {
          //200代表执行成功
          console.log('MasterServer response : ' + xmlhttp.responseText)
          websocket.targetServer = JSON.parse(xmlhttp.responseText)[
            'serverAddress'
          ]
          websocket.onDefaultMessage(
            'OnConncetMasterServer',
            'true',
            xmlhttp.responseText
          )
        }
      }
    }

    xmlhttp.open(
      'GET',
      'http://' + inMasterServer + ':' + port + '/ueserver',
      false
    )

    try {
      xmlhttp.send()
    } catch (e) {
      console.log(e)
      setTimeout(function () {
        XR.ConnectWebSocket(inMasterServer, port)
      }, 0.5e3)
      return
    }

    if (websocket.targetServer == '') {
      console.error('MasterServer response : ' + xmlhttp.responseText)
      websocket.onDefaultMessage(
        'OnConncetMasterServer',
        'false',
        xmlhttp.responseText
      )
      return
    } else {
      console.log('Conncet targetServer : ' + websocket.targetServer)
    }

    //websocket连接出错的回调
    websocket.onConnectWebSocketError = (error) => {
      console.log('重试链接')
      setTimeout(function () {
        XR.ConnectWebSocket(websocket.targetServer, port)
      }, 2e3)
    }

    setTimeout(function () {
      XR.ConnectWebSocket(websocket.targetServer, port)
    }, 0.5e3)
  },
  ConnectWebSocket: function (ipString = '127.0.0.1', port = '23456') {
    websocket.ws = new WebSocket('ws://' + ipString + ':' + port + '/')
    websocket.ws.onopen = function (open) {
      console.log('WebSocket已连接')
    }

    websocket.ws.onmessage = function (message) {
      //		   console.log("***ReceiveData***:"+message.data);
      websocket.ProcessReceiveWSMessage(message.data)
    }

    websocket.ws.onerror = function (error) {
      console.log(error)
      console.log('WebSocket发生错误')
      websocket.onConnectWebSocketError(error)
    }

    websocket.ws.onclose = function (close) {
      if (webrtc) webrtc.Close()
      console.log(close)
      console.log('已关闭WebSocket')
      websocket.onConnectWebSocketClose(close)
    }
  },
  ProcessReceiveWSMessage: function (message) {
    if (this.isClose) return

    //console.log(message);
    if (message.match(websocket.MESSAGEEND)) {
      var usefulValue = JSON.parse(message.replace(websocket.MESSAGEEND, ''))
      //console.log(usefulValue.jsonData);
      var messagePayloadJsonData = JSON.parse(usefulValue.jsonData)

      switch (usefulValue.cmdName) {
        case 'YourGuid':
          console.log('YourGuid:' + usefulValue.argString)
          //XR.DebugToHtml("YourGuid:" + usefulValue.argString);
          websocket.yourGuid = usefulValue.argString
          websocket.onConnectWebSocket(usefulValue.argString)
          break

        case 'KickByOtherUser':
          console.log('KickByOtherUser')
          this.isClose = true
          //websocket.ws.close();
          break

        case 'NeedRetryConnect':
          console.log('NeedRetryConnect 重试链接')
          location.reload()

          break

        case 'VRMouseQRCodeImage':
          //					console.log(usefulValue.argString);
          websocket.onVRMouseQRCodeImage(usefulValue.argString)
          break

        case 'ACKSetRemoteClient':
          console.log(usefulValue.jsonData)

          if (usefulValue.argString == 'true') {
            websocket.SendWSMessage('ConnectRemoteClient', '')
          } else {
            //console.log("RemoteClient未找到");
            //重新获取列表
            //websocket.SendWSMessage("GetClientList");
          }
          break

        case 'ACKConnectRemoteClient':
          {
            if (usefulValue.argString == 'true') {
              websocket.remoteGuid = messagePayloadJsonData.guidHexString
              console.log(
                'ConnectRemoteClient已连接,RemoteClient : ' +
                  messagePayloadJsonData.guidHexString
              )
              websocket.onConnectRemoteClient(
                messagePayloadJsonData.guidHexString
              )
            } else {
              console.log(
                'ConnectRemoteClient连接失败  ' + usefulValue.jsonData
              )
            }
          }
          break

        case 'RemoteClientExit':
          console.log('RemoteClient断开连接 : ' + websocket.remoteGuid)
          websocket.onRemoteClientExit(websocket.remoteGuid)
          break

        case 'OnGetClientList':
          console.log(messagePayloadJsonData)
          websocket.onGetClientList(messagePayloadJsonData)
          break

        case 'TransmitMessage':
          //console.log(usefulValue.argString);
          websocket.onTransmitMessage(
            usefulValue.argString,
            messagePayloadJsonData
          )
          break

        case 'WebRTCMessageToWebBrowser':
          //console.log(messagePayloadJsonData);
          websocket.onWebRTCMessage(messagePayloadJsonData)
          break

        case 'BroadcastMessage':
          websocket.onBroadcastMessage(
            usefulValue.argString,
            messagePayloadJsonData
          )
          break
        /*
                case "ToH5Message":
                  console.log("ToH5Message++++++++++++++++++++++++++");
                  websocket.onDefaultMessage(usefulValue.argString, messagePayloadJsonData);
                  break;
        */
        case 'JsRun':
          eval(usefulValue.argString)
          break

        default:
          //console.log("onDefaultMessage++++++++++++++++++++++++++");
          websocket.onDefaultMessage(
            usefulValue.cmdName,
            usefulValue.argString,
            messagePayloadJsonData
          )
          break
      }
    }
  },

  SendWSData: function (inData) {
    if (websocket.ws.readyState == 1) {
      //			console.log("***SendWSData***:"+inData);	;
      websocket.ws.send(inData + websocket.MESSAGEEND)
    }
  },

  SendWSMessage: function (inCmdName, inArgString = '', inJsonData = '{}') {
    websocket.webSocketMessage.cmdName = inCmdName
    websocket.webSocketMessage.argString = inArgString
    websocket.webSocketMessage.jsonData = inJsonData
    websocket.SendWSData(JSON.stringify(websocket.webSocketMessage))
  },

  ChangeGuid: function (newGuid) {
    websocket.SendWSMessage('ChangeGuid', newGuid)
  },
  GetClientList: function () {
    websocket.SendWSMessage('GetClientList')
  },
  SetRemoteClient: function (remoteClientGuid) {
    websocket.SendWSMessage('SetRemoteClient', remoteClientGuid)
  },
}

let webrtc = {
  playerId: -1,
  webRtcPlayerObj: undefined,
  onVideoPlay: function () {},
  SendVideoQualityMessage(level, inWidth = -1, inHeight = -1) {
    XR.ExecuteUEConsoleCommand('t.MaxFPS 30')

    let maxW = 1920.0
    let maxH = 1080.0
    let scaleFactor = maxW / maxH
    let w = window.innerWidth * window.devicePixelRatio
    let h = window.innerHeight * window.devicePixelRatio
    let currentScaleFactor = w / h

    //如果比较宽,用宽做大边
    if (currentScaleFactor > scaleFactor) {
      if (w > maxW) {
        h *= maxW / w
        w = maxW
      }
    } //如果比较窄，用高做大边
    else {
      if (h > maxH) {
        w *= maxH / h
        h = maxH
      }
    }

    if (inWidth > 0 && inHeight > 0) {
      //XR.ExecuteUEConsoleCommand("r.setres "+width+"x"+height+"w");
    } else {
      //XR.ExecuteUEConsoleCommand("r.setres "+w+"x"+h+"w");
    }

    //XR.ExecuteUEConsoleCommand("PixelStreaming.Encoder.RateControl ConstQP");

    switch (level) {
      case 'low':
        //XR.ExecuteUEConsoleCommand("PixelStreaming.Encoder.MinQP 20");
        break

      case 'mid':
        //XR.ExecuteUEConsoleCommand("PixelStreaming.Encoder.MinQP 10");
        break

      case 'high':
        //XR.ExecuteUEConsoleCommand("PixelStreaming.Encoder.MaxTolerableQP 15");
        //XR.ExecuteUEConsoleCommand("PixelStreaming.Encoder.MinQP 3");
        XR.ExecuteUEConsoleCommand(
          'PixelStreaming.Encoder.MaxBitrate 100000000'
        )
        XR.ExecuteUEConsoleCommand('PixelStreaming.Encoder.MinBitrate 20000000')

        break
    }
  },
  OnWebRTCMessage(jsonData) {
    console.log(JSON.stringify(jsonData))
    switch (jsonData.type) {
      case 'config':
        webrtc.onConfig(jsonData)
        webrtc.playerId = jsonData.playerId
        console.log('webrtc.playerId ' + webrtc.playerId)
        setTimeout(() => {
          webrtc.SendVideoQualityMessage('high')
        }, 1e3)
        break
      case 'answer':
        webrtc.onWebRtcAnswer(jsonData)

        break
      case 'iceCandidate':
        webrtc.onWebRtcIce(jsonData.candidate)

        break
      case 'ping':
        //console.log("UE Rtc To Server Pint : "+timestamp.parse(jsonData.time));
        break
      default:
        console.log(`invalid SS message type: ${jsonData.type}`)
        break
    }
  },
  setupWebRtcPlayer(htmlElement, config) {
    webrtc.webRtcPlayerObj = new webRtcPlayer({
      peerConnectionOptions: config.peerConnectionOptions,
    })
    htmlElement.appendChild(webrtc.webRtcPlayerObj.video)
    //htmlElement.appendChild(freezeFrameOverlay);

    webrtc.webRtcPlayerObj.onWebRtcOffer = function (offer) {
      let offerStr = JSON.stringify({
        type: offer.type,
        playerId: webrtc.playerId,
        sdp: offer.sdp,
      })
      console.log(offerStr)
      websocket.SendWSMessage('TransmitMessageToWebRTCProxy', '', offerStr)
    }

    webrtc.webRtcPlayerObj.onWebRtcCandidate = function (candidate) {
      let candidateStr = JSON.stringify({
        type: 'iceCandidate',
        playerId: webrtc.playerId,
        candidate: candidate,
      })
      console.log(candidateStr)
      websocket.SendWSMessage('TransmitMessageToWebRTCProxy', '', candidateStr)
    }

    webrtc.webRtcPlayerObj.onVideoInitialised = function () {
      if (webrtc.webRtcPlayerObj) {
        XR.DebugToHtml('WebRTC Video Start Play!')
        console.log('WebRTC Video Start Play!')
        webrtc.webRtcPlayerObj.video.muted = true
        webrtc.webRtcPlayerObj.video.play()
        webrtc.onVideoPlay()
      }
    }

    webrtc.webRtcPlayerObj.onDataChannelConnected = function () {
      console.log('WebRTC connected, waiting for video')
    }

    function showFreezeFrame() {
      let base64 = btoa(
        freezeFrame.jpeg.reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      freezeFrameOverlay.src = 'data:image/jpeg;base64,' + base64
      freezeFrameOverlay.onload = function () {
        freezeFrame.height = freezeFrameOverlay.naturalHeight
        freezeFrame.width = freezeFrameOverlay.naturalWidth
        resizeFreezeFrameOverlay()
        if (shouldShowPlayOverlay) {
          showPlayOverlay()
          resizePlayerStyle()
        } else {
          showFreezeFrameOverlay()
        }
      }
    }

    webrtc.webRtcPlayerObj.onDataChannelMessage = function (data) {
      var view = new Uint8Array(data)
      if (freezeFrame.receiving) {
        let jpeg = new Uint8Array(freezeFrame.jpeg.length + view.length)
        jpeg.set(freezeFrame.jpeg, 0)
        jpeg.set(view, freezeFrame.jpeg.length)
        freezeFrame.jpeg = jpeg
        if (freezeFrame.jpeg.length === freezeFrame.size) {
          freezeFrame.receiving = false
          freezeFrame.valid = true
          console.log(`received complete freeze frame ${freezeFrame.size}`)
          showFreezeFrame()
        } else if (freezeFrame.jpeg.length > freezeFrame.size) {
          console.error(
            `received bigger freeze frame than advertised: ${freezeFrame.jpeg.length}/${freezeFrame.size}`
          )
          freezeFrame.jpeg = undefined
          freezeFrame.receiving = false
        } else {
          console.log(
            `received next chunk (${view.length} bytes) of freeze frame: ${freezeFrame.jpeg.length}/${freezeFrame.size}`
          )
        }
      } else if (view[0] === ToClientMessageType.QualityControlOwnership) {
        let ownership = view[1] === 0 ? false : true
        // If we own the quality control, we can't relenquish it. We only loose
        // quality control when another peer asks for it
        if (qualityControlOwnershipCheckBox !== null) {
          qualityControlOwnershipCheckBox.disabled = ownership
          qualityControlOwnershipCheckBox.checked = ownership
        }
      } else if (view[0] === ToClientMessageType.Response) {
        let response = new TextDecoder('utf-16').decode(data.slice(1))
        for (let listener of responseEventListeners.values()) {
          listener(response)
        }
      } else if (view[0] === ToClientMessageType.Command) {
        let commandAsString = new TextDecoder('utf-16').decode(data.slice(1))
        console.log(commandAsString)
        let command = JSON.parse(commandAsString)
        if (command.command === 'onScreenKeyboard') {
          showOnScreenKeyboard(command)
        }
      } else if (view[0] === ToClientMessageType.FreezeFrame) {
        freezeFrame.size = new DataView(view.slice(1, 5).buffer).getInt32(
          0,
          true
        )
        freezeFrame.jpeg = view.slice(1 + 4)
        if (freezeFrame.jpeg.length < freezeFrame.size) {
          console.log(
            `received first chunk of freeze frame: ${freezeFrame.jpeg.length}/${freezeFrame.size}`
          )
          freezeFrame.receiving = true
        } else {
          console.log(
            `received complete freeze frame: ${freezeFrame.jpeg.length}/${freezeFrame.size}`
          )
          showFreezeFrame()
        }
      } else if (view[0] === ToClientMessageType.UnfreezeFrame) {
        invalidateFreezeFrameOverlay()
      } else if (view[0] === ToClientMessageType.VideoEncoderAvgQP) {
        VideoEncoderQP = new TextDecoder('utf-16').decode(data.slice(1))
        //console.log(`received VideoEncoderAvgQP ${VideoEncoderQP}`);
      } else {
        console.error(`unrecognised data received, packet ID ${view[0]}`)
      }
    }

    //registerInputs(webrtcvideopage.webRtcPlayerObj.video);

    // On a touch device we will need special ways to show the on-screen keyboard.
    // if ('ontouchstart' in document.documentElement) {
    //  createOnScreenKeyboardHelpers(htmlElement);
    // }

    if (webrtc.webRtcPlayerObj) {
      console.log('Creating offer')
      webrtc.webRtcPlayerObj.createOffer()
    } else {
      console.log('WebRTC player not setup, cannot create offer')
    }

    return webrtc.webRtcPlayerObj.video
  },
  // Config data received from WebRTC sender via the Cirrus web server
  onConfig(config) {
    let playerDiv = document.getElementById('player')
    let playerElement = webrtc.setupWebRtcPlayer(playerDiv, config)
  },
  onWebRtcAnswer(webRTCData) {
    webrtc.webRtcPlayerObj.receiveAnswer(webRTCData)

    let printInterval = 1 * 60 * 1000 /*Print every 5 minutes*/
    let nextPrintDuration = printInterval

    webrtc.webRtcPlayerObj.onAggregatedStats = (aggregatedStats) => {
      let numberFormat = new Intl.NumberFormat(window.navigator.language, {
        maximumFractionDigits: 0,
      })
      let timeFormat = new Intl.NumberFormat(window.navigator.language, {
        maximumFractionDigits: 0,
        minimumIntegerDigits: 2,
      })
      let statsText = ''

      // Calculate duration of run
      let runTime =
        (aggregatedStats.timestamp - aggregatedStats.timestampStart) / 1000
      let timeValues = []
      let timeDurations = [60, 60]
      for (let timeIndex = 0; timeIndex < timeDurations.length; timeIndex++) {
        timeValues.push(runTime % timeDurations[timeIndex])
        runTime = runTime / timeDurations[timeIndex]
      }
      timeValues.push(runTime)

      let runTimeSeconds = timeValues[0]
      let runTimeMinutes = Math.floor(timeValues[1])
      let runTimeHours = Math.floor([timeValues[2]])

      receivedBytesMeasurement = 'B'
      receivedBytes = aggregatedStats.hasOwnProperty('bytesReceived')
        ? aggregatedStats.bytesReceived
        : 0
      let dataMeasurements = ['kB', 'MB', 'GB']
      for (let index = 0; index < dataMeasurements.length; index++) {
        if (receivedBytes < 100 * 1000) break
        receivedBytes = receivedBytes / 1000
        receivedBytesMeasurement = dataMeasurements[index]
      }

      statsText += `Duration: ${timeFormat.format(
        runTimeHours
      )}:${timeFormat.format(runTimeMinutes)}:${timeFormat.format(
        runTimeSeconds
      )}</br>`
      statsText += `Video Resolution: ${
        aggregatedStats.hasOwnProperty('frameWidth') &&
        aggregatedStats.frameWidth &&
        aggregatedStats.hasOwnProperty('frameHeight') &&
        aggregatedStats.frameHeight
          ? aggregatedStats.frameWidth + 'x' + aggregatedStats.frameHeight
          : 'N/A'
      }</br>`
      statsText += `Received (${receivedBytesMeasurement}): ${numberFormat.format(
        receivedBytes
      )}</br>`
      statsText += `Frames Decoded: ${
        aggregatedStats.hasOwnProperty('framesDecoded')
          ? numberFormat.format(aggregatedStats.framesDecoded)
          : 'N/A'
      }</br>`
      statsText += `Packets Lost: ${
        aggregatedStats.hasOwnProperty('packetsLost')
          ? numberFormat.format(aggregatedStats.packetsLost)
          : 'N/A'
      }</br>`
      statsText += `Bitrate (kbps): ${
        aggregatedStats.hasOwnProperty('bitrate')
          ? numberFormat.format(aggregatedStats.bitrate)
          : 'N/A'
      }</br>`
      statsText += `Framerate: ${
        aggregatedStats.hasOwnProperty('framerate')
          ? numberFormat.format(aggregatedStats.framerate)
          : 'N/A'
      }</br>`
      statsText += `Frames dropped: ${
        aggregatedStats.hasOwnProperty('framesDropped')
          ? numberFormat.format(aggregatedStats.framesDropped)
          : 'N/A'
      }</br>`
      statsText += `Latency (ms): ${
        aggregatedStats.hasOwnProperty('currentRoundTripTime')
          ? numberFormat.format(aggregatedStats.currentRoundTripTime * 1000)
          : 'N/A'
      }</br>`

      let statsDiv = document.getElementById('stats')
      if (statsDiv) {
        statsDiv.innerHTML = statsText
      }

      if (true) {
        if (aggregatedStats.timestampStart) {
          if (
            aggregatedStats.timestamp - aggregatedStats.timestampStart >
            nextPrintDuration
          ) {
            console.log(JSON.stringify(aggregatedStats))
            nextPrintDuration += printInterval
          }
        }
      }
    }

    webrtc.webRtcPlayerObj.aggregateStats(10 * 1000 /*Check every 1 second*/)

    //let displayStats = () => { webrtcvideopage.webRtcPlayerObj.getStats( (s) => { s.forEach(stat => { console.log(JSON.stringify(stat)); }); } ); }
    //var displayStatsIntervalId = setInterval(displayStats, 30 * 1000);
  },
  onWebRtcIce(iceCandidate) {
    if (webrtc.webRtcPlayerObj)
      webrtc.webRtcPlayerObj.handleCandidateFromServer(iceCandidate)
  },
  Close() {
    if (this.webRtcPlayerObj) this.webRtcPlayerObj.close()
  },
}

websocket.onWebRTCMessage = webrtc.OnWebRTCMessage

//console.log("WebInit");
//ConnectWebSocket();
//console.log(toUnicode('{"uievent": {"environment": [{"id":"music","displayname":"音乐","state":false,"opt1":"","opt2":""},{"id":"skylight","displayname":"skylight","state":true,"minValue":0,"maxValue":100,"value":68}],"buttons":[[{"id":"1J_01","displayname":"超级区位","state":false,"opt1":"","opt2":""},{"id":"1J_02","displayname":"快速交通","state":false,"opt1":"","opt2":""},{"id":"1J_03","displayname":"十全配套","state":false,"opt1":"","opt2":""},{"id":"1J_04","displayname":"户型","state":false,"opt1":"","opt2":""},{"id":"1J_05","displayname":"选房","state":true,"opt1":"","opt2":""}],[{"id":"xfRemoteButton_C_21","displayname":"1号楼","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_22","displayname":"2号楼","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_23","displayname":"3号楼","state":true,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_24","displayname":"4号楼","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_25","displayname":"5号楼","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_26","displayname":"6号楼","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_27","displayname":"7号楼","state":false,"opt1":"","opt2":""}],[{"id":"xfRemoteButton_C_28","displayname":"1单元","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_29","displayname":"2单元","state":true,"opt1":"","opt2":""}],[{"id":"xfRemoteButton_C_30","displayname":"102","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_31","displayname":"202","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_32","displayname":"302","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_33","displayname":"402","state":false,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_34","displayname":"502","state":true,"opt1":"","opt2":""},{"id":"xfRemoteButton_C_35","displayname":"602","state":false,"opt1":"","opt2":""}]]}}'));
//console.log(document.title);
