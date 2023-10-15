<template>
  <div class="wrapper">
    <div class="content_box">
      <p>页面将在</p>
      <div id="counter_num">
        {{ restTime }}
      </div>
      <p>
        <b>s</b>
        后自动跳转到
        <u><a href="/" target="_self">首页</a></u>
      </p>
    </div>
  </div>
  <div class="box-404">
    <div class="erro404"></div>
    <div class="rail">
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
    </div>
    <div class="world">
      <div class="forward">
        <div class="box">
          <div class="wall"></div>
          <div class="wall"></div>
          <div class="wall"></div>
          <div class="wall"></div>
          <div class="wall"></div>
          <div class="wall"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="NotFound">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const Router = useRouter()

const totalTime = ref(-550)
const clearInte = ref(false)
const restTime = ref(10)

const fnSetInterval = () => {
  let clock = window.setInterval(() => {
    totalTime.value = totalTime.value + 55
    restTime.value = Math.abs(totalTime.value) / 55
    clearInte.value && window.clearInterval(clock)
    if (totalTime.value >= -55) {
      window.clearInterval(clock)
      setTimeout(() => {
        if (clearInte.value) {
          return false
        }
        Router.push('/')
      }, 0.5e3)
    }
  }, 1000)
}

onBeforeUnmount(() => {
  clearInte.value = true
})

onMounted(() => {
  fnSetInterval()
})
</script>

<style lang="less" scoped>
.box-404 {
  background: #000;
  position: fixed;
  z-index: 20;
  width: 100%;
  height: calc(100vh - 162px);
  overflow: hidden;
  display: flex;
  font-family: 'Anton', sans-serif;
  justify-content: center;
  align-items: center;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  cursor: default;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

.box-404 div {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.rail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-transform: rotateX(-30deg) rotateY(-30deg);
  transform: rotateX(-30deg) rotateY(-30deg);
}

.rail .stamp {
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #141414;
  color: #fff;
  font-size: 7rem;
}

.rail .stamp:nth-child(1) {
  -webkit-animation: stampSlide 40000ms -2300ms linear infinite;
  animation: stampSlide 40000ms -2300ms linear infinite;
}

.rail .stamp:nth-child(2) {
  -webkit-animation: stampSlide 40000ms -4300ms linear infinite;
  animation: stampSlide 40000ms -4300ms linear infinite;
}

.rail .stamp:nth-child(3) {
  -webkit-animation: stampSlide 40000ms -6300ms linear infinite;
  animation: stampSlide 40000ms -6300ms linear infinite;
}

.rail .stamp:nth-child(4) {
  -webkit-animation: stampSlide 40000ms -8300ms linear infinite;
  animation: stampSlide 40000ms -8300ms linear infinite;
}

.rail .stamp:nth-child(5) {
  -webkit-animation: stampSlide 40000ms -10300ms linear infinite;
  animation: stampSlide 40000ms -10300ms linear infinite;
}

.rail .stamp:nth-child(6) {
  -webkit-animation: stampSlide 40000ms -12300ms linear infinite;
  animation: stampSlide 40000ms -12300ms linear infinite;
}

.rail .stamp:nth-child(7) {
  -webkit-animation: stampSlide 40000ms -14300ms linear infinite;
  animation: stampSlide 40000ms -14300ms linear infinite;
}

.rail .stamp:nth-child(8) {
  -webkit-animation: stampSlide 40000ms -16300ms linear infinite;
  animation: stampSlide 40000ms -16300ms linear infinite;
}

.rail .stamp:nth-child(9) {
  -webkit-animation: stampSlide 40000ms -18300ms linear infinite;
  animation: stampSlide 40000ms -18300ms linear infinite;
}

.rail .stamp:nth-child(10) {
  -webkit-animation: stampSlide 40000ms -20300ms linear infinite;
  animation: stampSlide 40000ms -20300ms linear infinite;
}

.rail .stamp:nth-child(11) {
  -webkit-animation: stampSlide 40000ms -22300ms linear infinite;
  animation: stampSlide 40000ms -22300ms linear infinite;
}

.rail .stamp:nth-child(12) {
  -webkit-animation: stampSlide 40000ms -24300ms linear infinite;
  animation: stampSlide 40000ms -24300ms linear infinite;
}

.rail .stamp:nth-child(13) {
  -webkit-animation: stampSlide 40000ms -26300ms linear infinite;
  animation: stampSlide 40000ms -26300ms linear infinite;
}

.rail .stamp:nth-child(14) {
  -webkit-animation: stampSlide 40000ms -28300ms linear infinite;
  animation: stampSlide 40000ms -28300ms linear infinite;
}

.rail .stamp:nth-child(15) {
  -webkit-animation: stampSlide 40000ms -30300ms linear infinite;
  animation: stampSlide 40000ms -30300ms linear infinite;
}

.rail .stamp:nth-child(16) {
  -webkit-animation: stampSlide 40000ms -32300ms linear infinite;
  animation: stampSlide 40000ms -32300ms linear infinite;
}

.rail .stamp:nth-child(17) {
  -webkit-animation: stampSlide 40000ms -34300ms linear infinite;
  animation: stampSlide 40000ms -34300ms linear infinite;
}

.rail .stamp:nth-child(18) {
  -webkit-animation: stampSlide 40000ms -36300ms linear infinite;
  animation: stampSlide 40000ms -36300ms linear infinite;
}

.rail .stamp:nth-child(19) {
  -webkit-animation: stampSlide 40000ms -38300ms linear infinite;
  animation: stampSlide 40000ms -38300ms linear infinite;
}

.rail .stamp:nth-child(20) {
  -webkit-animation: stampSlide 40000ms -40300ms linear infinite;
  animation: stampSlide 40000ms -40300ms linear infinite;
}

@-webkit-keyframes stampSlide {
  0% {
    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(130px);
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(130px);
  }

  100% {
    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(-3870px);
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(-3870px);
  }
}

@keyframes stampSlide {
  0% {
    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(130px);
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(130px);
  }

  100% {
    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(-3870px);
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
      translateY(-3870px);
  }
}

.world {
  -webkit-transform: rotateX(-30deg) rotateY(-30deg);
  transform: rotateX(-30deg) rotateY(-30deg);
}

.world .forward {
  position: absolute;
  -webkit-animation: slide 2000ms linear infinite;
  animation: slide 2000ms linear infinite;
}

.world .box {
  width: 200px;
  height: 200px;
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
  -webkit-animation: roll 2000ms cubic-bezier(1, 0.01, 1, 1) infinite;
  animation: roll 2000ms cubic-bezier(1, 0.01, 1, 1) infinite;
}

.world .box .wall {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid #fafafa;
  box-sizing: border-box;
}

.world .box .wall::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 7rem;
}

.world .box .wall:nth-child(1) {
  -webkit-transform: translateZ(100px);
  transform: translateZ(100px);
}

.world .box .wall:nth-child(2) {
  -webkit-transform: rotateX(180deg) translateZ(100px);
  transform: rotateX(180deg) translateZ(100px);
}

.world .box .wall:nth-child(3) {
  -webkit-transform: rotateX(90deg) translateZ(100px);
  transform: rotateX(90deg) translateZ(100px);
}

.world .box .wall:nth-child(3)::before {
  -webkit-transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);
  transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms -2000ms linear infinite;
  animation: zeroFour 4000ms -2000ms linear infinite;
}

.world .box .wall:nth-child(4) {
  -webkit-transform: rotateX(-90deg) translateZ(100px);
  transform: rotateX(-90deg) translateZ(100px);
}

.world .box .wall:nth-child(4)::before {
  -webkit-transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);
  transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms -2000ms linear infinite;
  animation: zeroFour 4000ms -2000ms linear infinite;
}

.world .box .wall:nth-child(5) {
  -webkit-transform: rotateY(90deg) translateZ(100px);
  transform: rotateY(90deg) translateZ(100px);
}

.world .box .wall:nth-child(5)::before {
  -webkit-transform: rotateX(180deg) translateZ(-1px);
  transform: rotateX(180deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms linear infinite;
  animation: zeroFour 4000ms linear infinite;
}

.world .box .wall:nth-child(6) {
  -webkit-transform: rotateY(-90deg) translateZ(100px);
  transform: rotateY(-90deg) translateZ(100px);
}

.world .box .wall:nth-child(6)::before {
  -webkit-transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);
  transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms linear infinite;
  animation: zeroFour 4000ms linear infinite;
}

@-webkit-keyframes zeroFour {
  0% {
    content: '4';
  }

  100% {
    content: '0';
  }
}

@keyframes zeroFour {
  0% {
    content: '4';
  }

  100% {
    content: '0';
  }
}

@-webkit-keyframes roll {
  0% {
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }

  85% {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  87% {
    -webkit-transform: rotateZ(88deg);
    transform: rotateZ(88deg);
  }

  90% {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  100% {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }
}

@keyframes roll {
  0% {
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }

  85% {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  87% {
    -webkit-transform: rotateZ(88deg);
    transform: rotateZ(88deg);
  }

  90% {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  100% {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }
}

@-webkit-keyframes slide {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  100% {
    -webkit-transform: translateX(-200px);
    transform: translateX(-200px);
  }
}

@keyframes slide {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  100% {
    -webkit-transform: translateX(-200px);
    transform: translateX(-200px);
  }
}

.erro404 {
  display: block;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-45%);
  z-index: 9999;
}

.erro404 img {
  float: left;
  margin: 95px 0 0 70px;
}

.erro404 h3,
.erro404 span,
.erro404 label,
.erro404 p,
.erro404 .link404 {
  display: block;
  margin: 0 0 0 670px;
}

.link404 b {
  display: block;
}

.erro404 h3 {
  padding: 55px 0 0;
  line-height: 85px;
  font-size: 60px;
}

.erro404 span {
  line-height: 45px;
  font-size: 30px;
}

.erro404 label {
  color: #666;
  font-weight: normal;
  padding: 10px 0 25px;
  font-size: 16px;
  line-height: 25px;
}

.erro404 p {
  font-size: 20px;
  line-height: 30px;
  padding: 0 0 10px;
}

.erro404 a {
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: #3dbcc6;
}

.erro404 label a {
  font-size: 16px;
}

.erro404 a:hover {
  text-decoration: underline;
}

.wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  position: fixed;
  z-index: 1000;
  // border: 2px solid red;
  color: rgba(255, 255, 255, 0.5);

  .content_box {
    overflow: hidden;
    font-weight: bold;
    margin: auto;
    padding: 10px;
    // border: 2px solid yellow;
    display: flex;

    p {
      font-size: 20px;
      margin: 35px 20px 0;

      &:first-child {
        margin-left: 0;
      }

      a {
        font-family: 'ASB';
        color: #3dbcc6;
        cursor: pointer;
      }
    }
  }

  #counter_num {
    width: 54px;
    height: 59px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-family: 'LT';
    font-size: 26px;
    background-color: #222;
  }
}
</style>
