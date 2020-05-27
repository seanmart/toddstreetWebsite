import Scroll from './Scroll'

export default class extends Scroll{
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
    Object.keys(this.elements).forEach(key => this.updateElement(this.elements[key]))
    this.events.forEach(e => e(this.scroll))

    window.requestAnimationFrame(()=>{
      Object.keys(this.sections).forEach(key => this.updateSection(this.sections[key]))
      this.ticking = false
    })

  }

  addSection(el,fn = null, options = {}){
    if (!fn) return
    this.addElement(el,fn,options)
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
