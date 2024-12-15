<template>
  <div class="add-car">
    <!-- 表单内容 -->
    <el-form :model="addForm" ref="formRef" :rules="rules" label-width="100px" class="form-content">
      <div class="form-layout">
        <!-- 左侧表单区域 -->
        <div class="form-left">
          <!-- 基本信息 -->
          <div class="form-group">
            <div class="group-title">
              <el-icon><InfoFilled /></el-icon>
              <span>基本信息</span>
            </div>
            <div class="group-content">
              <el-form-item label="车架号" prop="CarId">
                <el-input v-model="addForm.CarId" placeholder="请输入车架号" />
              </el-form-item>
              <el-form-item label="车辆名称" prop="CarName">
                <el-input v-model="addForm.CarName" placeholder="请输入车辆名称" />
              </el-form-item>
              <el-form-item label="车辆品牌" prop="CarBrand">
                <el-input v-model="addForm.CarBrand" placeholder="请输入车辆品牌" />
              </el-form-item>
              <el-form-item label="车型级别" prop="CarClass">
                <el-input v-model="addForm.CarClass" placeholder="请输入车型级别" />
              </el-form-item>
            </div>
          </div>

          <!-- 详细配置 -->
          <div class="form-group">
            <div class="group-title">
              <el-icon><Setting /></el-icon>
              <span>详细配置</span>
            </div>
            <div class="group-content">
              <el-form-item label="发动机型号" prop="Engin">
                <el-input v-model="addForm.Engin" placeholder="请输入发动机型号" />
              </el-form-item>
              <el-form-item label="制造商" prop="manufacture">
                <el-input v-model="addForm.manufacture" placeholder="请输入制造商" />
              </el-form-item>
              <el-form-item label="是否国产" prop="Domestic">
                <el-radio-group v-model="addForm.Domestic">
                  <el-radio label="是">国产</el-radio>
                  <el-radio label="否">进口</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 右侧表单区域 -->
        <div class="form-right">
          <!-- 销售信息 -->
          <div class="form-group">
            <div class="group-title">
              <el-icon><Goods /></el-icon>
              <span>销售信息</span>
            </div>
            <div class="group-content">
              <el-form-item label="出厂日期" prop="exDate">
                <el-date-picker
                  v-model="addForm.exDate"
                  type="date"
                  placeholder="选择出厂日期"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="指导价格" prop="GuidePrice">
                <el-input v-model="addForm.GuidePrice" placeholder="请输入厂商指导价">
                  <template #append>元</template>
                </el-input>
              </el-form-item>
            </div>
          </div>

          <!-- 车辆图片 -->
          <div class="form-group">
            <div class="group-title">
              <el-icon><Picture /></el-icon>
              <span>车辆图片</span>
            </div>
            <div class="group-content upload-content">
              <el-upload
                accept="image/jpg,image/png"
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeUpload"
                :http-request="imageUpload"
              >
                <div class="upload-img" :class="{ 'has-image': imgSrc }">
                  <img v-if="imgSrc" :src="imgSrc" alt="" />
                  <div v-else class="upload-placeholder">
                    <el-icon class="upload-icon"><Plus /></el-icon>
                    <span>点击上传图片</span>
                    <span class="upload-tip">支持 JPG/PNG 格式</span>
                  </div>
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </el-form>

    <!-- 底部操作栏 -->
    <div class="form-footer">
      <el-button size="large" @click="handleReset">重置表单</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, CarFilled, InfoFilled, Setting, Goods, Picture } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { rules } from '../config/add.config'
import { useStore } from 'vuex'
import moment from 'moment'

const store = useStore()
const formRef = ref(null)
const imgSrc = ref('')
const addForm = ref({
  CarId: '',
  CarBrand: '',
  CarName: '',
  CarClass: '',
  Domestic: '',
  Engin: '',
  exDate: '',
  ExDate: '',
  GuidePrice: '',
  manufacture: ''
})

const submit = () => {
  if (!imgSrc.value) {
    ElMessage({
      message: '请上传图片',
      type: 'error'
    })
    return
  }

  formRef.value.validate((valid) => {
    if (valid) {
      addForm.value.ExDate = moment(addForm.value.exDate).format('YYYY年MM月DD日')
      store.dispatch('newCarSale/uploadNewCarAction', addForm.value).then(() => {
        imgSrc.value = ''
        addForm.value = {
          CarId: '',
          CarBrand: '',
          CarName: '',
          CarClass: '',
          Domestic: '',
          Engin: '',
          ExDate: '',
          GuidePrice: '',
          manufacture: ''
        }
      })
    }
  })
}

const beforeUpload = () => {
  if (!addForm.value.CarId) {
    ElMessage({
      message: '请先填写车辆信息',
      type: 'error'
    })
    return false
  }
}

// 上传图片
const imageUpload = async (params) => {
  let fd = new FormData()
  fd.append('upload', params.file)
  fd.append('carId', addForm.value.CarId)
  store.dispatch('newCarSale/uploadCarPictureAction', fd).then((res) => {
    imgSrc.value = `http://118.25.195.230:8000/GetImage?imageName=${res.data}`
  })
}

// 修改重置表单方法
const handleReset = () => {
  ElMessageBox.confirm('确认重置所有表单内容？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    formRef.value?.resetFields()
    imgSrc.value = ''
    ElMessage({
      type: 'success',
      message: '重置成功'
    })
  }).catch(() => {})
}
</script>

<style lang="less" scoped>
.add-car {
  padding: 20px;

  .form-layout {
    display: flex;
    gap: 24px;

    .form-left,
    .form-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-group {
      background: #fff9f0;
      border-radius: 8px;
      border: 1px solid #ffd591;
      overflow: hidden;

      .group-title {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid #ffd591;
        background: #fff4e6;

        .el-icon {
          font-size: 16px;
          color: #ffa940;
        }

        span {
          font-size: 14px;
          font-weight: 500;
          color: #1f2329;
        }
      }

      .group-content {
        padding: 20px;

        &.upload-content {
          display: flex;
          justify-content: center;
        }
      }
    }
  }

  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 20px;
      
      &:last-child {
        margin-bottom: 0;
      }

      .el-form-item__label {
        color: #666;
        font-weight: 500;
      }

      .el-input__wrapper {
        background: white;
        border: 1px solid #ffd591;
        box-shadow: none;
        transition: all 0.3s ease;

        &:hover {
          border-color: #ffa940;
        }

        &.is-focus {
          border-color: #ffa940;
          box-shadow: 0 0 0 1px #ffa940;
        }
      }
    }

    .el-radio-group {
      .el-radio__input.is-checked {
        .el-radio__inner {
          background: #ffa940;
          border-color: #ffa940;
        }
      }

      .el-radio__input.is-checked + .el-radio__label {
        color: #ffa940;
      }
    }
  }

  .upload-img {
    width: 200px;
    height: 200px;
    border: 2px dashed #ffd591;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border-color: #ffa940;
      background: #fff9f0;
    }

    &.has-image {
      border-style: solid;
      border-color: #ffa940;
      box-shadow: 0 4px 12px rgba(250, 140, 22, 0.1);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .upload-placeholder {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;

      .upload-icon {
        font-size: 32px;
        color: #ffa940;
        margin-bottom: 12px;
      }

      span {
        font-size: 14px;
        
        &.upload-tip {
          margin-top: 8px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .form-footer {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #ffd591;

    .el-button {
      min-width: 120px;
    }
  }
}
</style>
