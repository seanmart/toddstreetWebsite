import Core from './Core'
import VirtualScroll from 'virtual-scroll'
import {lerp,getTranslate} from './utils'

export default class extends Core{
  constructor(options = {}){
    super(options)

    this.isScrolling = false

  }
  init(){
    super.init()
    document.getElementsByTagName('body')[0].style.cssText += ';overflow: hidden; height: 100vh;'

    this.instance = {
      delta:{
        x: 0,
        y:0
      },
      ...this.instance
    }

    this.vs = new VirtualScroll({
      el: this.el,
      mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
      useKeyboard: false,
      passive: true
    })

    this.vs.on(e =>{
        if (!this.isScrolling) this.checkScroll()
        this.updateDelta(e)
    })

  }

  startScrolling(){
    this.isScrolling = true
  }

  stopScrolling(){
    this.isScrolling = false
    this.inertiaRatio = 1;
    this.instance.scroll.y = Math.round(this.instance.scroll.y);
  }


  // UPDATE ----------------------------------

  updateDelta(e){
    this.instance.delta.y -= e.deltaY;

    if (this.instance.delta.y < 0) this.instance.delta.y = 0;
    if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;

  }

  updateScroll(){
    this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia * this.inertiaRatio);
  }

  update(){
    this.setScrollLimit()
    this.updateScroll()
    this.updateSections()
    this.updateElements()
    this.updateElementOffsets()
    this.transformSections()
    this.transformElements({transition: true})
  }

  // CHECK ---------------------------------


  checkScroll(){

      Math.abs(this.instance.delta.y - this.instance.scroll.y) < .1
      ? this.stopScrolling()
      : this.startScrolling()

      if (this.isScrolling){
        requestAnimationFrame(() => {
          this.updateScroll();
          this.transformSections()
          this.transformElements()
          this.checkScroll()
        });
      }
  }


  // TRANSFORM --------------------------------
  transformSections(){
    let scroll = {}
    scroll.top = this.instance.scroll.y
    scroll.bottom = scroll.top + this.windowHeight
    let padding = this.windowHeight / 1.25

    this.sections.forEach((current,i)=>{

      let inView = (current.top - padding <= scroll.top) && (current.bottom + padding > scroll.top)

      if (inView){

        this.transform(current.el,0, -scroll.top)
        current.el.style.visibility = 'visible'

        let scrolled = scroll.top - current.top
        let percent = scrolled / (current.bottom - current.top)

        if (current.onScroll){
          current.onScroll({
            scrolled: scrolled,
            percent: percent,
            entering: current.bottom - current.height > scroll.top,
            leaving: current.bottom < scroll.bottom
          })
        }
      } else {
        current.el.style.visibility = 'hidden'
        this.transform(current.el, 0, '-100%');
      }

      if (current.onChange && inView !== current.inView){
        current.onChange({visible: inView })
      }

      this.sections[i].inView = inView
    })
  }

}
