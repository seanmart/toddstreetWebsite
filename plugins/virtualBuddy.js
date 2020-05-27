import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";
import gsap from 'gsap'

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

Vue.directive('onEnter',{
  inserted: function(el,{arg}){

    let anim = ''

    switch(arg){

      case 'scale':
      gsap.set(el,{scale: .5, opacity:0})
      anim = gsap.to(el,1,{scale: 1, opacity: 1, ease:'power4.out', paused: true})
      break

      case 'slideDown':
      gsap.set(el,{y:150, opacity:0})
      anim = gsap.to(el,1,{y:0, opacity:1, ease:'power4.out', paused: true})
      break
    }

    vb.addScrollElement(el,(e)=>{
      if (e.status == 'enter' && e.scroll.direction == 'down'){
        anim.resume();
        vb.removeScrollElement(el)
      }
    },{offsetEnter:'10vh'})
  },
  unbind: function(el){
    vb.removeScrollElement(el)
  }
})

Object.defineProperty(Vue.prototype,'$vb',{value: vb})
