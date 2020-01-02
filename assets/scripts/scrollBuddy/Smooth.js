import Core from './Core'
import VirtualScroll from 'virtual-scroll'
import {lerp,getTranslate} from './utils'

export default class extends Core{
  constructor(options = {}){
    super(options)

    this.isScrolling = false
    this.isTicking = false;
    this.inertia = this.inertia * .1
    this.inertiaRatio = 1;

  }
  init(){
    super.init()
    this.html.classList.add('has-smooth-scroll')
    this.body.style.cssText += ';overflow: hidden; height: 100vh;'

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
    this.html.classList.add('is-scrolling');
  }

  stopScrolling(){
    this.isScrolling = false
    this.inertiaRatio = 1;
    this.instance.scroll.y = Math.round(this.instance.scroll.y);
    this.html.classList.remove('is-scrolling');
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
          this.updateScrollEvents()
          this.checkScroll()
        });
      }
  }


  // TRANSFORM --------------------------------

  transformSections(){
    let padding = this.windowHeight / 2
    this.checkSections((current, offset, limit, scrollTop, scrollBottom)=>{
      if ( (offset - padding) < scrollBottom && (limit + padding) > scrollTop){
        this.transform(current.el,0, -this.instance.scroll.y)
        current.el.style.visibility = 'visible'
      } else{
        current.el.style.visibility = 'hidden'
        this.transform(current.el, 0, 0);
      }
    })
  }
}
