
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/dix2zza.css' }
    ],
    script: [{ src: "https://fast.wistia.com/assets/external/E-v1.js" , body: true}]
  },
  loading: { color: '#fff' },
  modules: [
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: [
      "~assets/scss/variables.scss",
      "~assets/scss/mixins.scss"
    ]
  },
  css: [
    '~assets/scss/reset.scss',
    '~assets/scss/transitions.scss',
    '~assets/scss/base.scss'
  ],
  plugins: [
    { src: "~/plugins/gsap", ssr: false },
    { src: "~/plugins/scrollBuddy", ssr: false }
  ],
  buildModules: [
  ],
  build: {
    extend (config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
