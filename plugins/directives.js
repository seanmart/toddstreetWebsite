
import Vue from "vue";

Vue.directive('image',{
  inserted: function(el,{value}){
    if (!value) return
    el.style.backgroundImage = `url(${value})`
  },
})

Vue.directive('bg',{
  inserted: function(el,{value}){
    if (!value) return
    el.style.background = value
  },
})
