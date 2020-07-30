import Vue from 'vue'

Vue.directive('image',{
  inserted: function(el,{value}){
    if (!value) return
    el.style.backgroundImage = `url(${value})`
    el.style.backgroundSize ="cover"
    el.style.backgroundPosition = "center center"
  },
})

Vue.directive('bg',{
  inserted: function(el,{value}){
    if (!value) return
    el.style.background = value
  },
})

Vue.directive('fixed',{
  inserted: function(el,{value}){
    ScrollBuddy.create(el,{fixed: true})
  },
})

Vue.directive('enter',{
  inserted: function(el,{arg,value = {}}){

    let animation = null
    let duration = value.duration || 1.25
    let offset = value.offset || 0
    let markers = value.markers || false
    let els

    switch(arg){
      case 'fadeup':
      animation = gsap.from(el,duration,{y:100,opacity:0,ease: 'power4.out', paused: true})
      break

      case 'slideup':
      animation = gsap.from(el,duration,{y:150,ease: 'power4.out', paused: true})
      break

      case 'fadeleft':
      animation = gsap.from(el,duration,{x:-100,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'faderight':
      animation = gsap.from(el,duration,{x:100,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'zoomout':
      animation = gsap.from(el,duration,{scale:.75,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'zoomin':
      animation = gsap.from(el,duration,{scale:1.25,opacity:0,ease: 'power4.out',paused: true})
      break

      case 'turn':
      animation = gsap.from(el,duration,{scale:1.5,rotation: 5,ease: 'power4.out',paused: true})
      break

      case 'splitTextUp':
      els = el.querySelectorAll('span')
      animation = gsap.from(els,duration,{yPercent: 100,ease: 'power4.out', stagger: .05, paused: true})
      break

      case 'splitTextDown':
      els = el.querySelectorAll('span')
      animation = gsap.from(els,duration,{yPercent: -100,ease: 'power4.out', stagger: .05, paused: true})
      break
    }

    ScrollBuddy.create(el,{
      offsetStart: offset,
      markers: markers,
      onEnter:({id})=> {
        animation.play()
        ScrollBuddy.killById(id)
      }
    })

  }
})

Vue.directive('speed',{
  inserted: function(el,{arg,value}){

    if (!value) return
    let min = arg == 'no-min' ? 0 : 600
    let parsedInt = parseInt(value)
    let onScroll, animation

    if (typeof value == 'string'){

      animation = value.includes('%')
      ? gsap.to(el,1,{yPercent:parseInt(value), paused: true, ease: 'none'})
      : gsap.to(el,1,{y:value, paused: true, ease: 'none'})

      onScroll = (e)=> animation.progress(e.percent)

    } else {
      onScroll = (e)=> gsap.set(el,{y: (-value/10) * e.scrolled })
    }

    ScrollBuddy.create(el,{minWidth: min,offsetEnd: parsedInt < 0 ? parsedInt * 50 : 0, onScroll})

  }
})
