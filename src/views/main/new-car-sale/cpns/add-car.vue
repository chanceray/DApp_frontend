<template>
  <div class="add-car">
    <div class="btn">
      <h4>车辆上链</h4>
    </div>
    <el-form :model="addForm" ref="formRef" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车架号" style="width: 60%" prop="CarId">
            <el-input v-model="addForm.CarId" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆名称" style="width: 60%" prop="CarName">
            <el-input v-model="addForm.CarName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆品牌" style="width: 60%" prop="CarBrand">
            <el-input v-model="addForm.CarBrand" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车型级别" style="width: 60%" prop="CarClass">
            <el-input v-model="addForm.CarClass" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否国产" style="width: 60%" prop="Domestic">
            <el-radio-group v-model="addForm.Domestic">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发动机型号" style="width: 60%" prop="Engin">
            <el-input v-model="addForm.Engin" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出厂日期" style="width: 60%" prop="exDate">
            <el-date-picker
              v-model="addForm.exDate"
              type="date"
              placeholder="出厂日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂商指导价" style="width: 60%" prop="GuidePrice">
            <el-input v-model="addForm.GuidePrice" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="制造商" style="width: 60%" prop="manufacture">
            <el-input v-model="addForm.manufacture" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出厂照片" style="width: 60%">
            <el-upload
              accept="image/jpg,image/png"
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :http-request="imageUpload"
            >
              <div class="upload-img">
                <img v-if="imgSrc" :src="imgSrc" alt="" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="btn">
            <el-button color="#0052d9" :icon="Plus" @click="submit">车辆上链</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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
</script>

<style lang="less" scoped>
.add-car {
  margin-bottom: 20px;
  text-align: left;
  .btn {
    display: flex;
    padding-left: 40px;
    margin-bottom: 20px;
  }

  .upload-img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: 1px solid #b0b1b1;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #b0b1b1;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
}
</style>
