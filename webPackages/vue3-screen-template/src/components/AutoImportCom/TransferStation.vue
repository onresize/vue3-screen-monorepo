<script setup>
const route = useRoute()
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
)
</script>

<template>
  <router-view :key="key" />
</template>

<style></style>
