<template>
  <div class="loading">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loading[data-v-705baa5f] {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 700px;
  min-height: 150px;
}

.loader[data-v-705baa5f] {
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
  width: 2.5em;
  /* height:2.5em; */
  /* transform:rotate(165deg); */
}

.loader[data-v-705baa5f]:before,
.loader[data-v-705baa5f]:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}

.loader[data-v-705baa5f]:before {
  animation: before-ani-705baa5f 2s infinite;
}

.loader[data-v-705baa5f]:after {
  animation: after-ani-705baa5f 2s infinite;
}

@keyframes before-ani-705baa5f {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em #e11462bf, -1em 0.5em #6fcadcbf;
  }

  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em #e11462bf, 0 0.5em #6fcadcbf;
  }

  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em #e11462bf, 1em 0.5em #6fcadcbf;
  }

  to {
    box-shadow: 1em -0.5em #e11462bf, -1em 0.5em #6fcadcbf;
  }
}

@keyframes after-ani-705baa5f {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em #3db88fbf, -0.5em -1em #e9a920bf;
  }

  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 #3db88fbf, -0.5em 0 #e9a920bf;
  }

  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em #3db88fbf, -0.5em 1em #e9a920bf;
  }

  to {
    box-shadow: 0.5em 1em #3db88fbf, -0.5em -1em #e9a920bf;
  }
}
</style>
