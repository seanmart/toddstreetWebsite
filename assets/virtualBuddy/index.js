import Scroll from './Scroll'
import Mouse from './Mouse'
import Mobile from './Mobile'
import tools from './tools'
export default class{
  constructor(){
    this.mobile = tools.isMobile()
    this.tools = tools
    this.scroll = null
    this.mouse = null

    if (!this.mobile){
      this.scroll = new Scroll()
      this.mouse = new Mouse(this.scroll)
    } else {
      this.scroll = new Mobile()
    }

  }

  // SCROLL

  addScrollPage(el){
    this.scroll.addPage(el)
  }

  addScrollElement(el,fn, options){
    this.scroll.addElement(el,fn, options)
  }

  addScrollSection(el, fn, options){
    this.scroll.addSection(el, fn, options)
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

  // MOUSE

  addMouseElement(el,fn){
    if (this.mobile) return
    this.mouse.addElement(el,fn)
  }

  removeMouseElement(el){
    if (this.mobile) return
    this.mouse.removeElement(el)
  }

}
