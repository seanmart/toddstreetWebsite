import {minMax, getTransform, getRotation, getPosition, getValue, getOffset, transform} from './helpers'

export default class {
  constructor(){

    this.window = {
      height: null,
      width: null,
      el: document.documentElement
    }

    this.page = {
      el: null
    }

    this.scroll = {
      top:0,
      bottom: 0,
      last: 0,
      diff: 0,
      direction: null
    }

    this.events = {
      scroll: [],
      resize:[],
      mousemove: []
    }

    this.mouse = {
      relative:{
        x: 0,
        y: 0
      },
      real:{
        x:0,
        y:0
      }
    }

    this.isTicking = false
    this.keepTicking = false

    this.handleResize = this.handleResize.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleScroll = this.handleScroll.bind(this)

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('visibility', this.handleVisibility)
    window.addEventListener('scroll', this.handleScroll)

    if (!this.mobile){
      this.handleMouseMove = this.handleMouseMove.bind(this);
      window.addEventListener('mousemove', this.handleMouseMove)
    }

  }


    // -----------------------------------------------------------------------------------------------
    // INIT
    // -----------------------------------------------------------------------------------------------

    start(){
      this.update()
    }


    init(){
      window.scrollTo(0,0)

      this.updateWindow()

      this.elements = []
      this.sections = []

      this.page.el = null,

      this.scroll.top = 0
      this.scroll.bottom = 0
      this.scroll.last = 0
      this.scroll.direction = null

      this.events.scroll = []
      this.events.resize = []
      this.events.mousemove = []

      this.isTicking = false

    }


    // -----------------------------------------------------------------------------------------------
    // ADD
    // -----------------------------------------------------------------------------------------------



    addPage(el,s = false){
      this.page.el = el
      if (s) this.addSection(el)
    }

    addSection(el,o = {}){
      let s = {
        el: el,
        position: getPosition(el),
        initial: getTransform(el),
        values:{},
        visible: false,
        hover: false,
        onScroll: null,
        onLeave: null,
        onEnter: null,
        onMouseOver: null,
      }

      this.updateOptions(s,o)
      el.setAttribute("data-section","");
      this.sections.push(s)

    }

    addElement(el,o = {}){

        let e = {
          el: el,
          target: null,
          section: true,
          position: {},
          initial: getTransform(el),
          values:{},
          visible: false,
          hover: false,
          sticky: false,
          continue: false,
          inside: false,
          mobile: false,
          onScroll: null,
          onLeave: null,
          onEnter: null,
          onMouseOver: null,
          percent: 0,
          delay: 0,
          duration: 0,
          offsetTop:0,
          offsetBottom:0,
          x:null,
          y:null,
          r:null,
          s:null
        }

        this.updateOptions(e,o)
        el.setAttribute("data-element","");
        this.elements.push(e)

    }

    addEvent(type, key, fn){
      let index = this.events[type].findIndex(i => i.key == key)
      if (index < 0) this.events[type].push({key,fn})
    }



  // -----------------------------------------------------------------------------------------------
  // REMOVE
  // -----------------------------------------------------------------------------------------------



  removeEvent(type,key){
    let index = this.events[type].findIndex(i => i.key == key)
    if (index > -1) this.events[type].splice(index,1)
  }



  // -----------------------------------------------------------------------------------------------
  // CHECK
  // -----------------------------------------------------------------------------------------------



  checkScroll(scroll){

      this.scroll.last = this.scroll.top
      this.scroll.top = scroll
      this.scroll.bottom = this.scroll.top + this.window.height
      this.scroll.diff = Math.round(this.scroll.top - this.scroll.last)
      this.scroll.direction = this.scroll.last > this.scroll.top ? 'up' : 'down'
      this.mouse.relative.y += this.scroll.top - this.scroll.last

      this.sections.forEach(s => this.checkSection(s))
      this.elements.forEach(e => this.checkElement(e))
      this.events.scroll.forEach(e => e.fn(this.scroll))

  }

  checkDelay(els){
    els = els.filter((e)=> e.continue)
    if (els.length > 0){
      window.requestAnimationFrame(()=>{
        els.forEach(e => this.checkElement(e))
        if (!this.isTicking) this.checkDelay(els)
      })
    }
  }

  checkSection(s){
    let props = {}
    props.visible = s.start <= this.scroll.top && s.end >= this.scroll.top

    if (props.visible || s.visible){

      props.scrolled = this.scroll.top - s.start
      props.percent = minMax(s.scrolled / (s.distance),0,1)

      this.checkEvents(s,props)
      s.visible = props.visible
    }
  }

  checkElement(e){

      let props = {}
      props.visible = e.start <= this.scroll.top && e.end >= this.scroll.top

      if (props.visible || e.visible || e.continue ){

        props.scrolled = minMax(this.scroll.top - e.start, 0, e.distance)
        props.percent = minMax(props.scrolled / (e.distance),0,1)
        props.continue = false

        this.checkEvents(e,props)
        this.checkTransform(e, props)

        e.visible = props.visible
        e.percent = props.percent
        e.continue = props.continue

      }
  }

  checkTransform(e, props){

    let t = {...e.initial}

    if (props.percent > 0){
      if (e.x !== null) t.x += e.x * props.percent
      if (e.y !== null) t.y += e.y * props.percent
      if (e.r !== null) t.r += e.r * props.percent
      if (e.s !== null) t.s += e.s * props.percent
      if (e.sticky) t.y += props.scrolled
    }

    transform(e.el, t.x, t.y, t.r, t.s)

  }

  checkEvents(e,props){
    if (e.onEnter && props.visible && !e.visible) e.onEnter(this.scroll)
    if (e.onScroll) e.onScroll({scrolled: props.scrolled, percent: props.percent, scroll: this.scroll})
    if (e.onLeave && !props.visible && e.visible) e.onLeave(this.scroll)
    if (e.onMouseOver) this.handleMouseOver(e)
  }



  // -----------------------------------------------------------------------------------------------
  // UPDATE
  // -----------------------------------------------------------------------------------------------



  update(){

    this.updateWindow()

    this.sections.forEach(s => {
      s.position = getPosition(s.el)
      s.position.top += this.scroll.top
      s.position.bottom += this.scroll.top
      this.updateSection(s)
    })

    this.elements.forEach(e => {
      e.position = getPosition(e.target || e.el)
      e.position.top += this.scroll.top
      e.position.bottom += this.scroll.top
      this.updateElement(e)
    })
  }

  updateWindow(){
    this.window.height = window.innerHeight
    this.window.width = window.innerWidth
  }

  updateSection(s){
    s.start = Math.max(s.position.top - this.window.height,0)
    s.end = s.position.bottom
    s.distance = s.end - s.start
  }

  updateElement(e){
    let duration = getValue(e.duration,e.el)
    let inside = e.inside ? e.position.height : 0
    let offsetBottom = getValue(e.offsetBottom,e.el) + inside
    let offsetTop = getValue(e.offsetTop,e.el) + inside

    e.start = Math.max (e.position.top + offsetBottom - this.window.height,0)
    e.end = duration ? e.start + duration : e.position.bottom - offsetTop

    if (e.values.delay) e.delay = .15 / Math.abs(e.values.delay)

    if (e.values.x) e.x = isNaN(e.values.x) ? getValue(e.values.x,e.el) : (-e.values.x / 10) * (e.end - e.start)
    if (e.values.y) e.y = isNaN(e.values.y) ? getValue(e.values.y,e.el) : (-e.values.y / 10) * (e.end - e.start)
    if (e.values.r) e.r = isNaN(e.values.r) ? getValue(e.values.r,e.el) : (e.values.r / 100) * (e.end - e.start)
    if (e.values.s && !isNaN(e.values.s)) e.s = e.values.s - e.initial.s

    let offset = getOffset(e.x || 0, e.y || 0, e.r || 0, e.s == null ? 1 : e.s , e.position.height, e.position.width)

    e.end  += offset.y + offset.ry - offset.sy
    e.distance = e.end - e.start

  }

  updateOptions(e,o){

    Object.keys(o).forEach(key => {
      switch(key){

        case 'rotate':
          e.values.r = o.rotate
          break

        case 'scale':
          e.values.s = o.scale
          break

        case 'initial':
          if (!o.initial) e.initial = {x:0,y:0,r:0,s:1}
          break

        case 'y':
        case 'x':
        case 'delay':
          e.values[key] = o[key]
          break

        case 'offset':
          e.offsetTop = o.offset
          e.offsetBottom = o.offset
          break

        case 'offsetBottom':
        case 'offsetTop':
        case 'inside':
        case 'mobile':
        case 'duration':
        case 'onScroll':
        case 'onEnter':
        case 'onLeave':
        case 'sticky':
        case 'section':
          e[key] = o[key]
          break

        case 'target':
          e.target = o.target
          break

        case 'onMouseOver':
          if (!e.onMouseOver && o.onMouseOver) this.addEvent('mousemove',e.el,()=> this.handleMouseOver(e))
          if (e.onMouseOver && !o.onMouseOver) this.removeEvent('mousemove',e.el,()=> this.handleMouseOver(e))
          e.onMouseOver = o.onMouseOver

      }
    })
  }



  // -----------------------------------------------------------------------------------------------
  // HANDLE
  // -----------------------------------------------------------------------------------------------



  handleScroll(){
    if (!this.isTicking){
      this.isTicking = true
      window.requestAnimationFrame(()=>{
        this.checkScroll(window.scrollY)
        this.isTicking = false
      })
    }
  }

  handleResize(){
    this.update()
    this.checkScroll()
    this.events.resize.forEach(i => i.fn())
  }

  handleVisibility(){
    if (!document.hidden) this.update()
  }

  handleMouseMove(e){
    if (this.mobile) return

    this.mouse.relative.y = this.scroll.top + event.clientY;
    this.mouse.relative.x = event.clientX;
    this.mouse.real.y = event.clientY
    this.mouse.real.x = event.clientX

    this.events.mousemove.forEach(i => i.fn(e))
  }

  handleMouseOver(e){

    if (!e.visible) return

    let top = e.position.top
    let bottom = e.position.bottom
    let left = e.position.left
    let right = e.position.right

    if (e.y){
      top += e.y * e.percent
      bottom += e.y * e.percent
    }

    if (e.x){
      left += e.x * e.percent
      right += e.x * e.percent
    }

    let hover =
      this.mouse.relative.y >= top &&
      this.mouse.relative.y <= bottom &&
      this.mouse.relative.x >= left &&
      this.mouse.relative.x <= right;

    if (hover || e.hover){

      e.onMouseOver({
        entering: !e.hover && hover,
        leaving: e.hover && !hover,
        active: e.hover && hover,
        mouse: this.mouse.real,
        x: minMax(this.mouse.relative.x - left, 0, right - left),
        y: minMax(this.mouse.relative.y - top, 0, bottom - top)
      })

      e.hover = hover

    }
  }
}
