import { SITE } from './config'

console.log('server start')

export default {
  mode: 'universal',

  /*
  ** dev 标示当前正处于开发环境还是生产环境
  */
  dev: (process.env.NODE_ENV !== 'production'),

  /*
  ** Headers of the page
  */
  head: {
    title: SITE.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: SITE.desc }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Customize the progress-bar color
  */
  router: {
    linkExactActiveClass: 'is-active'
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://api.thermophysics.cn'
  },

  /*
  ** Global CSS
  */
  css: [
    './assets/custom.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/vee-validate.js' },
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/buefy/nuxt-buefy
    'nuxt-buefy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
