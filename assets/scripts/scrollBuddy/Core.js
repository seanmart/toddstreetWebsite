
import {getTranslate, isObject} from './utils'
import defaults from './options';

export default class {
  constructor(options = {}){

    Object.assign(this, defaults, options);

    this.checkScroll = this.checkScroll.bind(this);
    this.checkResize = this.checkResize.bind(this);

    window.scrollTo(0,0)
    window.addEventListener('resize', this.checkResize, false);

    this.html = document.documentElement
    this.body = document.getElementsByTagName('body')[0]
    this.el = this.body.firstElementChild

    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth

    this.shouldUpdate = null
    this.isTicking = false;

    this.sections = [];
    this.elements = [];
    this.events = {}

    this.instance = {
      scroll:{x: 0,y:0},
      limit: this.el.offsetHeight - this.windowHeight
    }

  }

  init(){

  }

  // CHECK -------------------------------

  checkScroll(){}

  checkResize(){
    clearTimeout(this.shouldUpdate)
    this.shouldUpdate = setTimeout(()=>{
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.update()
    },300)
  }

  checkSections(transform = null){
    let scrollTop = this.instance.scroll.y
    let scrollBottom = scrollTop + this.windowHeight

    this.sections.forEach((current,i)=>{
      let offset = current.offset
      let limit = current.limit
      let padding = 50
      let inView = scrollBottom >= offset - padding && scrollTop < limit + padding
      let events = current.event && this.events[current.event] ? this.events[current.event] : {}

      if (current.inView){
        if (events.scroll || current.onScroll){

          let scrolled = offset > this.windowHeight ? scrollBottom - offset : scrollTop
          let duration = offset > this.windowHeight ? (this.windowHeight + (limit - offset)) : limit
          let percent = Math.min(Math.max(parseFloat((scrolled / duration).toFixed(3)), 0), 1)

          if (current.onScroll){
            current.onScroll({percent, scrolled, duration})
          }

          if (events.scroll){
            events.scroll.forEach(func => func({percent, scrolled, duration}))
          }
        }
      }

      if (inView !== current.inView){
        current.onChange && current.onChange({visible: inView})
        events.change && events.change.forEach(func => func({visible: inView}))
      }

      this.sections[i].inView = inView

      transform && transform(current, offset, limit, scrollTop, scrollBottom)

    })
  }

  // UPDATE -------------------------------

  update(){
    this.setScrollLimit()
    this.updateSections()
    this.updateElements()
    this.transformElements()
    this.updateScroll()
  }

  updateSections(){
    this.sections.forEach((current, i)=>{

      let section = {}
      let rect = current.el.getBoundingClientRect()

      section.height = rect.height
      section.offset = rect.top - getTranslate(current.el).y
      section.limit = section.offset + rect.height

      this.sections[i] = Object.assign({},current, section)

    })
  }

  updateElements(){
    this.elements.forEach((current, i)=>{

      let element = {}
      element.top = this.getTop(current.el)
      element.height = current.el.offsetHeight
      element.bottom = element.top + element.height

      if (current.parallax){
        element.parallax = {...current.parallax}
        element.parallax.active = element.parallax.min ? element.parallax.min < this.windowWidth : true

      }

      this.elements[i] = Object.assign({},current, element)

    })

  }

  updateScrollEvents(){
    if (this.events[null]){
      this.events[null].scroll.forEach(func => func(this.instance.scroll))
    }
  }

  // ADD -----------------------------
  addScrollEvent(event, func){
    if (!this.events[event]) this.events[event] = {}
    if (!this.events[event].scroll) this.events[event].scroll = []
    this.events[event].scroll.push(func)
  }

  addChangeEvent(event, func){
    if (!this.events[event]) this.events[event] = {}
    if (!this.events[event].change) this.events[event].change = []
    this.events[event].change.push(func)
  }

  addElement(el, params = {}){

    let element = {}

    element.el = el
    element.height = el.offsetHeight
    element.top = this.getTop(el) - getTranslate(el).y
    element.bottom = element.top + element.height;
    element.event = params.event || null
    element.onScroll = params.onScroll || null
    element.onChange = params.onChange || null
    element.inView = element.top < this.instance.scroll.y + this.windowHeight && element.bottom > this.instance.scroll.y
    element.offset = 0

    if (params.sticky){
      element.sticky = {
        active: params.sticky.min ? params.sticky.min < this.windowWidth : true,
        min: params.sticky.min || 0,
        offset: params.sticky.offset ? (1 - params.sticky.offset) * this.windowHeight : this.windowHeight,
      }
    }

    if (params.parallax){

      element.parallax = {
        active: params.parallax.min ? params.parallax.min < this.windowWidth : true,
        speed: params.parallax.speed / 50 || 0,
        min: params.parallax.min || 0,
        horizontal: params.parallax.horizontal || false
      }
    }

    this.elements.push(element)
  }

  addSection(el, params = {}){

    let rect = el.getBoundingClientRect()
    let section = {}

    section.el = el
    section.height = rect.height
    section.offset = rect.top - getTranslate(el).y
    section.limit = section.offset + rect.height;
    section.event = params.event || null
    section.onChange = params.onChange || null
    section.onScroll= params.onScroll || null

    this.sections.push(section)
  }

  // TRANSFORM ---------------------------

  transformElements(){
    let scrollTop = this.instance.scroll.y
    let scrollBottom = scrollTop + this.windowHeight

    this.elements.forEach((current, i)=>{

      let padding = 20
      let top = current.top
      let bottom = current.bottom + current.offset
      let inView = (top) < scrollBottom && bottom > scrollTop
      let events = current.event && this.events[current.event] ? this.events[current.event] : {}

      if (current.inView){

        let scrolled = top > this.windowHeight ? scrollBottom - top : scrollTop
        let duration = top > this.windowHeight ? (this.windowHeight + (bottom - top)) : bottom

        if (events.scroll || current.onScroll){
          let percent = Math.min(Math.max(parseFloat((scrolled / duration).toFixed(3)), 0), 1)
          if (current.onScroll){
            current.onScroll({percent, scrolled, duration})
          }

          if (events.scroll){
            events.scroll.forEach(func => func({percent, scrolled, duration}))
          }
        }

        let distanceX = null
        let distanceY = null

        if (current.sticky && current.sticky.active){
          let offset = current.sticky.offset
          if (scrolled > offset){
            distanceY = scrollBottom - offset - top
          }
        }

        if (current.parallax){

          if (current.parallax.active){
            let speed = -current.parallax.speed * this.windowWidth / 250
            let parallaxDistance = current.parallax.speed > 0 && current.top > this.windowHeight
            ? (scrolled - current.height) * speed
            : scrolled * speed

            if (current.parallax.horizontal){
              distanceX = parallaxDistance
            } else {
              distanceY += parallaxDistance
            }
          } else {
            if (current.offset !== 0){
              distanceY = 0
              distanceX = 0
            }
          }
        }

        if (distanceX !== null && distanceY !== null){
          this.transform(current.el, distanceX, distanceY)
        } else if (distanceY !== null){
          this.transform(current.el, 0, distanceY)
        } else if (distanceX !== null){
          this.transform(current.el, distanceX, 0)
        }

        if (distanceY !== null){
          this.elements[i].offset = distanceY
        }

      }

      if (inView !== current.inView && (events.change || current.onChange)){
        current.onChange && current.onChange({visible: inView})
        events.change && events.change.forEach(func => func({visible: current.inView}))
      }

      this.elements[i].inView = inView

    })
  }

  transform(element, x, y, delay) {

      let transform;

      if(!delay) {
          transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
      } else {
          let start = getTranslate(element);
          let lerpX = lerp(start.x, x, delay);
          let lerpY = lerp(start.y, y, delay);

          transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${lerpX},${lerpY},0,1)`;
      }

      element.style.webkitTransform = transform;
      element.style.msTransform = transform;
      element.style.transform = transform;
  }

  // SET ----------------------------------

  setScrollLimit() {
    this.instance.limit = this.el.offsetHeight - this.windowHeight;
  }

  // GET ---------------------------------

  getTop(el){
    let top = 0
    do {
      top += el.offsetTop
      el = el.offsetParent;
    } while(el)
    return top
  }

}
