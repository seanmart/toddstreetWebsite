import tools from './tools'

export default class {
  constructor(){
    this.mobile = tools.isMobile()
    this.ticking = false
    this.inertia = this.mobile ? .9 : .07
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

  addSection(el,fn = null, options = {}){

    let section = {
      el: el,
      fn: fn,
      pos: {},
      persist: options.persist || false,
      active: false,
      visible: false,
      entered: false,
      leaving: false
    }

    this.updatePosition(section)
    let index = this.index++
    this.sections[index] = section
    section.el.dataset.index = index
    section.el.style.willChange = 'transform'
  }

  addElement(el,fn = null,options = {}){

    let element = {
      el: el,
      fn: fn,
      options: options,
      pos: {},
      visible: false,
      entered: false,
      leaving: false,
      offsetEnter: 0,
      offsetLeave: 0,
      sticky: false
    }

    this.updatePosition(element)
    this.updateOptions(element)

    let index = this.index++
    this.elements[index] = element
    element.el.dataset.index = index
  }

  // REMOVE
  removeSection(el){
    let index = el.dataset.index
    delete this.elements[index]
  }

  removeElement(el){
    let index = el.dataset.index
    delete this.elements[index]
  }

  removeEvent(fn){
    let index = this.events.findIndex(f => f == fn)
    if (index > -1) this.events.splice(index,1)
  }

  // CHECK

  checkScroll(force){
    this.ticking = Math.abs(this.scroll.top - this.window.scroll) > .5

    if (this.ticking){
      window.requestAnimationFrame(()=>{
        this.updateScroll()
        this.updateSections()
        this.updateElements()
        this.updateEvents()
        this.checkScroll()
      })
    }
  }

  // ON

  onResize(){
    this.updateWindow()
    this.updatePage()

    Object.keys(this.elements).forEach(key =>{
      this.updatePosition(this.elements[key])
      this.updateOptions(this.elements[key])
    })

    Object.keys(this.sections).forEach(key =>{
      this.updatePosition(this.sections[key])
    })

    this.checkScroll(true)
  }

  onScroll(){
    this.window.scroll = window.scrollY
    if (!this.ticking) this.checkScroll()
  }

  // UPDATE
  update(e){

    let top = e.pos.top + (e.offsetEnter || 0)
    let bottom = e.pos.bottom - (e.offsetLeave || 0)
    let visible = top < this.scroll.bottom && bottom > this.scroll.top

    if (e.fn && (visible || e.visible)){

      let entered = bottom < this.scroll.bottom
      let leaving = top < this.scroll.top

      let props = {}
      props.scroll = this.scroll
      props.entering = visible && !e.visible
      props.entered = entered && !e.entered
      props.leaving = leaving && !e.leaving
      props.left = !visible && e.visible
      props.scrolled = parseFloat((this.scroll.top - Math.max(top - this.window.height, 0)).toFixed(5))
      props.percent = parseFloat(Math.min(Math.max(props.scrolled / bottom,0),1).toFixed(5))
      props.pagePercent = parseFloat(Math.min(Math.max((this.scroll.top - top) / (this.window.height - top),0),1).toFixed(5))

      e.fn(props)

      e.entered = entered
      e.leaving = leaving

    }

    e.visible = visible

  }

  updateSections(){
    Object.keys(this.sections).forEach(key => {

      let section = this.sections[key]
      let top = section.pos.top - 500
      let bottom = section.pos.bottom + 500
      let active = top < this.scroll.bottom && bottom > this.scroll.top

      if (active || section.active){

        this.update(section)
        tools.transform(section.el,0,-this.scroll.top)

        if (active && !section.active){
          section.el.style.opacity = ''
        } else if (!active && section.active){
          section.el.style.opacity = 0
        }

      }

      section.active = active
    })
  }

  updateElements(){
    Object.keys(this.elements).forEach(key => {

      let element = this.elements[key]
      this.update(element)
      if (element.visible && element.sticky) tools.transform(element.el,0,top)
    })
  }

  updateEvents(){
    this.events.forEach(e => e(this.scroll))
  }

  updateScroll(){
    let last = this.scroll.top
    this.scroll.top = parseFloat(tools.lerp(this.scroll.top,this.window.scroll,this.inertia).toFixed(5))
    this.scroll.delta = this.scroll.top - last
    this.scroll.bottom = this.scroll.top + this.window.height
    this.scroll.direction = this.scroll.delta > 0 ? 'down' : 'up'
  }

  updatePosition(e){
    e.pos = tools.getPosition(e.el)
  }

  updateOptions(element){

    Object.keys(element.options).forEach(key => {
      switch(key){
        case 'offsetEnter':
        case 'offsetLeave':
        element[key] = tools.getValue(element.options[key])
        break

        case 'sticky':
        element[key] = element.options[key]
        break
      }
    })

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
