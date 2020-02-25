import scrollBuddy from '@/assets/scrollBuddy'
import Vue from 'vue'

let sb = new scrollBuddy({
  smooth: true,
  scrollbar:{
    color: 'rgba(100,100,100,.5)',
    width: 10,
    cap: false
  }
})

Vue.directive('scroll',{
  inserted: function(el,binding){
    if (binding.arg === 'section') {
      sb.scroll.addSection(el, binding.value)
    } else {
      sb.scroll.addElement(el, binding.value)
    }
  }
})

Vue.mixin({
  mounted:()=> sb.reinit()
})

Object.defineProperty(Vue.prototype, "$scrollbuddy", {
  value: sb
});
