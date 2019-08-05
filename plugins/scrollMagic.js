import Vue from "vue";
import ScrollMagic from "ScrollMagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

function plugin(Vue) {
  Vue.prototype.$scrollmagic = ScrollMagic;
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
