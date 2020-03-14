
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
    if (Object.keys(params).length == 0) return
    this.elements.push(new Element(el, params))
  }

  // UPDATE -------------------------------

  update(){
    this.setScrollLimit()
    this.updateScroll()
    this.updateElements()
    this.transformElements({transition: true})
  }

  updateScroll() {
    this.instance.scroll.y = window.scrollY;
    this.instance.scroll.x = window.scrollX;
  }

  updateElements(){
    this.elements.forEach(current=> current.update())
  }

  // TRANSFORM ---------------------------

  transformElements({update = true, transition = false, scroll = null, reset = null } = {}){

    let scrollTop = scroll || this.instance.scroll.y
    let scrollBottom = scrollTop + this.windowHeight

    let count = 0

    this.elements.forEach((current,i) => {

      // position ===============================================

      let top = current.offsetTop
                ? current.top + current.offsetTop
                : current.top

      let bottom = current.offsetBottom
                   ? current.bottom - current.offsetBottom
                   : current.duration
                   ? Math.max(top, 0) + current.duration
                   : current.bottom + current.bottomOffset

      let inView = top - current.padding <= scrollTop && bottom + current.padding >= scrollTop
      if (!current.inView && !inView) return

      count++

      let below = top > scrollTop
      let above = bottom < scrollTop
      let visible = top <= scrollTop && bottom >= scrollTop

      let transform = {y: 0, x: 0, scale: 1, rotate: 0, scroll: 0 }
      let scrolled = scrollTop - Math.max(top,0)

      // transforms ===============================================

      if (current.transform && (inView || visible !== current.visible) ){

        let y = 0
        if (current.scroll) transform.y -= Math.max(top,0) + scrolled
        if (current.y) y += scrolled * current.y
        if (current.sticky) y += scrolled
        if (current.x) transform.x += scrolled * current.x
        if (current.scale) transform.scale += scrolled * current.scale
        if (current.rotate) transform.rotate += scrolled * current.rotate

        current.bottomOffset = y
        transform.y += y

        this.transform(current.el, transform, transition)

      }

      // section ===============================================

      if (current.section && current.inView !== inView){
        if (inView){
          current.el.style.opacity = 1
          current.el.style.pointerEvents = 'all'
        } else {
          current.el.style.opacity = 0
          current.el.style.pointerEvents = 'none'
          this.transform(current.el, {x:0,y:0,scale: 1,rotate:0}, transition)
        }
      }

      // onscroll ===============================================

      if (current.onScroll && (visible || current.visible !== visible)){
          current.onScroll({
            scrolled: scrollTop - Math.max(top,0),
            scroll: this.instance.scroll,
            delta: this.instance.delta,
            percent: Math.min(Math.max((scrollTop - top) / (bottom - top),0), 1),
            entering: bottom > scrollBottom,
            onScreen: bottom < scrollBottom,
            leaving: top < scrollTop
          },
          current.el
        )
      }

      // events ===============================================

      if (current.visible !== visible){
        if (visible){
          if (current.onEnterBottom && below) current.onEnterBottom(current.el)
          if (current.onEnterTop && !below) current.onEnterTop(current.el)
          if (current.onEnter) current.onEnter(current.el)
        } else {
          if (current.onLeaveBottom && !below) current.onLeaveBottom(current.el)
          if (current.onLeaveTop && below) current.onLeaveTop(current.el)
          if (current.onLeave) current.onLeave(current.el)
        }
      }

      current.visible = visible
      current.inView = inView

      //console.log(count)
    })
  }

  // SET ----------------------------------
  setScrollLimit() {
    this.instance.limit = this.el.offsetHeight - this.windowHeight;
  }

  // TRANSFORM ----------------------------
  transform(el,{y = 0,x = 0,rotate = 0,scale = 1},transition){

    let transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
    transform += rotate ? ` rotate3d(0,0,1,${rotate}deg)` : ''
    transform += scale !== 1 ? ` scale3d(${scale},${scale},1)` : ''

    el.style.transition = transition ? 'transform 1s' : ''
    el.style.webkitTransform = transform
    el.style.msTransform = transform
    el.style.transform = transform
  }

  round(val,d){
    return parseFloat(val.toFixed(d))
  }

}
