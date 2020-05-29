import Smooth from './Smooth'

export default class extends Smooth{
  constructor(){
    super()
  }

  addPage(el){
    this.page.el = el
    this.updatePage()
  }

  checkScroll(){
    this.ticking = true

    this.updateScroll()
    Object.keys(this.elements).forEach(key => this.checkElement(this.elements[key]))
    this.events.forEach(e => e(this.scroll))

    window.requestAnimationFrame(()=>{
      Object.keys(this.sections).forEach(key => this.checkSection(this.sections[key]))
      this.ticking = false
    })

  }

  addSection(){
    return null
  }

  removeSection(){

  }

  updatePage(){
    this.page.height = this.page.el.offsetHeight
    this.page.width = this.page.el.offsetWidth
  }

  updateScroll(){
    let last = this.scroll.top
    this.scroll.top = window.scrollY
    this.scroll.delta = this.scroll.top - last
    this.scroll.bottom = this.scroll.top + this.window.height
    this.scroll.direction = this.scroll.delta > 0 ? 'down' : 'up'
  }
}
