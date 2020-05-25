import gsap from 'gsap'
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";
import Vue from 'vue'

gsap.registerPlugin(CSSRulePlugin);

Object.defineProperty(Vue.prototype, "$gsap", {
  value: gsap
});
