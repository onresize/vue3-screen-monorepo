import { getCurrentInstance, nextTick } from 'vue'
import BtnAudio from '@/assets/audio/3761.wav'

let soundName = '',
  // 音频命名对象
  soundObj = {
    ['3761']: '.wav',
    ['3777']: '.mp3',
  }

const sound = {
  mounted(el, binding) {
    // soundName = binding?.value;
    // console.log(el.getAttribute("soundStr"));
    // el.addEventListener("click", handleClick);
    let buttonAudio = document.getElementById('eventAudio')
    el.onclick = async function handleClick(e) {
      let soundStr = e.currentTarget.getAttribute('soundStr')
      console.log('进入指令click方法--------------------------', soundStr)
      // 创建
      await PromiseFunc(buttonAudio, soundStr)
      // XXX销毁
      await nextTick()
      buttonAudio.setAttribute('src', '')
      buttonAudio.pause()
    }
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.__handleClick__)
  },
}

function PromiseFunc(Dom, name) {
  return new Promise((res, rej) => {
    if (name && Object.keys(soundObj).indexOf(name) > -1) {
      let pUrl = `../../assets/audio/${name}${soundObj[name]}`
      console.log(
        `开始播放${name}${soundObj[name]}-----------------`,
        new URL(pUrl, import.meta.url).href
      )
      Dom.setAttribute('src', new URL(pUrl, import.meta.url).href) // 不同音频
      // buttonAudio.setAttribute("src", BtnAudio);
      Dom.play()

      Dom.addEventListener(
        'ended',
        function () {
          console.log(`${name}${soundObj[name]}音频播放完毕`)
          res()
        },
        true
      )
    }
  })
}

export default sound
