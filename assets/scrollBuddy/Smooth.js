import Core from './Core'
import Element from './Element'
import VirtualScroll from 'virtual-scroll'
import {lerp,getTranslate} from './utils'

export default class extends Core{
  constructor(options = {}){
    super(options)
  }

  init(){
    super.init()

    this.instance = {
      ...this.instance,
      delta:{ x: 0, y:0 },
      scrollbar:{ offset:0, lastY:0, delayHide: null }
    }
  }

  reinit(){
    super.reinit()
    this.instance = {
      ...this.instance,
      delta:{ x: 0, y:0 },
      scrollbar:{ offset:0, lastY:0, delayHide: null }
    }

    this.updateScrollbar()
  }

  startScrolling(){
    this.isScrolling = true
  }

  stopScrolling(){
    this.isScrolling = false
    this.inertiaRatio = 1;
    this.instance.scroll.y = Math.round(this.instance.scroll.y);
  }

  // ADD -------------------------------------

  addScroll(){
    document.getElementsByTagName('body')[0].style.cssText += ';overflow: hidden; height: 100vh; transform: translate3d(0,0,0)'
    this.isScrolling = false

    this.vs = new VirtualScroll({
      el: this.el,
      mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
      useKeyboard: false,
      passive: true
    })

    this.vs.on(e =>{
        if (this.stop) return
        if (!this.isScrolling && !this.isTouchingScrollbar) this.checkScroll()
        this.updateDelta(e)
    })

    this.addScrollbar()
  }

  addScrollbar(){
    this.scrollbar.el = document.createElement('span')
    this.isTouchingScrollbar = false
    let height = this.getScrollbarHeight()

    this.scrollbar.el.style.cssText = `position:fixed;
                                       z-index: 1000;
                                       top: 0px;
                                       right: 2.5px;
                                       transition: opacity .5s;
                                       opacity: 0;
                                       border-radius: ${this.scrollbar.cap ? this.scrollbar.width : 0}px;
                                       height: ${height}px;
                                       width: ${this.scrollbar.width}px;
                                       background: ${this.scrollbar.color};`

    this.touchScrollbar = this.touchScrollbar.bind(this)
    this.moveScrollbar = this.moveScrollbar.bind(this)
    this.releaseScrollbar = this.releaseScrollbar.bind(this)

    this.scrollbar.el.addEventListener('mousedown', this.touchScrollbar)
    window.addEventListener('mousemove', this.moveScrollbar)
    window.addEventListener('mouseup', this.releaseScrollbar)

    document.body.append(this.scrollbar.el);

    this.updateScrollbar()
  }

  addSection(el, params = {}){
    this.elements.push(new Element(el, {...params, scroll: true, section: true, padding: '100vh'}))
  }


  // UPDATE ----------------------------------
  update(){
    super.update()
    this.updateScrollbar()
  }

  updateDelta(e){
    this.instance.delta.y -= e.deltaY;
    if (this.instance.delta.y < 0) this.instance.delta.y = 0;
    if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
  }

  updateScrollbar(){
    let height = this.getScrollbarHeight()
    this.scrollbar.el.style.height = `${height}px`
  }

  updateScroll(){
    this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia * this.inertiaRatio);
  }

  // TRANSFORM -----------------------------
  transformScrollbar(){
    clearTimeout(this.instance.scrollbar.delayHide)
    this.scrollbar.el.style.opacity = 1
    let distance = this.windowHeight * (this.instance.scroll.y / (this.instance.limit + this.windowHeight))
    this.transform(this.scrollbar.el,{y:distance})
    this.instance.scrollbar.delayHide = setTimeout(()=> this.scrollbar.el.style.opacity = 0, 300)
  }

  // CHECK ---------------------------------


  checkScroll(){

      Math.abs(this.instance.delta.y - this.instance.scroll.y) < .1
      ? this.stopScrolling()
      : this.startScrolling()

      if (this.isScrolling){
        requestAnimationFrame(() => {
          this.updateScroll();
          this.transformScrollbar()
          this.transformElements()
          this.checkScroll()
        });
      }
  }

  //SCROLLBAR --------------------------------
  getScrollbarHeight(){
    return this.windowHeight * (this.windowHeight / (this.instance.limit + this.windowHeight))
  }
  touchScrollbar(e){
    this.isTouchingScrollbar = true
    this.instance.scrollbar.offset = e.clientY
    this.instance.scrollbar.lastY = this.instance.scroll.y
  }
  moveScrollbar(e){
    if (this.isTouchingScrollbar){
        e.preventDefault()

        let difference = ((e.clientY - this.instance.scrollbar.offset) / this.windowHeight) * (this.instance.limit + this.windowHeight)
        let y = this.instance.scrollbar.lastY + difference
        if (y > 0 && y < this.instance.limit){
          this.instance.delta.y = y
          this.checkScroll()
        }
    }
  }
  releaseScrollbar(){
    this.isTouchingScrollbar = false
  }


}
