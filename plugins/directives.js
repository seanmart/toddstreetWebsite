import Vue from 'vue'
import vars from '@/assets/scss/variables.scss'

let mobile = parseInt(vars.mobile)
let tablet = parseInt(vars.tablet)
let desktop = parseInt(vars.desktop)

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

Vue.directive('enter',{
  inserted: function(el,{arg,value}){
    let animation = null
    switch(arg){
      case 'slideup':
      animation = gsap.from(el,1.5,{y:'20vh',opacity:0,ease: 'power4.out', paused: true})
      break

      case 'slideleft':
      animation = gsap.from(el,1.5,{x:-200,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'slideright':
      animation = gsap.from(el,1.5,{x:200,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'zoomout':
      animation = gsap.from(el,1.5,{scale:.75,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'zoomin':
      animation = gsap.from(el,1.5,{scale:1.25,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'turn':
      animation = gsap.from(el,2,{scale:1.5,rotation: 5,ease: 'power4.out',paused: true})
      break

      case 'custom':
      animation = value()
      break
    }

    ScrollBuddy.create(el,{
      offsetStart: '10vh',
      onEnter:({id})=> {
        animation.play()
        ScrollBuddy.killById(id)
      }
    })
  }
})

Vue.directive('parallax',{
  inserted: function(el,{arg,value}){

    let min = arg == 'no-min' ? 0 : mobile

    if (typeof value == 'string'){

      let animation = gsap.to(el,1,{y:value, paused: true, ease: 'none'})

      ScrollBuddy.create(el,{
        minWidth: min,
        onScroll:(e)=> animation.progress(e.percent)
      })

    } else {

      ScrollBuddy.create(el,{
        minWidth: min,
        onScroll:(e)=> gsap.set(el,{y: (-value/10) * e.scrolled })
      })
    }

  }
})
