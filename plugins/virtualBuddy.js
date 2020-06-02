import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";
import gsap from 'gsap'

const vb = new VirtualBuddy()

console.log(vb)

Vue.directive('section',{
  inserted: function(el){
    el.dataset['section'] = vb.addSection(el)
  },
  unbind: function(el){
    vb.removeSection(el.dataset['section'])
  }
})

Vue.directive('scroll',{
  inserted: function(el,{value}){
    let props = getProps(value, 'scroll')
    if (props.scroll) el.dataset['scroll'] = vb.addElement(el,props)
  },
  unbind: function(el){
    if (el.dataset && el.dataset['scroll']){
      vb.removeElement(el.dataset['scroll'])
    }
  }
})

Vue.directive('resize',{
  inserted: function(el,{value}){
    let props = getProps(value, 'resize')
    if (props.resize) el.dataset['resize'] = vb.addElement(el,props)
  },
  unbind: function(el){
    if (el.dataset && el.dataset['resize']){
      vb.removeElement(el.dataset['resize'])
    }
  }
})

Vue.directive('mouse',{
  inserted: function(el,{value}){
    let props = getProps(value, 'mouse')
    if (props.mouse) el.dataset['mouse'] = vb.addElement(el,props)
  },
  unbind: function(el){
    if (el.dataset && el.dataset['mouse']){
      vb.removeElement(el.dataset['mouse'])
    }
  }
})

Vue.directive('element',{
  inserted: function(el,{value = {}}){
    if (value.scroll || value.resize || value.mouse){
      el.dataset['mouse'] = vb.addElement(el,value)
    }

  },
  unbind: function(el){
    if (el.dataset && el.dataset['element']){
      vb.removeElement(el.dataset['element'])
    }
  }
})

Vue.directive('enter',{
  inserted: function(el,{arg, value}){

    let anim = null

    switch(arg){
      case 'slideup':
      anim = gsap.from(el,1,{yPercent: 100, opacity:0, ease: 'power4.out', paused: true})
      break

      case 'slideleft':
      anim = gsap.from(el,1,{x:'-=200', opacity:0, ease: 'power4.out', paused: true})
      break

      case 'slideright':
      anim = gsap.from(el,1,{x:'+=200', opacity:0, ease: 'power4.out', paused: true})
      break

      case 'pop':
      anim = gsap.from(el,1,{scale: .25, opacity:0, ease: 'power2.out', paused: true})
      break

      case 'custom':
      anim = value()
      break

    }

    if (anim){
      el.dataset['enter'] = vb.addElement(el,{
        scroll: (e)=>{
          if (e.offset > e.window.height * .1){
            anim.play()
            vb.removeElement(el.dataset['enter'])
          }
        }
      })
    }
  },
  unbind: function(el){
    vb.removeElement(el.dataset['enter'])
    console.log(vb)
  }
})

Object.defineProperty(Vue.prototype,'$vb',{value: vb})

function getProps(value, type){

  let fn = null
  let offsetTop = null
  let offsetBottom = null

  if (Array.isArray(value)){
    if (value.length > 0) fn = value[0]
    if (value.length > 1) offsetTop = value[1]
    if (value.length > 2) offsetBottom = value[2]
  } else {
    fn = value
  }

  let props = {}
  if (fn) props[type] = fn
  if (offsetTop) props.offsetTop = offsetTop
  if (offsetBottom) props.offsetBottom = offsetBottom

  return props
}
