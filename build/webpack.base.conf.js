//1、配置webpack编译入口
//2、配置webpack输出路径和命名规则
//3、配置模块resolve规则
//4、配置不同类型模块的处理规则
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

//生成相对于根目录的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

//eslint的规则
const createLintingRule = () => ({
  //对src和test文件下的.js和.vue的文件使用eslint-loader进行eslint检查
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  //在调用其他loader之前需要调用这个规则进行代码风格检查
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    //文件风格检查的格式化程序，这里使用的是第三方的eslint-friendly-formatter
    formatter: require('eslint-friendly-formatter'),
    //是否需要eslint输出警告信息
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

//webpack基本的配置信息（开发环境和生产环境公共的配置）
module.exports = {
  //webpack解析文件的时候的根目录。如果把webpack.config.js放在了项目的根目录下面，这个配置可以省略
  context: path.resolve(__dirname, '../'),
  //webpack入口文件
  entry: {
    app: './src/main.js'
  },
  //webpack输出路径和命名规则
  output: {
    //webpack的输出的目标文件夹路径
    path: config.build.assetsRoot,
    //webpack的输出Bundle文件命名格式
    filename: '[name].js',
    //webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    //别名，方便引用模块，例如有了别名之后，Import vue from 'vue/dist/vue.commom.js' 可以写成 import vue from 'vue
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  //不同类型模块的处理规则
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {//对所有的.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {//对src和test和client文件夹下的.js文件使用babel-loader将es6+的代码转换成es5的
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {//对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          //小于10K的图片转出base64编码的dataURL字符串写到代码中
          limit: 10000,
          //其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      { //对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          //小于10k的的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          //其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      { //对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          //小于10K的资源转出base64编码的dataURL字符串写到代码中
          limit: 10000,
          //其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
  // 这可以使最初为nodejs编写的代码可以在浏览器端运行
  node: {
    // 这个配置是一个对象，其中的每个属性都是nodejs全局变量或模块的名称
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // false表示什么都不提供。如果获取此对象的代码，可能会因为获取不到此对象而触发ReferenceError错误
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    // 设置成empty则表示提供一个空对象
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
