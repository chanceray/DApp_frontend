<template>
  <div class="login-content">
    <div class="title">
      <div class="name">二手车信息溯源系统</div>
      <div class="img">
        <img src="../../assets/img/login/login_left.png" alt="" />
      </div>
    </div>
    <div class="login-account">
      <div class="content">
        <div class="welcome">
          <div class="text">欢迎登录</div>
        </div>
        <el-form
          ref="formRef"
          :model="account"
          :rules="rules"
          label-width="0"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="" prop="usertype">
            <el-select style="width: 100%" v-model="account.usertype" placeholder="请选择用户角色">
              <template v-for="(item, index) in roles" :key="index">
                <el-option :label="item.name" :value="item.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="account">
            <el-input v-model="account.account" placeholder="请输入账号" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="account.password"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
        </el-form>
        <div class="no-account">
          <div class="remember-password">
            <el-checkbox v-model="isRemember" label="记住密码" size="large" />
          </div>
          <div class="login-btn" @click="handleLogin">登录</div>
          <div class="login-btn" @click="handleRegister">注册</div>
          <div class="forget-password">忘记密码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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
.login-content {
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  .title {
    font-size: 30px;
    text-align: center;
    color: #fff;
    background-color: rgba(58, 98, 215, 0.9);
    padding: 120px 30px;

    .name {
      position: relative;
      bottom: -50px;
    }

    .img {
      position: relative;
      bottom: -50px;
    }
  }

  .login-account {
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
      margin-bottom: 30px;
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
          background-color: #3a62d7;
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
        background-color: #3a62d7;
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
        color: #3a62d7;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
    }
  }

  :deep(.el-icon.el-input__icon) {
    color: #3a62d7 !important;
  }
}
</style>
