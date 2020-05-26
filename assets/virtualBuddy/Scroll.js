import tools from './tools'

export default class {
  constructor(){
    this.ticking = false
    this.inertia = .09
    this.index = 0

    this.elements = {}
    this.sections = {}
    this.events = []

    this.scroll = {
      top: 0,
      bottom: 0,
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
    document.body.scrollTop = 0

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

    let index = tools.generateId(12)
    this.sections[index] = section
    el.dataset['scroll'] = index
    el.style.willChange = 'transform'

  }

  addElement(el,fn = null,options = {}){

    if (options.mobile == false) return

    if (options.offset){
      options.offsetEnter = options.offset
      options.offsetLeave = options.offset
    }

    let element = {
      el: el,
      fn: fn,
      pos: tools.getPosition(el),
      visible: false,
      status: '',
      options: options,
      offsetEnter: options.offsetEnter ? tools.getValue(options.offsetEnter) : 0,
      offsetLeave: options.offsetLeave ? tools.getValue(options.offsetLeave) : 0,
      sticky: options.sticky ? tools.getValue(options.sticky) : null
    }

    let index = tools.generateId(12)
    this.elements[index] = element
    el.dataset['scroll'] = index
  }

  // REMOVE
  removeSection(el){
    let index = el.dataset['scroll']
    delete this.sections[index]
  }

  removeElement(el){
    let index = el.dataset['scroll']
    delete this.elements[index]
  }

  removeEvent(fn){
    let index = this.events.findIndex(f => f == fn)
    if (index > -1) this.events.splice(index,1)
  }

  // CHECK

  checkScroll(){
    this.ticking = Math.abs(this.scroll.top - this.window.scroll) > .05

    this.updateScroll()
    this.updateElements()
    this.events.forEach(e => e(this.scroll))

    window.requestAnimationFrame(()=>{
      this.updateSections()
      this.ticking && this.checkScroll()
    })

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

  updateSections(){
    Object.keys(this.sections).forEach(key => {
      let s = this.sections[key]
      let active = s.pos.top - 500 < this.scroll.bottom && s.pos.bottom + 500 > this.scroll.top

      if (active && !s.active) s.el.style.visibility = 'visible'
      if (!active && s.active) s.el.style.visibility = 'hidden'
      if (active || s.active){
        let transform = `matrix(1,0,0,1,0,${-this.scroll.top})`
        s.el.style.webkitTransform = transform;
        s.el.style.msTransform = transform;
        s.el.style.transform = transform;
      }
      s.active = active
    })
  }

  updateElements(){
    Object.keys(this.elements).forEach(key => {

      let e = this.elements[key]
      let top = e.pos.top + (e.offsetEnter || 0)
      let bottom = e.pos.bottom - (e.offsetLeave || 0)
      let visible = top < this.scroll.bottom && bottom > this.scroll.top

      if (e.fn && (visible || e.visible)){

        let props = {}

        props.element = e
        props.scroll = this.scroll
        props.scrolled = parseFloat((this.scroll.top - Math.max(top - this.window.height, 0)).toFixed(5))
        props.duration = bottom - Math.max(top - this.window.height,0)
        props.percent = parseFloat(Math.min(Math.max(props.scrolled / props.duration,0),1).toFixed(5))
        props.pagePercent = parseFloat(Math.min(Math.max((this.scroll.top - top) / (this.window.height - top),0),1).toFixed(5))

        let percent = this.scroll.direction == 'down' ? props.percent : 1 - props.percent
        let status = visible && !e.visible ? `enter` : e.visible && !visible ? `leave` : `${Math.round(percent * 100)}%`

        props.status = e.status !== status ? status : ''
        e.status = status

        e.fn(props)

      }

      e.visible = visible

    })
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
}
