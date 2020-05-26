
export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#fff'
  },
  modules: [
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: "~assets/scss/resources.scss"
  },
  css: [
    '~assets/fonts/bebasNeue/stylesheet.css',
    '~assets/fonts/aleo/stylesheet.css',
    '~assets/scss/reset.scss',
    '~assets/scss/styles.scss'
  ],
  plugins: [
    { src: "~/plugins/gsap", ssr: false },
    { src: "~/plugins/virtualBuddy", ssr: false },
    { src: "~/plugins/components"},
  ],
  buildModules: [
  ],
  build: {
    extend (config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
