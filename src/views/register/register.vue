<template>
  <div class="register">
    <div class="register-bg"></div>
    <register-content></register-content>
  </div>
</template>

<script setup>
import RegisterContent from './register-content.vue'
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login/login_bg.png');

  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;

  .register-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(58, 98, 215, 0.5);
  }
}
</style>
