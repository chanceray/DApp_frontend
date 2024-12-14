let firstMenu = null
export function mapMenusToRoutes(userMenus) {
  const routes = []
  // 1. 先默认加载所有routes
  const allRoutes = []
  const routerFiles = require.context('../router/main', true, /\.js/)
  routerFiles.keys().forEach((key) => {
    const route = routerFiles(key).default
    allRoutes.push(route)
  })
  // 2. 根据userMenus获取所需要添加的routes
  // 递归获取需要添加的路由
  const _recurseGetRoute = (menus) => {
    for (let menu of menus) {
      if (!menu.isLeaf) {
        _recurseGetRoute(menu.children)
      } else if (menu.isLeaf) {
        const route = allRoutes.find((item) => {
          return menu.url.startsWith(item.path)
        })
        if (!firstMenu) {
          firstMenu = menu
        }
        if (route) routes.push(route)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }
