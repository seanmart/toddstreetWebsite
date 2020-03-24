import Smooth from './Smooth'
import Core from './Core'
import defaults from './options'
let mobile = false
let instance = null
let options = {}

export default class{
  constructor(o){
    options = Object.assign(defaults, {}, o)

    mobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    instance = !mobile && options.smooth ? new Smooth(options) : new Core(options)
    instance && instance.init()
  }

  reinit(){
    this.pause()
    instance && instance.reinit()
    this.resume()
  }

  hasSmooth(){
    return !mobile
  }

  pause(){
    instance.stop = true
  }

  resume(){
    instance.stop = false
  }
  isMobile(){
    return mobile
  }

  addElement(el, o){
    instance.addElement(el,o)
  }

  addSection(el, o){
    instance.addSection(el,o)
  }

  removeElement(el){
    instance.removeElement(el)
  }

  onScroll(e){
    instance.addEvent(e, 'scroll')
  }

  onResize(e){
    instance.addEvent(e, 'resize')
  }

}
