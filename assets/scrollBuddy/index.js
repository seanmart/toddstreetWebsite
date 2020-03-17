import Smooth from './Smooth'
import Core from './Core'
import defaults from './options'
let mobile = false
let scroll = null
let options = {}

export default class{
  constructor(o){
    options = Object.assign(defaults, {}, o)
    scroll = null
    this.init()
  }

  init(){
    mobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    scroll = !mobile && options.smooth ? new Smooth(options) : new Core(options)
    scroll && scroll.init()
  }

  reinit(){
    scroll && scroll.reinit()
  }

  hasSmooth(){
    return !mobile
  }

  pause(){
    scroll.stop = true
  }

  resume(){
    scroll.stop = false
  }
  isMobile(){
    return mobile
  }

  addElement(el, o){
    scroll.addElement(el,o)
  }

  addSection(el, o){
    scroll.addSection(el,o)
  }

  removeElement(el){
    scroll.removeElement(el)
  }

}
