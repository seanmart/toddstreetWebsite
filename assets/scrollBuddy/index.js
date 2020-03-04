import Smooth from './Smooth'
import Core from './Core'
import defaults from './options'
let mobile = false

export default class{
  constructor(options){
    this.options = Object.assign(defaults, {}, options)
    this.scroll = null
    this.init()
  }

  init(){
    mobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    this.scroll = !mobile && this.options.smooth ? new Smooth(this.options) : new Core(this.options)
    this.scroll && this.scroll.init()
  }
  hasSmooth(){
    return !this.isMobile
  }
  pause(){
    this.scroll.stop = true
  }
  resume(){
    this.scroll.stop = false
  }
  reinit(){
    this.scroll && this.scroll.reinit()
  }
  isMobile(){
    return mobile
  }

}
