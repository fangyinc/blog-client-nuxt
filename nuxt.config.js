const nodeExternals = require('webpack-node-externals')
// const resolve = (dir) => require('path').join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '程方银的个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '计算机在读本科生' },
      { hid: 'keywords', name: 'keywords', content: '程序猿 | 计算机' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
    // ,
    // script: [
    //   { src: 'https://cdn-city.livere.com/js/embed.dist.js' }
    // ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/vuejs-logger.js',
    '~/api/init.js',
    { src: '~/utils/load-resource.js', ssr: false },
    { src: '~/plugins/mavon-editor.js', ssr: false },
    { src: '~/plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~/plugins/vue-notification.js', ssr: false },
    { src: '~/plugins/aliyun-oss.js', ssr: false },
    { src: '~/plugins/vue-back-top.js', ssr: false },
    { src: '~/plugins/google-analytics.js', ssr: false }
  ],
  router: {
    middleware: ['auth']
  },
  css: [
    /**
     * 因为Vuetify的 <code>的样式和 markdown的代码样式有冲突，所以直接复制vuetify的样式文件
     * 并修改其中的app.styl文件去掉_code.styl
     */
    '~/assets/vuetify/stylus/app.styl',
    'material-design-icons-iconfont/dist/material-design-icons.css',
    'mavon-editor/dist/css/index.css',
    '~/assets/css/main.css',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css'
  ],
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    defaultUserId: 1,
    deployUrl: 'https://chengfy.com',
    livereUid: 'MTAyMC8zMDA0OC82NjEy'
  },
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070' },
  loading: {
    color: 'blue',
    height: '3px'
  },
  modules: [
    // 组件缓存, 默认最大缓存1000个组件，15分钟
    ['@nuxtjs/component-cache', { max: 1000, maxAge: 1000 * 60 * 15 }]
  ],
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js', // 打包到库文件以获得更好的缓存
      '~/api/init.js',
      '~/plugins/vue-back-top.js'
      // 'mavon-editor' 这里不打包阿里云 mavon-editor, 因为只有我编辑文章才用得到，蛤蛤蛤哈哈, 下面的aliyun-oss同理
      // '~/plugins/aliyun-oss.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
      let plugins = [
        // 去掉 console的输出
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true
        })
      ]
      // if (!ctx.isDev) {
      //   config.plugins = [...config.plugins, ...plugins]
      // }
    }
  }
}
