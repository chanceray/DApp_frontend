<template>
  <div class="register-content">
    <div class="title">
      <div class="name">二手车信息溯源系统</div>
      <div class="img">
        <img src="../../assets/img/login/login_left.png" alt="" />
      </div>
    </div>
    <div class="register-account">
      <div class="content">
        <div class="welcome">
          <div class="text">信息注册</div>
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
        <div class="no-account">
          <div class="login-btn" @click="handleRegister">注册</div>
          <div class="login-btn" @click="handleLogin">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
.register-content {
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
