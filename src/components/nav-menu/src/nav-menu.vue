<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/main/car.png" alt="" />
      <span v-if="isCollapse" class="title">车迹通</span>
    </div>
    <!-- 菜单 -->
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical" 
      background-color="#f9f9f9"
      text-color="#666"
      active-text-color="#4892fe"
      :collapse="!isCollapse"
      unique-opened
      @select="menuSelect"
    >
      <template v-for="item in menus" :key="item.id">
        <!-- 有二级菜单 -->
        <template v-if="!item.isLeaf">
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单 -->
            <template #title>
              <component :class="item.icon" :is="item.icon"></component>
              <span>{{ item.displayName }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="menuClick(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.displayName }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 没有二级菜单 -->
        <template v-if="item.isLeaf">
          <el-menu-item :index="item.id + ''" @click="menuClick(item)">
            <div class="icon">
              <component :class="item.icon" :is="item.icon"></component>
            </div>
            <span>{{ item.displayName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
const store = useStore()

const defaultActive = ref('1')
const activeIndex = localCache.cacheGet('activeMenu')
if (activeIndex) {
  defaultActive.value = activeIndex
}

const menus = computed(() => {
  return store.state.login.userMenus
})

const menuClick = (menu) => {
  router.push(menu.url || '/not-found')
}

// 保存menu的defaultActive
const menuSelect = (event) => {
  localCache.cacheSet('activeMenu', event)
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #f9f9f9;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);

  .logo {
    display: flex;
    height: 32px;
    padding: 12px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      letter-spacing: 1px;
    }
  }

  .el-menu {
    border-right: none;
    background: #f9f9f9;

    .el-menu-item {
      height: 50px;
      line-height: 50px;
      margin: 4px 8px;
      border-radius: 4px;
      color: #666;
      transition: all 0.3s;

      .icon {
        display: flex;
        padding: 6px;
        transition: all 0.3s;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .el-submenu {
    .el-menu-item {
      padding-left: 45px !important;
      background-color: #f9f9f9 !important;
      margin: 2px 8px;
    }
  }

  :deep(.el-sub-menu__title) {
    height: 50px;
    line-height: 50px;
    margin: 4px 8px;
    border-radius: 4px;
    color: #666;

    &:hover {
      background-color: #fff !important;
    }

    svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  .el-menu-item:hover {
    color: #4892fe !important;
    background-color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #4892fe !important;
    background-color: #fff !important;
    font-weight: 500;

    .icon {
      background-color: #4892fe;
      border-radius: 4px;
      margin-right: 8px;
      color: #fff;
    }
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 57px);
  padding: 8px 0;
}
</style>
