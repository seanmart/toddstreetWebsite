export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        href:
          "https://fonts.googleapis.com/css?family=Aleo:200,300,300i,400,400i,700|Roboto:300,400,500,700,900&display=swap",
        rel: "stylesheet"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],
    script: {
      src:
        "https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver,IntersectionObserverEntry"
    },
    script: [{ src: "https://fast.wistia.com/assets/external/E-v1.js" , body: true}]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/gsap", ssr: false },
    { src: "~/plugins/scrollBuddy", ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/style-resources", "nuxt-client-init-module"],
  /*
   ** Build configuration
   */
  styleResources: {
    scss: ["~assets/scss/main.scss"]
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
