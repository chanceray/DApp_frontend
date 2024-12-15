
<template>
  <div class="register">
    <div class="animated-background">
      <div 
        v-for="n in 12" 
        :key="n" 
        class="floating-element"
        :style="getRandomStyle()"
      ></div>
    </div>
    <login-content></login-content>
  </div>
</template>

<script setup>
import LoginContent from './login-content.vue'
import { ref, onMounted } from 'vue'

const getRandomStyle = () => {
  const isCircle = Math.random() > 0.5
  const size = 40 + Math.random() * 160
  const left = Math.random() * 90 // 0-90%
  const top = Math.random() * 90  // 0-90%
  const delay = -(Math.random() * 20) // 随机延迟
  const duration = 15 + Math.random() * 10 // 随机动画时长
  const opacity = 0.05 + Math.random() * 0.1 // 随机透明度

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    borderRadius: isCircle ? '50%' : '15px',
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity,
    transform: isCircle ? 'none' : 'rotate(45deg)'
  }
}
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fff5e6, #fff);
  position: relative;
  overflow: hidden;
}

.animated-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.floating-element {
  position: absolute;
  background: rgba(255, 165, 0, 0.1);
  animation: floatAndFade infinite ease-in-out;
}

@keyframes floatAndFade {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    transform: translate(100px, 100px) scale(1.2);
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
}

// 确保内容在动画上层
register-content {
  position: relative;
  z-index: 1;
}
</style>

