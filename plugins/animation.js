import Vue from "vue";
import gsap from "gsap";
import locomotive from '@/assets/scripts/locomotive'

Object.defineProperty(Vue.prototype, "$loco", {
  value: locomotive
});

Object.defineProperty(Vue.prototype, "$gsap", {
  value: gsap
});
