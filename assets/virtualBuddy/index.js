import Scroll from './Scroll'
import Mouse from './Mouse'
import tools from './tools'
export default class{
  constructor(){
    this.tools = tools
    this.scroll = new Scroll()
    this.mouse = new Mouse(this.scroll)
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
    this.mouse.addElement(el,fn)
  }

  removeMouseElement(el){
    this.mouse.removeElement(el)
  }

}
