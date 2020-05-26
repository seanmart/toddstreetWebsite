import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";

const vb = new VirtualBuddy()

Vue.directive('element',{
  inserted: function(el,{value}){

    let array = Array.isArray(value)
    let fn = array ? value[0] : value
    let options = array ? value[1] : {}


    vb.addScrollElement(el,fn,options)
  },
  unbind: function(el){
    vb.removeScrollElement(el)
  }
})


Vue.directive('section',{
  inserted: function(el){
    vb.addScrollSection(el)
  },
  unbind: function(el){
    vb.removeScrollSection(el)
  }
})


Vue.directive('page',{
  inserted: function(el){
    vb.addScrollPage(el)
  }
})

Vue.directive('mouse',{
  inserted: function(el,{value}){
    vb.addMouseElement(el, value)
  },
  unbind: function(el){
    vb.removeMouseElement(el)
  }
})

Object.defineProperty(Vue.prototype,'$vb',{value: vb})
