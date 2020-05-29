import Smooth from './Smooth'
import Scroll from './Scroll'
import Mouse from './Mouse'
import tools from './tools'

export default class{
  constructor(){
    this.updatePage = this.updatePage.bind(this)

    this.touch = tools.isTouch()
    this.tools = tools
    this.scroll = !this.touch ? new Smooth() : new Scroll()
    this.mouse = !this.touch ? new Mouse(this.scroll) : null

  }

  // SCROLL

  scrollTo(el){
    this.scroll.setScrollTo(el)
  }

  updatePage(){
    this.scroll.updatePage()
  }

  addScrollPage(el){
    this.scroll.addPage(el)
  }

  addScrollElement(el,fn, options){
    return this.scroll.addElement(el,fn, options)
  }

  addScrollSection(el){
    return this.scroll.addSection(el)
  }

  addScrollEvent(fn){
    this.scroll.addEvent(fn)
  }

  addMouseElement(el,fn){
    return this.mouse && this.mouse.addElement(el,fn)
  }

  removeScrollElement(id){
    this.scroll.removeElement(id)
  }

  removeScrollSection(id){
    this.scroll.removeSection(id)
  }

  removeScrollEvent(fn){
    this.scroll.removeEvent(fn)
  }

  removeMouseElement(id){
    this.mouse && this.mouse.removeElement(id)
  }

}
