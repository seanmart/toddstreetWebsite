
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
    ],
    script:[
      { src: '//fast.wistia.com/assets/external/E-v1.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/CSSRulePlugin.min.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/TextPlugin.min.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/ScrollToPlugin.min.js', body: true}
    ]
  },
  loading: { color: '#fff' },
  styleResources: {
    scss: "~assets/scss/variables.scss"
  },
  css: [
    '~assets/fonts/bebasNeue/stylesheet.css',
    '~assets/fonts/aleo/stylesheet.css',
    '~assets/scss/reset.scss',
    '~assets/scss/global.scss',
    '~assets/scss/space.scss',
    '~assets/scss/text.scss'
  ],
  modules: [
    "@nuxtjs/style-resources"
  ],
  plugins: [
    {src: "~/plugins/components"},
    {src: "~/plugins/directives",ssr: false},
    {src: "~/plugins/virtualBuddy", ssr: false}
  ],
  buildModules: [
  ],
  build: {
    extend (config, ctx) {
    }
  }
}
