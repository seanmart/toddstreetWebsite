import scrollBuddy from '@/assets/scripts/scrollBuddy'
import Vue from 'vue'

let sb = new scrollBuddy({
  smooth: true
})

Vue.directive('scroll',{
  bind: function(el,binding){
    if (binding.arg === 'section') {
      sb.scroll.addSection(el, binding.value)
    } else {
      sb.scroll.addElement(el, binding.value)
    }
  }
})

Object.defineProperty(Vue.prototype, "$scrollbuddy", {
  value: sb
});
