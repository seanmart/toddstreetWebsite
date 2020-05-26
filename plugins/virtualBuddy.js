import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";

const vb = new VirtualBuddy()

Vue.directive('element',{
  inserted: function(el,{value}){
    let props = getProps(value)
    vb.addScrollElement(el,props.fn,props.options)
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

Object.defineProperty(Vue.prototype,'$vb',{value: vb})

function getProps(v = null){

  let props = {options: {}, fn: null}
  if (!v) return props

  if (Array.isArray(v)){
    props.fn = v[0]
    props.options = v[1]

  } else if (typeof v == 'function') {
      props.fn = v

  } else if (typeof v == 'object') {
      props.options = v

  }

  return props
}
