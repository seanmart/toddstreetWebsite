import Mobile from './mobile'
import Smooth from './smooth'

import {lerp, type, transform, minMax, getTransform, getOffset, isMobile} from './helpers'

export default class{
  constructor(){

    Object.assign(this,{},{
      getOffset: getOffset,
      getTransform: getTransform,
      transform: transform,
      minMax: minMax,
      lerp: lerp,
      type: type,
      mobile: isMobile()
    })

    this.eventKey = 0
    this.instance = this.mobile ? new Mobile() : new Smooth()

  }

  init(el, s){
    this.eventKey = 0
    this.instance.init(el, s)
  }

  start(){
    this.instance.start()
  }

  addPage(el,s){
    this.instance.addPage(el,s)
  }

  addSection(el, o){
    this.instance.addSection(el, o)
  }

  addElement(el, o){

    if (this.type('array', el)){
      el.map((e,i) => this.instance.addElement(e, this.type('function',o) ? o(i) : o))
    } else {
      this.instance.addElement(el, this.type('function',o) ? o(0) : o)
    }

  }

  onScroll(fn){
    this.instance.addEvent('scroll',this.eventKey++,fn)
  }

  onResize(fn){
    this.instance.addEvent('resize',this.eventKey++,fn)
  }

}
