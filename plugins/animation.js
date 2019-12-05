import Vue from "vue";
import gsap from "gsap";
import Locomotive from "locomotive-scroll";

const locoPlugin = {
  install(Vue) {
    Vue.prototype.$loco = new Locomotive({
      el: document.getElementById("site"),
      smooth: true,
      getDirection: true,
      inertia: 1
    });
  }
};

const gsapPlugin = {
  install(Vue) {
    Vue.prototype.$gsap = gsap;
  }
};

Vue.use(gsapPlugin);
Vue.use(locoPlugin);
