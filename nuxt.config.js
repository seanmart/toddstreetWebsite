import FMMode from "frontmatter-markdown-loader/mode";
var glob = require("glob");

async function getDynamicPaths(posts) {
  return [].concat(
    ...posts.map(cat => {
      return glob.sync("*.md", { cwd: `assets/${cat}` })
                 .map(filepath => `${cat}/${filepath.replace('.md', '')}`);
    })
  )
}

export default async () => {
  return{
    mode: 'universal',
    target: 'server',
    components: true,
    loading: false,
    server:{port: 1234},
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {rel: "stylesheet",href:"https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&display=swap"}
      ],
      script: [
        { src: "//fast.wistia.com/assets/external/E-v1.js", body: true },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.0/gsap.min.js",body: true},
        { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.0/CSSRulePlugin.min.js",body: true},
        { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.0/TextPlugin.min.js",body: true},
        { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.0/ScrollToPlugin.min.js",body: true}
      ]
    },
    css: [
      "~assets/bebasNeue/stylesheet.css",
      "~assets/reset.scss",
      "~assets/global.scss",
      "~assets/text.scss",
      "~assets/space.scss"
    ],
    plugins: [
      {src:'~plugins/virtualBuddy', ssr: false},
      {src:'~plugins/directives', ssr: false}
    ],
    styleResources: {scss: "~assets/variables.scss"},
    modules: ["@nuxtjs/style-resources"],
    generate: {
      routes: await getDynamicPaths(["care"])
    },
    build: {
      extend(config, ctx) {
        config.module.rules.push({
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          options: {
            mode: [FMMode.HTML, FMMode.BODY]
          }
        });
      }
    }
  }
}
