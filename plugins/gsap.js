import gsap from 'gsap'
import Vue from 'vue'

Object.defineProperty(Vue.prototype, "$gsap", {
  value: gsap
});
