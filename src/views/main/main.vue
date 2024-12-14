<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 菜单 -->
      <el-aside :width="isCollapse ? '240px' : '60px'">
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <!-- 内容 -->
      <el-container class="page">
        <el-header class="page-header">
          <nav-header />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view v-slot="props">
              <keep-alive>
                <component :is="props.Component"></component>
              </keep-alive>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { NavMenu } from '../../components/nav-menu'
import { NavHeader } from '../../components/nav-header'
import { ref } from 'vue'
const isCollapse = ref(true)
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  position: fixed;
  top: 0;
  left: 0;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
  background-color: #f9f9f9;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f9f9f9;
}
</style>
