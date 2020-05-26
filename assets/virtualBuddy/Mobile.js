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

    window.requestAnimationFrame(()=>{
      this.updateScroll()
      this.updateSections()
      this.updateElements()
      this.updateEvents()
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
}
