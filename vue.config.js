const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'build',
  devServer: {
    port: '8090',
    proxy: {
      '^/api': {
        // 接口文档地址：https://console-docs.apipost.cn/preview/8dc3683fba76f90b/db850f366856a9d7
        target: 'http://118.25.195.230:8000/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
