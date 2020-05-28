import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";
import gsap from 'gsap'

const vb = new VirtualBuddy()

Vue.directive('entrance',{
  inserted: function(el,{arg}){

    let animation = null

    switch(arg){
      case 'scale':
      gsap.set(el,{scale: .25, opacity:0})
      animation = gsap.to(el,1,{scale: 1, opacity: 1, ease:'power4.out', paused: true})
      break

      case 'slide':
      gsap.set(el,{y:200, opacity:0})
      animation = gsap.to(el,1,{y:'-=200', opacity:1, ease:'power4.out', paused: true})
      break

    }

    if (animation){
      el.dataset.entrance = vb.addScrollElement(el,(e)=>{
        if (e.percent > .1) {
          animation.play()
          remove(el,'entrance')
        }
      })
    }
  }
})

Vue.directive('element',{
  inserted: function(el,{value}){

    let isArray = Array.isArray(value)
    let fn = isArray ? value[0] : value
    let options = isArray ? value[1] : null

    el.dataset.element = vb.addScrollElement(el,fn,options)

  },
  unbind: function(el){
    remove(el, 'element')
  }
})


Vue.directive('section',{
  inserted: function(el){
    el.dataset.section = vb.addScrollSection(el)
  },
  unbind: function(el){
    remove(el,'section')
  }
})


Vue.directive('page',{
  inserted: function(el){
    vb.addScrollPage(el)
  }
})

Vue.directive('mouse',{
  inserted: function(el,{value}){
    el.dataset.mouse = vb.addMouseElement(el, value)
  },
  unbind: function(el){
    remove(el, 'mouse')
  }
})

Object.defineProperty(Vue.prototype,'$vb',{value: vb})

// FUNCTIONS

function remove(el, name){
  let id = el.dataset[name]
  if (id){
    vb.removeScrollElement(id)
    el.removeAttribute(`data-${name}`)
  }
}
