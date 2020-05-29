import Core from './Core'

export default class extends Core{
  constructor(){
    super()
  }

  checkScroll(){
    this.ticking = true

    let last = this.scroll.top
    this.scroll.top = this.window.scroll
    this.scroll.delta = this.scroll.top - last
    this.scroll.bottom = this.scroll.top + this.window.height
    this.scroll.direction = this.scroll.delta > 0 ? 'down' : 'up'

    window.requestAnimationFrame(()=>{
      Object.keys(this.elements).forEach(key => this.checkElement(this.elements[key]))
      this.events.forEach(e => e(this.scroll))
      this.ticking = false
    })

  }

}
