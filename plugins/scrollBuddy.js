import scrollBuddy from '@/assets/scrollBuddy'
import Vue from 'vue'

export default ({app}) => {

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
      if (binding.arg === 'section'){
        sb.addSection(el, binding.value)
      } else if (binding.arg === 'page'){
        sb.reinit()
      } else {
        sb.addElement(el, binding.value)
      }
    },
    unbind: function(el){sb.removeElement(el)}
  })

  Object.defineProperty(Vue.prototype, "$scrollbuddy", {value: sb});
}
