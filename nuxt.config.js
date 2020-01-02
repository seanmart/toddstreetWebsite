const pkg = require('./package')
import works from './data/work'

module.exports = {
  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/toddstreetWebsiteV3/' : '/'
  },
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/globalComponents'],

  /*
  ** Nuxt.js modules
  */
  modules: [],
  generate: {
    routes: works.map(route => `/work/${route}`)
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true
        }
      })
    }
  }
}
