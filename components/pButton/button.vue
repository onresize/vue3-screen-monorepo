<script setup></script>

<template>
  <div>
    <slot> </slot>
  </div>
</template>

<style scoped>
div {
  border: 2px solid red;
  padding: 10px;
  color: #000;
  cursor: pointer;
  user-select: none;
}

div:active {
  border: 2px solid red;
  background: gray;
}
</style>
