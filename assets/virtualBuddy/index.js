import Scroll from './Scroll'
import Mobile from './Mobile'
import tools from './tools'

export default class{
  constructor(){
    this.mobile = tools.isMobile()
    this.tools = tools
    this.scroll = !this.mobile ? new Scroll() : new Mobile()

  }

  // SCROLL

  addScrollPage(el){
    this.scroll.addPage(el)
  }

  addScrollElement(el,fn, options){
    this.scroll.addElement(el,fn, options)
  }

  addScrollSection(el){
    this.scroll.addSection(el)
  }

  addScrollEvent(fn){
    this.scroll.addEvent(fn)
  }

  removeScrollElement(el){
    this.scroll.removeElement(el)
  }

  removeScrollSection(el){
    this.scroll.removeSection(el)
  }

  removeScrollEvent(fn){
    this.scroll.removeEvent(fn)
  }

}
