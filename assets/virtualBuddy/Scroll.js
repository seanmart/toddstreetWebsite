import tools from './tools'

export default class {
  constructor(){
    this.ticking = false
    this.keepTicking = false
    this.inertia = .08

    this.elements = {}
    this.sections = {}
    this.events = []

    this.scrollTo = {
      ticking: false,
      to: 0,
      top: 0
    }

    this.scroll = {
      top: 0,
      bottom: window.innerHeight,
      delta: 0,
      direction: 'down'
    }

    this.window = {
      height: 0,
      width: 0,
      scroll: 0
    }

    this.page = {
      el: null,
      height: 0,
      width: 0
    }

    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this)

    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('visibility', this.onResize)

    document.body.style.overscrollBehavior = 'none'
    window.scrollTo(0,0)

    this.updateWindow()
  }

  // ADD
  addPage(el){
    this.page.el = el
    el.style.position = 'fixed'
    el.style.top = '0px'
    el.style.left = '0px'
    el.style.right = '0px'

    this.updatePage()
  }

  addEvent(fn){
    this.events.push(fn)
  }

  addSection(el){
    let section = {
      el: el,
      pos: tools.getPosition(el),
      active: false
    }

    let index
    do { index = tools.generateId(5) } while (this.sections[index])
    this.sections[index] = section
    el.dataset['scroll'] = index
    el.style.willChange = 'transform'

    this.checkSection(section)

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
      offsetEnter: options.offsetEnter ? tools.getValue(options.offsetEnter) : 0,
      offsetLeave: options.offsetLeave ? tools.getValue(options.offsetLeave) : 0,
      sticky: options.sticky ? tools.getValue(options.sticky) : null
    }

    let index
    do { index = tools.generateId(5) } while (this.elements[index])
    this.elements[index] = element
    el.dataset['scroll'] = index

    if (options.immediate) this.checkElement(element)

  }

  // REMOVE
  removeSection(el){
    let id = el.dataset['scroll']
    delete this.sections[id]
  }

  removeElement(el){
    let id = el.dataset['scroll']
    delete this.elements[id]
  }

  removeEvent(fn){
    let index = this.events.findIndex(f => f == fn)
    if (index > -1) this.events.splice(index,1)
  }

  // CHECK

  checkScroll(){
    this.ticking = Math.abs(this.scroll.top - this.window.scroll) > .05
    this.keepTicking = false

    this.updateScroll()
    Object.keys(this.elements).forEach(key => this.checkElement(this.elements[key]))
    this.events.forEach(e => e(this.scroll))

    window.requestAnimationFrame(()=>{
      Object.keys(this.sections).forEach(key => this.checkSection(this.sections[key]))
      if (this.ticking || this.keepTicking) this.checkScroll()
    })

  }

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
      if (e.options.offsetEnter) e.offsetEnter = tools.getValue(e.options.offsetEnter)
      if (e.options.offsetLeave) e.offsetLeave = tools.getValue(e.options.offsetLeave)
    })

    Object.keys(this.sections).forEach(key =>{
      this.sections[key].pos = tools.getPosition(this.sections[key].el)
    })

    this.checkScroll(true)
  }

  onScroll(){
    this.window.scroll = window.scrollY
    if (!this.ticking) this.checkScroll()
  }

  // UPDATE

  updateElement(el,fn = null,options = {}){

    if (!options) options = {}
    if (options.mobile == false) return

    if (options.hasOwnProperty('offset')){
      options.offsetEnter = options.offset
      options.offsetLeave = options.offset
    }

    let id = el.dataset['scroll']
    let element = this.elements[id]

    if (fn) element.fn = fn

    if (options.hasOwnProperty('offsetEnter')){
      element.offsetEnter = tools.getValue(options.offsetEnter)
    }

    if (options.hasOwnProperty('offsetLeave')){
      element.offsetEnter = tools.getValue(options.offsetEnter)
    }

  }

  updateScroll(){
    let last = this.scroll.top
    this.scroll.top = parseFloat(tools.lerp(this.scroll.top,this.window.scroll,this.inertia).toFixed(5))
    this.scroll.delta = this.scroll.top - last
    this.scroll.bottom = this.scroll.top + this.window.height
    this.scroll.direction = this.scroll.delta > 0 ? 'down' : 'up'
  }

  updateWindow(){
    this.window.height = window.innerHeight
    this.window.width = window.innerWidth
  }

  updatePage(){
    this.page.height = this.page.el.offsetHeight
    this.page.width = this.page.el.offsetWidth
    document.body.style.height = `${this.page.height}px`
  }

  // SCROLL

  setScrollTo(el){
    if (typeof el == 'string') el = document.querySelector(el)
    if (!el) return

    this.scrollTo.to = tools.getPosition(el).top

    if (!this.scrollTo.ticking) {
      this.scrollTo.top = this.scroll.top
      this.updateScrollTo()
    }
  }

  updateScrollTo(){
    window.requestAnimationFrame(()=>{

      this.scrollTo.top = tools.lerp(this.scrollTo.top,this.scrollTo.to,.05)
      this.scrollTo.ticking = (Math.abs(this.scrollTo.to - this.scrollTo.top) > 1)
      window.scrollTo(0,this.scrollTo.top)

      if (this.scrollTo.ticking) this.updateScrollTo()
    })
  }
}
