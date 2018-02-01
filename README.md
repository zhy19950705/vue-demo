
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
/config
  dev.env.js           #dev环境变量配置
  index.js             #dev和prod环境的一些基本配置
  prod.env.js          #prod环境变量配置
/build
  build.js             #构建生产代码   npm run build 所执行的脚步
  check-versions.js    #检查npm和node的版本
  logo.png
  utils.js             #一些工具方法，主要用于生成cssLoader和styleLoader配置
  vue-loader.conf.js   #vueloader的配置信息
  webpack.base.conf.js #dev和prod的公共配置
  webpack.dev.conf.js  #本地开发dev的webpack配置
  webpack.prod.conf.js #构建生产prod的webpack配置

