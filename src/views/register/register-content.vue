<template>
  <div class="register-content">

      <div class="register-card ">
        <h1 class="title">信息注册</h1>
        <el-form
          ref="formRef"
          :model="account"
          :rules="rules"
          label-width="0"
          class="demo-ruleForm"
          status-icon
        >
        <RoleSelector
        v-model="account.usertype"
        />
          <el-form-item label="" prop="account">
            <el-input v-model="account.account" placeholder="请输入用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-input v-model="account.name" placeholder="请输姓名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="account.password"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item label="" prop="phone">
            <el-input v-model="account.phone" placeholder="请输入手机号" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="address">
            <el-input v-model="account.address" placeholder="请输入地址" :prefix-icon="Lock" />
          </el-form-item>
          <el-form-item label="" prop="mail">
            <el-input v-model="account.mail" placeholder="请输入邮箱" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="Identity">
            <el-input v-model="account.Identity" placeholder="请输入身份证号" :prefix-icon="User" />
          </el-form-item>
        </el-form>
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
      </div>

  </div>
</template>

<script setup>
import RoleSelector from '@/components/RoleSelector.vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { rules } from './config/register.config'
import { register } from '../../service/register/register'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const account = reactive({
  account: '',
  name: '',
  password: '',
  phone: '',
  address: '',
  mail: '',
  Identity: '',
  usertype: ''
})
const formRef = ref(null)
const roles = ref([
  { name: '消费者', value: '1' },
  { name: '生产厂家', value: '2' },
  { name: '二手车销售商', value: '3' },
  { name: '监管部门', value: '4' }
])

const handleRegister = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      register(account)
      ElMessage({
        message: '操作成功',
        type: 'success'
      })
      router.push('/login')
    }
  })
}

const handleLogin = () => {
  router.push('login')
}
</script>

<style lang="less" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
.register-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.2);
  padding: 2rem;
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.register-content {
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;



  .register-account {
    width: 400px;
    padding: 100px 100px;
    position: relative;
    
    .content {
      width: 400px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .welcome {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 20px;
      position: relative;
      display: flex;
      justify-content: center;

      .text {
        position: relative;
        &::after {
          content: '';
          display: inline-block;
          width: 100%;
          height: 2px;
          background-color: rgba(255, 165, 0, 0.8);
          position: absolute;
          left: 0;
          bottom: -4px;
        }
      }
    }

    .no-account {
      width: 100%;
      .login-btn {
        color: #fff;
        width: 100%;
        padding: 10px 0;
        background-color: rgba(255, 165, 0, 0.8);
        border-radius: 2px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }

      .forget-password {
        font-weight: bold;
        font-size: 14px;
        width: 100%;
        color: rgba(255, 165, 0, 0.8);
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
    }
  }

  :deep(.el-icon.el-input__icon) {
    color: rgba(255, 165, 0, 0.8) !important;
  }
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
.title {
  font-size: 2rem;
  color: rgb(222, 148, 22);
  margin-bottom: 10px;
  text-align: center;
}
</style>