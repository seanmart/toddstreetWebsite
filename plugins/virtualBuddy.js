import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";
import gsap from 'gsap'

const vb = new VirtualBuddy()

Vue.directive('element',{
  inserted: function(el,{value, arg}){

    let array = Array.isArray(value)
    let fn = array ? value[0] : value
    let options = array ? value[1] : null
    let anim = null

    if (arg){

      let onComplete = ()=>{
        anim = null
        if (!fn) vb.removeScrollElement(el)
      }

      switch(arg){
        case 'scale':
        gsap.set(el,{scale: .25, opacity:0})
        anim = gsap.to(el,1,{scale: 1, opacity: 1, ease:'power4.out', paused: true, onComplete})
        break
        case 'slide':
        gsap.set(el,{y:200, opacity:0})
        anim = gsap.to(el,1,{y:'-=200', opacity:1, ease:'power4.out', paused: true, onComplete})
        break
      }

      if (anim){
        vb.addScrollElement(el,(e)=> {
          e.percent > .1 && anim && anim.resume()
          if (fn) fn(e)
        })
      }

      return

    }

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
