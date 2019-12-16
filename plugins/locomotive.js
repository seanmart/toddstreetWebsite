import Vue from 'vue'
import locomotive from 'locomotive-scroll'

let loco = new locomotive({
  smooth: true,
  repeat: true
})

Object.defineProperty(Vue.prototype, "$loco", {
  value: loco
});
