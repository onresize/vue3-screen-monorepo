<script setup></script>

<template>
  <button>
    <slot> </slot>
  </button>
</template>

<style scoped>
button {
  border: 2px solid red;
  color: #000;
}

button:active {
  border: 2px solid red;
}
</style>
