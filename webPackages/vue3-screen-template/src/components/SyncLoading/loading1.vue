<template>
  <div class="loading">
    <div class="loading-wrap">
      <div class="loading-cube"></div>
      <div class="loading-cube"></div>
      <div class="loading-cube"></div>
      <div class="loading-cube"></div>
    </div>
    <div class="loading-content">正在加载中</div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading div {
  display: inline-block;
  text-align: left;
}

.loading-content {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.loading-wrap {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 7em;
  height: 7em;
  margin-top: 20px;
  transform: rotateX(45deg) rotate(45deg);
  transform-style: preserve-3d;
}

@keyframes anim {
  50% {
    transform: translateZ(0.5em);
  }
}

.loading-cube,
.loading-cube:after,
.loading-cube:before {
  content: '';
  display: inline-block;
  position: absolute;
  height: 3em;
  width: 3em;
}

.loading-cube {
  position: relative;
  background-color: #005cf9;
  transform: translateZ(3em);
  transform-style: preserve-3d;
  animation: anim 1s infinite;
  transition: 0.25s;
}

.loading-cube::after {
  background-color: #004dbc;
  transform: rotateX(-90deg) translateY(3em);
  transform-origin: 100% 100%;
}

.loading-cube::before {
  background-color: #003ca7;
  transform: rotateY(90deg) translateX(3em);
  transform-origin: 100% 0;
}

.loading-cube:nth-child(1) {
  animation-delay: 0.05s;
}

.loading-cube:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-cube:nth-child(3) {
  animation-delay: 0.15s;
}

.loading-cube:nth-child(4) {
  animation-delay: 0.2s;
}
</style>
