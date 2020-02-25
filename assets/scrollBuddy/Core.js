
import Element from './Element'

export default class {
  constructor(options = {}){

    Object.assign(this, {}, options);

    this.stop = options.stop || false
    this.checkScroll = this.checkScroll.bind(this);
    this.checkResize = this.checkResize.bind(this);
    this.updateElements = this.updateElements.bind(this);

    this.shouldUpdate = null
    this.inertia = this.inertia * .1
    this.inertiaRatio = 1;
    this.elements = [];

    window.addEventListener('resize', this.checkResize, false);
    window.addEventListener("load", this.updateElements)
    window.scrollTo(0,0)

  }

  init() {

    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth
    this.isTicking = false

    this.instance = {
      scroll:{x: 0,y:0},
      limit: this.el.offsetHeight - this.windowHeight,
    }

    this.addScroll()
  }

  reinit(){
    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth
    this.isTicking = false

    this.instance = {
      scroll:{x: 0,y:0},
      limit: this.el.offsetHeight - this.windowHeight,
    }
  }

  // CHECK -------------------------------

  checkScroll() {
    this.transformElements();
    this.isTicking = false
  }

  checkResize(){
    clearTimeout(this.shouldUpdate)
    this.shouldUpdate = setTimeout(()=>{
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.update()
    },500)
  }

  // ADD -----------------------------

  addScroll(){
    window.addEventListener("scroll", () => {
      if (this.stop) return
      if (!this.isTicking) {
        requestAnimationFrame(this.checkScroll)
        this.isTicking = true;
      }
      this.updateScroll();
    });
  }

  addSection(el, params = {}){
    this.elements.push(new Element(el, params))
  }

  addElement(el,params = {}){
    if (params.cancel) return
    this.elements.push(new Element(el, params))
  }

  // UPDATE -------------------------------

  update(){
    this.setScrollLimit()
    this.updateScroll()
    this.updateElements()
    this.updateElementOffsets()
    this.transformElements({transition: true})
  }

  updateScroll() {
    this.instance.scroll.y = window.scrollY;
    this.instance.scroll.x = window.scrollX;
  }

  updateElements(){
    this.elements.forEach(current=> current.update())
  }

  updateElementOffsets(){
    let scroll = 0

    do{
      this.transformElements({scrollTop: scroll, update: false})
      scroll += 1
    }while(scroll < this.instance.scroll.y)
  }

  // TRANSFORM ---------------------------

  transformElements(props = {}){

    let scroll = {}
    let update = props.update == undefined ? true : props.update
    let transition = props.transition == undefined ? false : props.transition
    let instance = this.instance
    let elements = props.element ? [props.element] : this.elements

    scroll.top = props.scrollTop || instance.scroll.y
    scroll.bottom = scroll.top + this.windowHeight

    let count = 0

    elements.forEach((current, i)=>{

      let bottom = current.bottom + current.offset

      let view = {
        mounted: current.top - current.padding <= scroll.top && bottom + current.padding > scroll.top,
        visible: current.top <= scroll.top && bottom > scroll.top
      }

      count++

      if (!current.view.mounted && !view.mounted) return
      let scrolled = scroll.top - Math.max(current.top,0)

      // IN VIEWPORT --------------------------------------------------------------

      if (view.mounted){

        let transform = {
          x:0,
          y:0,
          s: 0,
          r: 0,
          changed: false,
          offset: 0
        }

        // transform
        if (current.transform){
          transform.changed = true

          let tOffset = Math.max(scrolled - current.transform.offset,0)
          if (current.transform.duration) tOffset = Math.min(parallaxOffset,current.transform.duration)

          transform.s = 1 + tOffset * current.transform.s
          transform.r = tOffset * current.transform.r
          transform.y = tOffset * current.transform.y
          transform.x = tOffset * current.transform.x

          transform.offset += transform.y
          if (transform.s !== 0) transform.offset += (current.height * transform.s) / 2
        }

        // sticky
        if (current.sticky){
          transform.changed = true
          let stickyOffset = Math.min(Math.max(scrolled - current.sticky.offset,0),current.sticky.duration)
          transform.y += stickyOffset - current.sticky.position
          transform.offset += transform.y
        }

        // scroll
        if (current.scroll){
          transform.changed = true
          let scrollDistance = scroll.top + transform.y
          if (current.scroll.duration) scrollDistance = Math.min(scrollDistance, current.scroll.duration)
          transform.y -= scrollDistance
        }

        if (update && transform.changed) {
          current.el.style.transition = transition ? 'transform 1s' : ''
          this.transform(current.el, transform.y,transform.x,transform.r,transform.s)
        }

        current.offset = transform.offset

      }

      // EVENTS --------------------------------------------------------------

      if (view.visible){

        // enter events
        if (view.visible !== current.view.visible && update){
          let fromTop = current.bottom > scroll.top && current.top < scroll.top
          let fromBottom = current.top < scroll.top && current.top < scroll.top
          current.onEnter && current.onEnter()
          current.onEnterTop && fromTop && current.onEnterTop()
          current.onEnterBottom && fromBottom && current.onEnterBottom()
        }
      } else {

        // leave events
        if (view.visible !== current.view.visible && update){
          current.onLeave && current.onLeave()
          current.onLeaveTop && current.top > scroll.top && current.onLeaveTop()
          current.onLeaveBottom && bottom < scroll.top && current.onLeaveBottom()
        }
      }

      // SCROLL --------------------------------------------------------------

      if (view.visible || view.visible !== current.view.visible){

        // scroll
        if (current.onScroll){
          current.onScroll({
            scroll: instance.scroll,
            delta: instance.delta,
            scrolled: scrolled,
            percent: parseFloat(Math.min(Math.max((scroll.top - current.top) / (bottom - current.top),0), 1).toFixed(4)),
            entering: bottom > scroll.bottom,
            onScreen: bottom < scroll.bottom,
            leaving:current.top < scroll.top
          })
        }
      }

      current.view = view

    })

  }


  // SET ----------------------------------
  setScrollLimit() {
    this.instance.limit = this.el.offsetHeight - this.windowHeight;
  }

  // TRANSFORM ----------------------------
  transform(el,y = 0,x = 0,r = 0,s = 0){
    let transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
    transform += r ? ` rotate3d(0,0,1,${r}deg)` : ''
    transform += s ? ` scale3d(${s},${s},1)` : ''

    el.style.webkitTransform = transform
    el.style.msTransform = transform
    el.style.transform = transform
  }

  round(val,d){
    return parseFloat(val.toFixed(d))
  }

}
