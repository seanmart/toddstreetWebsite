import FMMode from "frontmatter-markdown-loader/mode";

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
      { rel: 'stylesheet',href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&display=swap'},
    ],
    script:[
      { src: '//fast.wistia.com/assets/external/E-v1.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/CSSRulePlugin.min.js', body: true},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/TextPlugin.min.js', body: true}
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
    //{ src: "~/plugins/gsap", ssr: false },
    { src: "~/plugins/directives", ssr: false },
    { src: "~/plugins/components"},
  ],
  buildModules: [
  ],
  build: {
    extend (config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
      config.module.rules.push(
        {
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          options: {
            mode: [FMMode.HTML]
          }
        }
      )
    }
  }
}
