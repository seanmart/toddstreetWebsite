
import {getTranslate, getTop, getLeft, isObject, isFloat, isInt, isArray, lerp} from './utils'

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

      let inView = (current.pos.top <= scroll.top) && (current.pos.bottom > scroll.top)

      if (inView){

        let offset = scroll.top - current.pos.top
        let percent = offset / (current.pos.bottom - current.pos.top)

        if (current.onScroll){
          current.onScroll({
            scrolled: offset,
            percent: percent,
            entering: current.pos.bottom - current.pos.height > scroll.top,
            leaving: current.pos.bottom < scroll.bottom
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

  addSection(el, props = {}){
    let s = {}

    s.el = el
    s.pos = this.setPosition(el)
    s.inView = false
    s.onChange = props.onChange || null
    s.onScroll= props.onScroll || null
    s.offset = {x:0, y:0}

    this.sections.push(s)
  }

  addElement(el,props = {}){
    let e = {}

    e.el = el
    e.pos = this.setPosition(el)
    e.inView = false
    e.transition = false
    e.onScroll = props.onScroll || null
    e.onChange = props.onChange || null
    e.offset = {x:0,y:0}

    if (props.parallax){
      e.parallaxData = this.sortData(props.parallax)
      e.parallax = this.setParallax(e)
    }

    if (props.sticky){
      e.stickyData = this.sortData(props.sticky)
      e.sticky = this.setSticky(e)
    }

    this.elements.push(e)
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
    this.sections.forEach((current, i)=>{

      let s = {...current}
      let rect = s.el.getBoundingClientRect()

      s.height = rect.height
      s.offset = rect.top - getTranslate(s.el).y
      s.limit = s.offset + rect.height

      this.sections[i] = s

    })

  }

  updateElements(){
    this.elements.forEach((current,i)=>{

      let e = {...current}

      e.pos = this.setPosition(e.el)

      if (e.parallaxData) e.parallax = this.setParallax(e)
      if (e.stickyData) e.sticky = this.setSticky(e)
      e.offset = {x:0, y:0}

      this.elements[i] = e
    })
  }

  updateElementOffsets(){

    let scrollTop = this.instance.scroll.y
    let scroll = 0

    do{
      this.transformElements({scrollTop: scroll,update: false})
      scroll += 2

    }while(scroll < scrollTop)
  }

  // TRANSFORM ---------------------------

  transformElements({scrollTop = null, update = true, transition = true} = {scrollTop: null,update: true, transition: false}){

    let scroll = {}
    scroll.top = scrollTop ? scrollTop : this.instance.scroll.y
    scroll.bottom = scroll.top + this.windowHeight

    this.elements.forEach((current, i)=>{

      let distance = {x:0,y:0}
      let bottom = current.pos.bottom + current.offset.y
      let inView = (current.pos.top <= scroll.top) && (bottom > scroll.top)

      if (inView){
        let offset = scroll.top - current.pos.top
        let percent = offset / (bottom - current.pos.top)

        if (current.onScroll && update){
          current.onScroll({
            scrolled: offset,
            percent: percent,
            entering: bottom - current.pos.height > scroll.top,
            leaving: bottom < scroll.bottom
          })
        }

        if (current.parallax){
          let p = current.parallax
          if (p.speed.y && offset > p.offset) distance.y = (offset - p.offset) * p.speed.y
          if (p.speed.x && offset > p.offset) distance.x = (offset - p.offset) * p.speed.x
        }

        if (current.sticky){
          let s = current.sticky
          if (offset > s.offset){
            distance.y += offset < s.duration ? (offset - s.offset) - s.position : current.offset.y
          }
        }

        this.elements[i].offset = {...distance}

        if (current.transition){
          current.el.style.transition = ''
          this.elements[i].transition = false
        }
        if(transition){
          current.el.style.transition = 'transform 1s'
          this.elements[i].transition = true
        }

        update && this.transform(current.el, distance.x, distance.y)

      }

      if (update && current.onChange && inView !== current.inView){
        current.onChange({visible: inView })
      }

      this.elements[i].inView = inView
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

  setPosition(el){
    let pos = {}
    let top = getTop(el)
    let left = getLeft(el)
    pos.top = Math.max(top - this.windowHeight,0)
    pos.left = Math.max(left - this.windowWidth,0)
    pos.width = el.offsetWidth
    pos.height = el.offsetHeight
    pos.bottom = top + pos.height
    pos.right = left + pos.width

    return pos
  }

  setParallax(e){
    let props = this.getData(e.parallaxData)
    if (!props) return null

    let parallax = {}

    parallax.speed = {
      x: props.xSpeed ? -parseFloat((this.getValue(props.xSpeed,e)/10).toFixed(3)) : 0,
      y: props.ySpeed ? -parseFloat((this.getValue(props.ySpeed,e)/10).toFixed(3)) : 0
    }

    parallax.offset = props.offset ? this.getValue(props.offset,e) : 0

    return parallax

  }

  setSticky(e){
    let props = this.getData(e.stickyData)
    if (!props) return null

    let sticky = {}

    sticky.offset = props.offset ? this.getValue(props.offset,e) : 0
    sticky.position = props.position ? this.getValue(props.position,e) : 0
    if (sticky.position) sticky.offset = 0
    sticky.duration = props.duration ? this.getValue(props.duration,e) : 0

    return sticky

  }

  // GET ---------------------------------
  getData(props,e){
    if (!isArray(props)) props = [props]
    let check = (m) => m < this.windowWidth
    return props.reduce((a,p)=> (check(p.min || 0)) ? p : a, null)
  }

  sortData(props){
    if (!isArray(props)) return props
    return props.sort((a,b)=>{
      let aMin = a.min || 0
      let bMin = b.min || 0
      return aMin - bMin
    })
  }

  getValue(v,e){
    // acceptable values 'px','vh','vw','% = % of element' defaults to px

    if (isInt(v) || isFloat(v)){
      return v
    }
    if (typeof v === 'string'){

      let num = parseFloat(v)

      if (v.indexOf('%y') !== -1){
        return num * (e.pos.height/100)
      }
      if (v.indexOf('%x') !== -1){
        return num * (e.pos.width/100)
      }
      if (v.indexOf('vh') !== -1){
        return num * (this.windowHeight/100)
      }
      if (v.indexOf('vw') !== -1){

        return num * (this.windowWidth/100)
      }
      if (v.indexOf('px') !== -1){
        return num
      }
    }
  }

}
