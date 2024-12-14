<template>
  <div class="login">
    <div class="login-bg"></div>
    <login-content></login-content>
  </div>
</template>

<script setup>
import LoginContent from './login-content.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login/login_bg.png');

  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;

  .login-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(82, 100, 155, 0.5);
  }
}

</style>
