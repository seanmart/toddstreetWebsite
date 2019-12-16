import Vue from 'vue'
import Rellax from 'rellax'

const rellax = new Rellax('.rellax')

Object.defineProperty(Vue.prototype, "$rellax", {
  value: rellax
});
