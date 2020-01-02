import Smooth from './Smooth'
import Native from './Native'
import defaults from './options'

export default class{
  constructor(options){
    this.options = options;
    Object.assign(this, defaults, options);
    this.scroll = null
    this.init()
  }

  init(){
    this.isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    this.scroll = !this.isMobile && this.smooth ? new Smooth(this.options) : new Native(this.options)
    this.scroll && this.scroll.init()
  }
  hasSmooth(){
    return !this.isMobile
  }
  onScroll(event, func = null){
    
    if (!func){
      func = event
      event = null
    }

    this.scroll.addScrollEvent(event, func)
  }
  onChange(event, func){
    if (!func) return
    this.scroll.addChangeEvent(event, func)
  }
}
