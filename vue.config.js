module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这  
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
   devServer: {
        host:"localhost",//要设置当前访问的ip 否则失效
        open: true, //浏览器自动打开页面
        proxy: {
            '/api': {
            target: '//sd.16163.com',
            ws: true,
            changeOrigin: true,
            pathRewrite:{
                '^/api':''
            }
        }
      }
    }
  }