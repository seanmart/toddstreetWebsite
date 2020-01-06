
import {getTranslate, getTop, getLeft, isObject, isFloat, isInt, isArray, lerp} from './utils'
import Element from './Element'

export default class {
  constructor(options = {}){

    Object.assign(this, {
      inertia: .8,
      smooth: true,
      el: document.getElementsByTagName('body')[0].firstElementChild
    }, options);

    this.checkScroll = this.checkScroll.bind(this);
    this.checkResize = this.checkResize.bind(this);
    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth
    this.shouldUpdate = null
    this.isTicking = false;
    this.inertia = this.inertia * .1
    this.inertiaRatio = 1;
    this.sections = [];
    this.elements = [];
    this.instance = {
      scroll:{x: 0,y:0},
      limit: this.el.offsetHeight - this.windowHeight
    }

    window.scrollTo(0,0)
    window.addEventListener('resize', this.checkResize, false);

  }

  init() {
    window.addEventListener("scroll", () => {
      if (!this.isTicking) {
        requestAnimationFrame(this.checkScroll)
        this.isTicking = true;
      }
      this.updateScroll();
    });
  }

  // CHECK -------------------------------

  checkScroll() {
    this.checkSections()
    this.transformElements();
    this.isTicking = false
  }

  checkResize(){
    clearTimeout(this.shouldUpdate)
    this.shouldUpdate = setTimeout(()=>{
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.update()
    },300)
  }

  checkSections(){
    let scroll = {}
    scroll.top = this.instance.scroll.y
    scroll.bottom = scroll.top + this.windowHeight

    this.sections.forEach((current,i)=>{
      let inView = (current.top <= scroll.top) && (current.bottom > scroll.top)
      if (inView){
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
      }

      if (current.onChange && inView !== current.inView){
        current.onChange({visible: inView })
      }
      this.sections[i].inView = inView
    })
  }

  // ADD -----------------------------

  addSection(el, params = {}){
    this.sections.push(new Element(el, params))
  }

  addElement(el,params = {}){
    this.elements.push(new Element(el, params))
  }

  // UPDATE -------------------------------

  update(){
    this.setScrollLimit()
    this.updateScroll()
    this.updateSections()
    this.updateElements()
    this.updateElementOffsets()
    this.transformElements()
  }

  updateScroll() {
    this.instance.scroll.y = window.scrollY;
    this.instance.scroll.x = window.scrollX;
  }

  updateSections(){
    this.sections.forEach(current => current.update())
  }
  updateElements(){
    this.elements.forEach(current=> current.update())
  }

  updateElementOffsets(){
    let scrollTop = this.instance.scroll.y
    let scroll = 0
    do{
      this.transformElements({scrollTop: scroll,update: false})
      scroll += 1
    }while(scroll < scrollTop)
  }

  // TRANSFORM ---------------------------

  transformElements({scrollTop = null, update = true, transition = true} = {scrollTop: null,update: true, transition: false}){

    let scroll = {}
    scroll.top = scrollTop ? scrollTop : this.instance.scroll.y
    scroll.bottom = scroll.top + this.windowHeight

    this.elements.forEach((current, i)=>{

      let distance = {x:0,y:0}
      let bottom = current.bottom + current.offset.y
      let inView = (current.top <= scroll.top) && (bottom > scroll.top)

      if (inView){
        let scrolled = scroll.top - current.top
        let percent = scrolled / (bottom - current.top)
        let entering = bottom - current.height > scroll.top
        let leaving = bottom < scroll.bottom

        if (update && current.onScroll){
          current.onScroll({scrolled,percent,entering,leaving})
        }

        if (current.parallax){
          distance.y = current.updateParallaxPosition(scrolled, 'y')
          distance.x = current.updateParallaxPosition(scrolled, 'x')
        }

        if (current.sticky){
          distance.y += current.updateStickyPosition(scrolled)
        }

        current.updateTransition(transition)
        current.offset = {...distance}

        if (update) this.transform(current.el, distance.x, distance.y)
      }

      if (update && current.onChange && inView !== current.inView){
        current.onChange({visible: inView })
      }

      current.inView = inView
    })
  }

  transform(element, x, y) {
      let transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
      element.style.webkitTransform = transform;
      element.style.msTransform = transform;
      element.style.transform = transform;
  }

  // SET ----------------------------------
  setScrollLimit() {
    this.instance.limit = this.el.offsetHeight - this.windowHeight;
  }

}
