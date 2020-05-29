import tools from './tools'
import './polyfills/requestAnimationFrame.polyfill.js';

export default class{
  constructor(){
    this.ticking = false

    this.elements = {}
    this.sections = {}
    this.events = []

    this.window = {
      height: 0,
      width: 0
    }

    this.page = {
      el: null,
      height: 0,
      width: 0
    }

    this.scroll = {
      top: 0,
      bottom: window.innerHeight,
      delta: 0,
      direction: 'down'
    }

    this.scrollTo = {
      destination: 0,
      current: 0,
      ticking: false
    }

    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this)

    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('visibility', this.onResize)

    window.scrollTo(0,0)
    this.updateWindow()

  }

  // INIT

  init(){
    this.updatePage()
    Object.keys(this.elements).forEach(key => this.checkElement(this.elements[key]))
  }


  // ADD

  addPage(el){
    this.page.el = el
  }

  addSection(el){
    let section = {
      el: el,
      pos: tools.getPosition(el),
      active: false
    }
    let id = tools.generateId(7)
    this.sections[id] = section
    return id
  }

  addElement(el,fn = null,options = null){
    if (!options) options = {}
    if (options.offset){
      options.offsetEnter = options.offset
      options.offsetLeave = options.offset
    }

    let element = {
      el: el,
      fn: fn,
      pos: tools.getPosition(el),
      visible: false,
      scrolled: 0,
      status: '',
      options: options,
      offsetEnter: options.offsetEnter ? tools.getValue(options.offsetEnter,el) : 0,
      offsetLeave: options.offsetLeave ? tools.getValue(options.offsetLeave,el) : 0,
      sticky: options.sticky ? tools.getValue(options.sticky,el) : null
    }

    let id = tools.generateId(7)
    this.elements[id] = element

    return id
  }

  addEvent(fn){
    this.events.push(fn)
  }


  // REMOVE

  removeSection(id){
    delete this.sections[id]
  }

  removeElement(id){
    delete this.elements[id]
  }

  removeEvent(fn){
    let index = this.events.findIndex(f => f == fn)
    if (index > -1) this.events.splice(index,1)
  }


  // CHECK

  checkScroll(){}

  checkSection(s){
      let active = s.pos.top - 500 < this.scroll.bottom && s.pos.bottom + 500 > this.scroll.top

      if (active && !s.active) s.el.style.visibility = ''
      if (!active && s.active) s.el.style.visibility = 'hidden'
      if (active || s.active){
        let transform = `matrix(1,0,0,1,0,${-this.scroll.top})`
        s.el.style.webkitTransform = transform;
        s.el.style.msTransform = transform;
        s.el.style.transform = transform;
      }
      s.active = active
  }

  checkElement(e){

      let top = e.pos.top + (e.offsetEnter || 0)
      let bottom = e.pos.bottom - (e.offsetLeave || 0)
      let visible = top < this.scroll.bottom && bottom > this.scroll.top

      if (e.fn && (visible || e.visible)){

        let props = {}

        props.el = e.el
        props.window = this.window
        props.visible = visible
        props.scroll = this.scroll
        props.duration = this.window.height + e.pos.height
        props.offset = this.scroll.bottom - e.pos.top
        props.percent = Math.min(Math.max((props.offset / props.duration),0),1)
        props.scrolled = this.scroll.top - Math.max(top - this.window.height, 0)
        props.delta = props.scrolled - e.scrolled

        let percent = this.scroll.direction == 'down' ? props.percent : 1 - props.percent
        let status = visible && !e.visible ? `enter` : e.visible && !visible ? `leave` : `${Math.round(percent * 100)}%`

        props.status = e.status !== status ? status : null
        e.status = status

        e.fn(props)
        e.scrolled = props.scrolled

      }

      e.visible = visible

  }


  // ON

  onResize(){
    this.updateWindow()
    this.updatePage()

    Object.keys(this.elements).forEach(key =>{
      let e = this.elements[key]
      e.pos = tools.getPosition(this.elements[key].el)
      if (e.options.offsetEnter) e.offsetEnter = tools.getValue(e.options.offsetEnter, e.el)
      if (e.options.offsetLeave) e.offsetLeave = tools.getValue(e.options.offsetLeave, e.el)
    })

    Object.keys(this.sections).forEach(key =>{
      this.sections[key].pos = tools.getPosition(this.sections[key].el)
    })
  }

  onScroll(){
    this.window.scroll = window.scrollY
    if (!this.ticking) this.checkScroll()
  }


  // UPDATE

  updateWindow(){
    this.window.height = window.innerHeight
    this.window.width = window.innerWidth
  }

  updatePage(){
    this.page.height = this.page.el.offsetHeight
    this.page.width = this.page.el.offsetWidth
  }


  // SCROLLTO

  setScrollTo(el){
    if (typeof el == 'string') el = document.querySelector(el)
    if (!el) return

    this.scrollTo.destination = tools.getPosition(el).top

    if (!this.scrollTo.ticking) {
      this.scrollTo.current = this.scroll.top
      this.runScrollTo()
    }
  }

  runScrollTo(){
    this.scrollTo.current = tools.lerp(this.scrollTo.current, this.scrollTo.destination,.07)
    this.scrollTo.ticking = Math.abs(this.scrollTo.destination - this.scrollTo.current) > .5

    window.requestAnimationFrame(()=>{
      window.scrollTo(0,this.scrollTo.current)
      if (this.scrollTo.ticking) {
        this.runScrollTo()
      } else {

      }
    })
  }

}
