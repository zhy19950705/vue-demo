// see http://vuejs-templates.github.io/webpack for documentation.
// 这个文件主要是对开发环境和生产环境的一个基本的配置
const path = require('path')

module.exports = {
  //开发环境的一个基本配置
  dev: {
    env:require('./dev.env'),
    // 编译输出的二级目录
    assetsSubDirectory: 'static',
    //编译发布的根目录，可配置为资源服务器域名或者cdn域名
    assetsPublicPath: '/',
    //需要使用proxyTable代理的接口（可以跨域）
    proxyTable: {},

    //开发时候访问的域名，可以通过环境变量自己设置
    host: 'localhost', // can be overwritten by process.env.HOST
    //开发时候的端口，可以通过环境变量port设定，如果端口被占用了，会随机分配一个未被使用的端口
    port: 8080,
    //是否自动打开浏览器
    autoOpenBrowser: true,
    //在浏览器是否展示错误蒙层
    errorOverlay: true,
    //是否展示错误的通知
    notifyOnErrors: true,

    // 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
    // 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
    // vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
    // 或者具体的数值，指定文件查询的具体周期。
    poll: false,

    //是否使用eslint loader去检查代码
    useEslint: true,

    //如果设置为true,在浏览器中,eslint的错误和警告会以蒙层的方式展现
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development source maps的歌声
    devtool: 'cheap-module-eval-source-map',

    //指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
    cacheBusting: true,
    //关闭css的source map
    cssSourceMap: true
  },

  build: {
    env:require('./prod.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
