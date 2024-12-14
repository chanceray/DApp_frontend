<template>
  <div class="car-lock">
    <template v-for="(item, index) in carDatas" :key="index">
      <div class="car-item">
        <div class="item-content">
          <div class="infos">
            <div class="icon">
              <img src="../../../../assets/img/main/plane.png" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.CarName }}</div>
              <div class="mode">型号：{{ item.Engin }}</div>
            </div>
          </div>
          <div class="detail">
            <div class="show-detail" @click="detail(item)">查看详情</div>
            <div class="time">期望价格：{{ item.GuidePrice }}</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 图片弹窗 -->
    <img-dia ref="imgDiaRef"></img-dia>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ImgDia } from './index'
const imgDiaRef = ref(null)

const store = useStore()
const carDatas = computed(() => {
  return store.state.carIndex.allCars
})

const detail = (data) => {
  imgDiaRef.value.show(data)
}
</script>

<style lang="less" scoped>
.car-lock {
  text-align: left;
  flex: 1;
  width: 100%;
  overflow: auto;

  .car-item {
    width: 33%;
    height: 160px;
    display: inline-block;

    .item-content {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      padding: 30px;
      box-sizing: border-box;
      border: 1px solid #f2f2f2;
      .infos {
        display: flex;
        margin-bottom: 50px;
        .icon {
          width: 30px;
          height: 30px;
          background-color: #a894f6;
          border-radius: 50%;
          margin-right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 70%;
            height: 70%;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .name {
            color: #25a5ff;
            margin-bottom: 10px;
          }

          .mode {
            color: #87888a;
          }
        }
      }
      .detail {
        display: flex;
        justify-content: space-between;

        .show-detail {
          color: #3371a8;
          cursor: pointer;
        }

        .time {
          color: #c1c3cf;
        }
      }
    }
  }
}
</style>
