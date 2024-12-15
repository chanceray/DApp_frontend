<template>
  <div class="login-card">
    <div class="card-header">
      <img src="@/assets/img/logo.png" alt="Logo" class="logo" />
    <h1 class="title">车迹通</h1>
    <p class="tagline">极速追踪，掌控未来</p>
    </div>
    <el-form
      ref="formRef"
      :model="account"
      :rules="rules"
      class="login-form"
      label-width="0"
      status-icon
    >
      <!-- 用户角色选择 -->
      <RoleSelector
      v-model="account.usertype"
      />

      <!-- 账号输入框 -->
      <el-form-item prop="account">
        <el-input
          v-model="account.account"
          placeholder="请输入账号"
          :prefix-icon="User"
          class="input-with-icon"
        >
          <template #suffix>
            <el-tooltip content="请输入您的账号" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <el-input
          v-model="account.password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          show-password
          class="input-with-icon"
        >
          <template #suffix>
            <el-tooltip content="密码至少包含6位字符" placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>

      <!-- 记住密码和忘记密码 -->
      <div class="form-options">
        <el-checkbox v-model="isRemember" size="large" class="checkbox">
          记住密码
        </el-checkbox>
        <a href="#" class="forget-password" @click="handleForgotPassword">
          忘记密码？
        </a>
      </div>

      <!-- 按钮 -->
      <div class="form-buttons">
        <el-button
          type="primary"
          size="large"
          class="login-button"
          @click="handleLogin"
        >
          登录
        </el-button>
        <el-button
          type="success"
          size="large"
          class="register-button"
          @click="handleRegister"
        >
          注册
        </el-button>
      </div>
    </el-form>
  </div>
</template>


<script setup>
import RoleSelector from '@/components/RoleSelector.vue'
import { ref, reactive, computed } from 'vue';
import { rules } from './config/login.config'
import { useStore } from 'vuex'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const formRef = ref(null)
const isRemember = ref(false)
const account = reactive({
  usertype: '1',
  account: 'vgri',
  password: '123456'
})
const roles = ref([
  { name: '消费者', value: '1' },
  { name: '生产厂家', value: '2' },
  { name: '二手车销售商', value: '3' },
  { name: '监管部门', value: '4' }
])

const handleLogin = () => {
  // 表单验证
  formRef.value.validate((valid) => {
    if (valid) {
      // 表单验证成功，进行登录操作
      store.dispatch('login/loginAccountAction', { ...account })
    }
  })
}

const handleRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

/* 背景动画 */
body {
  background: linear-gradient(to right, #ffe259, #ffa751); /* 黄色渐变 */
  animation: moveBg 5s linear infinite;
}

@keyframes moveBg {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* 登录卡片样式 */

/* logo 样式 */
.logo {
  width: 150px; /* 控制 logo 大小 */
  height: 150px; /* 控制 logo 高度 */
  border-radius: 50%; /* 圆形边框 */
  border: 5px solid white; /* 添加白色边框 */
  box-shadow: 0 0 15px 5px rgba(255, 165, 0, 0.8); /* 黄色阴影发光效果 */
  margin-bottom: 20px; /* 与文字的间距 */
  transition: transform 0.3s ease-in-out; /* 动态效果 */
}

/* logo 悬停放大 */
.logo:hover {
  transform: scale(1.1); /* 放大效果 */
}

/* 标题样式 */
.title {
  font-size: 2rem;
  color: rgb(222, 148, 22);
  margin-bottom: 10px;
  text-align: center;
}

/* 副标题样式 */
.tagline {
  font-size: 1rem;
  color: #fff;
  text-align: center;
  opacity: 0.9;
}

/* 背景动画 */
@keyframes moveBg {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  text-align: center;
  animation: fadeIn 1s ease-out;
}


/* 按钮样式 */
.login-button {
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.8), rgba(255, 140, 0, 0.9));
  color: #fff;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
  }
}

.register-button {
  background: linear-gradient(135deg, rgba(255, 198, 88, 0.8), rgba(255, 165, 0, 0.8));
  color: #fff;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
  }
}

/* 动态车轮样式 */
.wheel-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.wheel {
  position: absolute;
  width: 60px;
  height: 60px;
  transform-origin: center center;
  animation: rotate 0.5s linear infinite;
}

.wheel-icon {
  font-size: 60px;
  color: #ffa751;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>