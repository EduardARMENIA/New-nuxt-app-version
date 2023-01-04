const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
 

  /*
   ** Global CSS
   */
 css: [
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [ { src: '@/plugins/socket', ssr: false },   { src: '~/plugins/vue-cropper', ssr: false }],
  

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa',  '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
     ],
  
   axios: {
    baseURL: 'http://localhost:8000' // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  


  proxy: {
    '/api/': { target: 'http://localhost:8000/', pathRewrite: { '^/api/': '' }, changeOrigin: true }
  },

  /*
   ** Build configuration
   */
  build: {
     vendor: [
      'vue-cropper'
    ], 
  
   
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
