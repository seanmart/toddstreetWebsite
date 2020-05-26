import Scroll from './Scroll'
import Mobile from './Mobile'
import Mouse from './Mouse'
import tools from './tools'

export default class{
  constructor(){
    this.updatePage = this.updatePage.bind(this)

    this.mobile = tools.isMobile()
    this.tools = tools
    this.scroll = !this.mobile ? new Scroll() : new Mobile()
    this.mouse = !this.mobile ? new Mouse(this.scroll) : null
  }

  // SCROLL

  updatePage(){
    this.scroll.updatePage()
  }

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

  addMouseElement(el,fn){
    this.mouse && this.mouse.addElement(el,fn)
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

  removeMouseElement(el){
    this.mouse && this.mouse.removeElement(el)
  }

}
