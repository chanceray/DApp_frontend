<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/main/car.png" alt="" />
      <span v-if="isCollapse" class="title">二手车信息溯源系统</span>
    </div>
    <!-- 菜单 -->
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
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
              <span>{{ item.displayName }}11</span>
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

  .logo {
    display: flex;
    height: 28px;
    padding: 8px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    // margin-bottom: 30px;

    .img {
      height: 100%;
      margin: 0px 10px;
      margin-left: 10px;
    }

    .title {
      // font-size: 30px;
      font-weight: bold;
    }
  }

  .el-menu {
    border-right: none;
    background: #f9f9f9;

    .el-menu-item {
      border-radius: 9px !important;
      color: #969b9f;

      .icon {
        display: flex;
        padding: 6px;
      }

      // 修改菜单图标大小
      svg {
        width: 17px;
        height: 17px;
      }
    }
  }

  // 目录
  .el-submenu {
    background-color: #001429 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #f9f9f9 !important;
    }
  }

  :deep(.el-sub-menu__title) {
    background-color: #f9f9f9 !important;

    .el-icon.el-sub-menu__icon-arrow {
      position: absolute;
    }

    // 修改菜单图标大小
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #000 !important; // 菜单
    background-color: #fff !important;
  }

  // 选中之后菜单高亮颜色
  .el-menu-item.is-active {
    color: #000 !important;
    background-color: #fff !important;
    .icon {
      background-color: #4892fe;
      border-radius: 3px;
      margin-right: 10px;
      color: #fff;
    }
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
