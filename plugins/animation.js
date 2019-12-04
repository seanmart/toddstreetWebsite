import Vue from 'vue'
import gsap from 'gsap'
import Locomotive from 'locomotive-scroll';
import ScrollBuddy from '@/assets/scrollBuddy'

let loco,sb

loco = new Locomotive({
  el: document.getElementById('site'),
  smooth: true,
  smoothMobile: true,
  getDirection: true,
  inertia: 1.2
})

sb = new ScrollBuddy

const locoPlugin = {
  install(Vue){
    Vue.prototype.$loco = loco
  }
}

const scrollBuddy = {
  install(Vue){
    Vue.prototype.$scrollBuddy = sb

    loco.on('scroll',(e)=>{
      sb.scroll(e)
    })

  }
}

const gsapPlugin = {
  install(Vue){
    Vue.prototype.$gsap = gsap
  }
}

Vue.use(scrollBuddy)
Vue.use(gsapPlugin)
Vue.use(locoPlugin)
