<template>
  <div class="page-title">
    {{ title }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
</script>

<style lang="less" scoped>
.page-title {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  margin-bottom: 10px;
}
</style>
