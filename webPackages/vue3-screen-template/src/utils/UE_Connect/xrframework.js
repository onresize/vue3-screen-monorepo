// eslint-disable-next-line
var XR = (function (t) {
  var e = {}

  function i(n) {
    if (e[n]) return e[n].exports
    var s = (e[n] = {
      i: n,
      l: !1,
      exports: {},
    })
    return t[n].call(s.exports, s, s.exports, i), (s.l = !0), s.exports
  }
  return (
    (i.m = t),
    (i.c = e),
    (i.d = function (t, e, n) {
      i.o(t, e) ||
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: n,
        })
    }),
    (i.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {
          value: 'Module',
        }),
        Object.defineProperty(t, '__esModule', {
          value: !0,
        })
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var n = Object.create(null)
      if (
        (i.r(n),
        Object.defineProperty(n, 'default', {
          enumerable: !0,
          value: t,
        }),
        2 & e && 'string' != typeof t)
      )
        for (var s in t)
          i.d(
            n,
            s,
            function (e) {
              return t[e]
            }.bind(null, s)
          )
      return n
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return i.d(e, 'a', e), e
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (i.p = ''),
    i((i.s = 0))
  )
})([
  function (t, e, i) {
    'use strict'
    i.r(e),
      i.d(e, 'globalscale', function () {
        return r
      }),
      i.d(e, 'targetWidth', function () {
        return d
      }),
      i.d(e, 'targetHeight', function () {
        return a
      }),
      i.d(e, 'viewportWidth', function () {
        return L
      }),
      i.d(e, 'viewportHeight', function () {
        return f
      }),
      i.d(e, 'projectName', function () {
        return b
      }),
      i.d(e, 'Init', function () {
        return E
      }),
      i.d(e, 'SetRunMode', function () {
        return R
      }),
      i.d(e, 'ConnectWebSocket', function () {
        return C
      }),
      i.d(e, 'SendMessage', function () {
        return U
      }),
      i.d(e, 'CallFunction', function () {
        return y
      }),
      i.d(e, 'ExecuteUEConsoleCommand', function () {
        return D
      }),
      i.d(e, 'DebugToHtml', function () {
        return H
      }),
      i.d(e, 'SetBrowserMark', function () {
        return S
      }),
      i.d(e, 'SetWebViewportSize', function () {
        return I
      }),
      i.d(e, 'SetMouseHoverState', function () {
        return W
      }),
      i.d(e, 'ClearH5DebugInfo', function () {
        return x
      }),
      i.d(e, 'DisplayHTMLDebug', function () {
        return A
      }),
      i.d(e, 'TouchCtrl', function () {
        return F
      })
    let n,
      s,
      o,
      c,
      h,
      u,
      l,
      r = 1,
      d = 1920,
      a = 1080,
      L = 1,
      f = 1,
      g = 0,
      m = 'localMode',
      M = '',
      X = 0,
      Y = !1,
      O = 0,
      b = '',
      T = !1,
      v = !1,
      p = 0,
      w = 2

    function E(t = !1, e, i = !1, r = !1, m = 1920, M = 1080) {
      ;(T = i),
        (v = r) && ((w = 0), (p = 2)),
        (d = m),
        (a = M),
        e && (l = e),
        setInterval(() => {
          ;(g += 0.25), (X += 0.25)
        }, 10),
        t &&
          (((n = document.createElement('div')).className = 'debug'),
          document.head.insertAdjacentElement('afterend', n),
          ((s = document.createElement('div')).id = 'debugOutput'),
          (s.hidden = !0),
          (s.innerHTML = 'Use Debug Output!<br/>'),
          n.insertAdjacentElement('afterbegin', s),
          ((h = document.createElement('div')).innerHTML = 'touchEndDebug'),
          n.insertAdjacentElement('afterbegin', h),
          ((c = document.createElement('div')).innerHTML = 'touchMoveDebug'),
          n.insertAdjacentElement('afterbegin', c),
          ((o = document.createElement('div')).innerHTML = 'touchStartDebug'),
          n.insertAdjacentElement('afterbegin', o),
          ((u = document.createElement('div')).innerHTML =
            '<button onclick=\'XR.CallFunction("Quit")\'>Quit</button> <button onclick=\'XR.DisplayHTMLDebug()\'>DisplayHTMLDebug</button> <button onclick=\'XR.ClearH5DebugInfo()\'>Clear</button> <button onclick=\'XR.CallFunction("SetWebViewportRect 0 0")\'>HiddenWebUI</button> <button onclick=\'XR.CallFunction("LoadDefaultUrl")\'>WebReload</button> <button onclick=\'XR.CallFunction("ReStart")\'>ReStart</button><a href="http://html5test.com" draggable="false">H5UI-20191029</a>'),
          (u.className = 'use-touch'),
          n.insertAdjacentElement('afterbegin', u),
          console.log('Use Debug Output!')),
        window.innerWidth > 0 &&
          (H('Normal Broswer'),
          (L = window.innerWidth),
          (f = window.innerHeight)),
        window.addEventListener(
          'touchstart',
          function (t) {
            if (o) {
              o.innerHTML = 'All Touch Count:' + t.touches.length + '   '
              for (let e = 0; e < t.touches.length; e++)
                o.innerHTML += k('start', t.touches[e])
            }
          },
          !1
        ),
        window.addEventListener(
          'touchmove',
          function (t) {
            if (c) {
              c.innerHTML = 'All Touch Count:' + t.touches.length + '   '
              for (let e = 0; e < t.touches.length; e++)
                c.innerHTML += k('move', t.touches[e])
            }
          },
          {
            passive: !0,
          }
        ),
        window.addEventListener(
          'touchend',
          function (t) {
            if (h) {
              h.innerHTML = 'All Touch Count:' + t.touches.length + '   '
              for (let e = 0; e < t.changedTouches.length; e++)
                h.innerHTML += k('end', t.changedTouches[e])
            }
          },
          !0
        ),
        document.addEventListener('contextmenu', (t) => t.preventDefault()),
        -1 != window.navigator.userAgent.indexOf('Mobile')
          ? -1 != window.navigator.userAgent.indexOf('QQBrowser')
            ? S('Mobile_QQBrowser')
            : S('Mobile')
          : -1 != window.navigator.userAgent.indexOf('Macintosh')
          ? S('Macintosh')
          : S('Desktop'),
        (document.onkeydown = function (t) {
          'Escape' == t.key && y('Quit'),
            t.repeat || y('OnKeyEvent ' + t.key + ' 1')
        }),
        (document.onkeyup = function (t) {
          t.repeat || y('OnKeyEvent ' + t.key + ' 0')
        }),
        (window.onblur = function (t) {
          H('Web Window Lost Focus'),
            console.log('Web Window Lost Focus'),
            y('KeyboardMovePos 0 0')
        })
    }

    function R(t) {
      ;('localMode' != t && 'remoteCtrlMode' != t && 'webRTCMode' != t) ||
        (m = t)
    }

    function C(t, e) {
      l && l.ConnectWebSocket(t, e)
    }

    function U(t, e = '', i = '{}') {
      switch ((H('JsSend: ' + t + '------' + e + '------' + i), m)) {
        case 'localMode':
          l.SendWSMessage(t, e, i)
      }
    }

    function y(t, e = '{}') {
      U('CallFunction', t, e)
    }

    function D(t) {
      U('ExecuteUEConsoleCommand', t.replace(' ', '$'), '{}')
    }

    function H(t, e = !0) {
      s && (e ? (s.innerHTML += t + '<br/>') : (s.innerHTML = t + '<br/>'))
    }

    function S(t) {
      H('BrowserMark: ' + (M = t))
    }

    function I(t, e) {
      ;(L = parseFloat(t)), (f = parseFloat(e))
    }

    function W(t) {
      Y = t
    }

    function k(t, e) {
      return (
        '{type:' +
        t +
        ',id:' +
        e.identifier +
        ',sX:' +
        e.clientX +
        ',sY:' +
        e.clientY +
        '}'
      )
    }

    function P(t, e) {
      let i = -1
      for (let n = 0; n < t.length; n++) t[n] == e && (i = n)
      i > -1 && t.splice(i, 1)
    }

    function j(t, e, i, n) {
      return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - n, 2))
    }

    function x() {
      s.innerHTML = ''
    }

    function A() {
      s.hidden = !s.hidden
    }
    class F {
      constructor(t, e = !0, i = () => {}, n = () => {}) {
        ;(this.name = t.id),
          (this.sendMessage = e),
          (this.onUIMove = i),
          (this.onUIZoom = n),
          (this.touchList = {}),
          (this.mouseRightTouch = {}),
          (this.idList = new Array()),
          'Desktop' == M
            ? (t.addEventListener('mousedown', (t) => {
                this.OnMouseDown(t, this.name)
              }),
              t.addEventListener('mousemove', (t) => {
                this.OnMouseMove(t, this.name)
              }),
              t.addEventListener('mouseup', (t) => {
                this.OnMouseUp(t, this.name)
              }),
              t.addEventListener('wheel', (t) => {
                this.OnWheel(t, this.name)
              }),
              t.addEventListener('mouseout', (t) => {
                this.OnMouseUp(t, this.name)
              }))
            : (t.addEventListener(
                'touchstart',
                (t) => {
                  this.OnTouchStart(t, this.name)
                },
                {
                  passive: !1,
                }
              ),
              t.addEventListener(
                'touchmove',
                (t) => {
                  this.OnTouchMove(t, this.name)
                },
                {
                  passive: !1,
                }
              ),
              t.addEventListener(
                'touchend',
                (t) => {
                  this.OnTouchEnd(t, this.name)
                },
                {
                  passive: !1,
                }
              ),
              t.addEventListener(
                'touchcancel',
                (t) => {
                  this.OnTouchCancel(t, this.name)
                },
                {
                  passive: !1,
                }
              ))
      }
      OnMouseDown(t, e) {
        this.sendMessage &&
          (y(
            'OnMouseDown ' +
              e +
              ' ' +
              t.clientX +
              ' ' +
              t.clientY +
              ' ' +
              t.button
          ),
          0 == t.button &&
            y('OnOnePointDown ' + e + ' ' + t.clientX + ' ' + t.clientY)),
          t.button == p
            ? (T ||
                ((this.touchList[0] = {
                  sX: t.clientX,
                  sY: t.clientY,
                  cX: t.clientX,
                  cY: t.clientY,
                  lX: t.clientX,
                  lY: t.clientY,
                }),
                H(
                  'OnMouseLeftButtonDown X:' +
                    this.touchList[0].sX +
                    ' Y:' +
                    this.touchList[0].sY
                )),
              this.sendMessage &&
                y(
                  'OnCameraColliderPlaneDown ' +
                    e +
                    ' ' +
                    t.clientX +
                    ' ' +
                    t.clientY
                ))
            : 1 == t.button
            ? (T &&
                ((this.touchList[0] = {
                  sX: t.clientX,
                  sY: t.clientY,
                  cX: t.clientX,
                  cY: t.clientY,
                  lX: t.clientX,
                  lY: t.clientY,
                }),
                H(
                  'OnMouseMiddleButtonDown X:' +
                    this.touchList[0].sX +
                    ' Y:' +
                    this.touchList[0].sY
                )),
              this.sendMessage &&
                y(
                  'OnCameraColliderPlaneDown ' +
                    e +
                    ' ' +
                    t.clientX +
                    ' ' +
                    t.clientY
                ))
            : t.button == w &&
              ((this.mouseRightTouch[0] = {
                sX: t.clientX,
                sY: t.clientY,
                cX: t.clientX,
                cY: t.clientY,
                lX: t.clientX,
                lY: t.clientY,
              }),
              H(
                'OnMouseRightButtonDown X:' +
                  this.mouseRightTouch[0].sX +
                  ' Y:' +
                  this.mouseRightTouch[0].sY
              ))
      }
      OnMouseHover(t, e) {}
      OnMouseMove(t, e) {
        if (this.touchList[0]) {
          ;(this.touchList[0].cX = t.clientX),
            (this.touchList[0].cY = t.clientY)
          let i = this.touchList[0].cX - this.touchList[0].lX,
            n = this.touchList[0].cY - this.touchList[0].lY
          g > 1 &&
            ((g = 0),
            H(this.name + '   xOffset:' + i + '    yOffset:' + n, !1),
            this.OnUIMove(i, n),
            this.sendMessage && y('OnUIMove ' + e + ' ' + i + ' ' + n),
            (this.touchList[0].lX = this.touchList[0].cX),
            (this.touchList[0].lY = this.touchList[0].cY))
        } else if (this.mouseRightTouch[0]) {
          ;(this.mouseRightTouch[0].cX = t.clientX),
            (this.mouseRightTouch[0].cY = t.clientY)
          let i = this.mouseRightTouch[0].cX - this.mouseRightTouch[0].lX,
            n = this.mouseRightTouch[0].cY - this.mouseRightTouch[0].lY
          g > 1 &&
            ((g = 0),
            H(this.name + '   xOffset2:' + i + '    yOffset2:' + n, !1),
            this.sendMessage && y('OnUIRot ' + e + ' ' + i + ' ' + n),
            (this.mouseRightTouch[0].lX = this.mouseRightTouch[0].cX),
            (this.mouseRightTouch[0].lY = this.mouseRightTouch[0].cY))
        } else if (g > 1) {
          g = 0
          let i = t.clientX,
            n = t.clientY
          Y && y('OnMouseHover ' + e + ' ' + i + ' ' + n)
        }
      }
      OnMouseUp(t, e) {
        y(
          'OnMouseUp ' + e + ' ' + t.clientX + ' ' + t.clientY + ' ' + t.button
        ),
          (!T && t.button == p) || (T && 1 == t.button)
            ? (this.touchList[0] && delete this.touchList[0],
              this.sendMessage &&
                (y('OnOnePointUp ' + e + ' ' + t.clientX + ' ' + t.clientY),
                y(
                  'OnCameraColliderPlaneUp ' +
                    e +
                    ' ' +
                    t.clientX +
                    ' ' +
                    t.clientY
                )))
            : t.button == w &&
              this.mouseRightTouch[0] &&
              delete this.mouseRightTouch[0],
          2 == t.buttons &&
            this.mouseRightTouch[0] &&
            delete this.mouseRightTouch[0]
      }
      OnWheel(t, e) {
        let i = new Date().getTime(),
          n = i - O
        n > 1e3 ? (n = 1e3) : n < 10 && (n = 10), H('OnWheel Y:' + t.deltaY, !1)
        let s = 0.01 * t.deltaY
        this.OnUIZoom(s)
        let o = 1 - (n - 10) / 900 + 1e-4
        t.deltaY > 0 ? (o *= 1) : (o *= -1),
          this.sendMessage && y('OnUIZoom ' + e + ' ' + o),
          y('OnWheel ' + e + ' ' + o),
          (O = i)
      }
      OnTouchStart(t, e) {
        for (let e = 0; e < t.changedTouches.length; e++)
          t.currentTarget.id === this.name &&
            ((this.touchList[t.changedTouches[e].identifier] = {
              sX: t.changedTouches[e].clientX,
              sY: t.changedTouches[e].clientY,
              cX: t.changedTouches[e].clientX,
              cY: t.changedTouches[e].clientY,
              lX: t.changedTouches[e].clientX,
              lY: t.changedTouches[e].clientY,
            }),
            this.idList.push(t.changedTouches[e].identifier))
        1 == t.touches.length &&
          F &&
          y(
            'OnOnePointDown ' +
              e +
              ' ' +
              t.touches[0].clientX +
              ' ' +
              t.touches[0].clientY
          )
      }
      OnTouchMove(t, e) {
        for (let e = 0; e < t.touches.length; e++)
          t.currentTarget.id === this.name &&
            this.touchList[t.touches[e].identifier] &&
            ((this.touchList[t.touches[e].identifier].cX =
              t.touches[e].clientX),
            (this.touchList[t.touches[e].identifier].cY = t.touches[e].clientY))
        if (1 == this.idList.length) {
          let t =
              this.touchList[this.idList[0]].cX -
              this.touchList[this.idList[0]].lX,
            i =
              this.touchList[this.idList[0]].cY -
              this.touchList[this.idList[0]].lY
          g > 1 &&
            ((g = 0),
            H(
              this.name +
                '  ' +
                this.idList.length +
                '   xOffset:' +
                t +
                '    yOffset:' +
                i,
              !1
            ),
            this.OnUIMove(t, i),
            this.sendMessage && y('OnUIMove ' + e + ' ' + t + ' ' + i),
            (this.touchList[this.idList[0]].lX =
              this.touchList[this.idList[0]].cX),
            (this.touchList[this.idList[0]].lY =
              this.touchList[this.idList[0]].cY))
        } else if (2 == this.idList.length) {
          let t =
            0.1 *
            (j(
              this.touchList[this.idList[1]].lX,
              this.touchList[this.idList[1]].lY,
              this.touchList[this.idList[0]].lX,
              this.touchList[this.idList[0]].lY
            ) -
              j(
                this.touchList[this.idList[1]].cX,
                this.touchList[this.idList[1]].cY,
                this.touchList[this.idList[0]].cX,
                this.touchList[this.idList[0]].cY
              ))
          g > 1 &&
            ((g = 0),
            H(this.name + ' zoomOffset:' + t, !1),
            this.OnUIZoom(t),
            this.sendMessage && y('OnUIZoom ' + e + ' ' + t),
            (this.touchList[this.idList[0]].lX =
              this.touchList[this.idList[0]].cX),
            (this.touchList[this.idList[0]].lY =
              this.touchList[this.idList[0]].cY),
            (this.touchList[this.idList[1]].lX =
              this.touchList[this.idList[1]].cX),
            (this.touchList[this.idList[1]].lY =
              this.touchList[this.idList[1]].cY))
        } else if (3 == this.idList.length) {
          let t =
              this.touchList[this.idList[0]].cX -
              this.touchList[this.idList[0]].lX,
            i =
              this.touchList[this.idList[0]].cY -
              this.touchList[this.idList[0]].lY
          g > 1 &&
            ((g = 0),
            H(this.name + ' panX:' + t + ';panY:' + i, !1),
            this.sendMessage && y('OnUIPan ' + e + ' ' + t + ' ' + i),
            (this.touchList[this.idList[0]].lX =
              this.touchList[this.idList[0]].cX),
            (this.touchList[this.idList[0]].lY =
              this.touchList[this.idList[0]].cY))
        }
      }
      OnTouchEnd(t, e) {
        for (let e = 0; e < t.changedTouches.length; e++)
          t.currentTarget.id === this.name &&
            (delete this.touchList[t.changedTouches[e].identifier],
            P(this.idList, t.changedTouches[e].identifier))
        H(
          this.name + '  ' + this.idList.length + JSON.stringify(this.touchList)
        ),
          1 == t.touches.length
            ? this.sendMessage &&
              y(
                'OnOnePointDown ' +
                  e +
                  ' ' +
                  t.touches[0].clientX +
                  ' ' +
                  t.touches[0].clientY
              )
            : this.sendMessage && y('OnOnePointUp ' + e)
      }
      OnTouchCancel(t, e) {
        delete this.touchList,
          (this.touchList = {}),
          (this.idList = new Array()),
          console.log('TouchCancel'),
          H('TouchCancel')
      }
      OnUIMove(t, e) {
        this.onUIMove(t, e)
      }
      OnUIZoom(t) {
        this.onUIZoom(t)
      }
      OnUIPan(t, e) {}
    }
  },
])

window.XR = XR
export default XR
