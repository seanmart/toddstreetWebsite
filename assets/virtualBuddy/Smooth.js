import Core from './Core'
import tools from './tools'

export default class extends Core{
  constructor(){
    super()
    this.inertia = .08
  }


  // ADD

  addPage(el){
    el.style.position = 'fixed'
    el.style.top = '0px'
    el.style.left = '0px'
    el.style.right = '0px'

    super.addPage(el)
  }

  addSection(el){
    el.style.willChange = 'transform'
    super.addSection(el)
  }


  // CHECK

  checkScroll(){
    this.ticking = Math.abs(this.scroll.top - this.window.scroll) > .05

    let last = this.scroll.top
    this.scroll.top = tools.lerp(this.scroll.top,this.window.scroll,this.inertia)
    this.scroll.delta = this.scroll.top - last
    this.scroll.bottom = this.scroll.top + this.window.height
    this.scroll.direction = this.scroll.delta > 0 ? 'down' : 'up'

    window.requestAnimationFrame(()=>{

      Object.keys(this.elements).forEach(key => this.checkElement(this.elements[key]))
      Object.keys(this.sections).forEach(key => this.checkSection(this.sections[key]))
      this.events.forEach(e => e(this.scroll))

      if (this.ticking) this.checkScroll()
    })
  }


  // ON

  onResize(){
    super.onResize()
    this.checkScroll(true)
  }


  // UPDATE

  updatePage(){
    super.updatePage()
    document.documentElement.style.height = `${this.page.height}px`
  }
}
