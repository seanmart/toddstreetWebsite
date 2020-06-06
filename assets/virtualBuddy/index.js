import tools from './tools'
import Scroll from './Scroll'
import Mouse from './Mouse'
import Resize from './Resize'


export default class{
  constructor(){

    this.touch = tools.isTouch()
    this.onScroll = this.onScroll.bind(this)
    this.onMouse = this.onMouse.bind(this)
    this.onResize = this.onResize.bind(this)

    this.resize = new Resize(this.onResize)
    this.scroll = new Scroll(this.onScroll, this.touch,this.resize)
    this.mouse = new Mouse(this.onMouse, this.scroll, this.resize)

    this.sections = []
    this.elements = []
    this.mouseElements = []

    this.resizeTimeout = null

  }

  // INIT

  init(){
    for (let i = 0; i < this.sections.length; i++){
      this.sections[i].pos = tools.getPosition(this.sections[i].el)
    }

    for (let i = 0; i < this.elements.length; i++){
      let element = this.elements[i]
      element.pos = tools.getPosition(element.el)
      element.start = element.offsetTop ? element.pos.top + tools.getValue(element.offsetTop) : element.pos.top
      element.end = element.offsetBottom ? element.pos.bottom - tools.getValue(element.offsetBottom) : element.pos.bottom

      if (element.immediate){
        this.checkElement(element,{
          top: this.scroll.top,
          bottom: this.scroll.bottom,
          direction: this.scroll.direction,
          delta: this.scroll.delta
        })
      }
    }

    this.scroll.init()
  }

  // SECTION

  addSection(el){
    let id = tools.generateId(6)

    this.sections.push({
      el: el,
      id: id,
      pos: {},
      active: false
    })

    return id
  }

  removeSection(id){
    let index = this.sections.findIndex(section => section.id == id)
    if (index > -1) this.sections.splice(index,1)
  }

  checkSections(section, scroll){

      let active = section.pos.top - this.resize.height < scroll.bottom && section.pos.bottom + this.resize.height > scroll.top

      if (active && !section.active) section.el.style.visibility = ''
      if (!active && section.active) section.el.style.visibility = 'hidden'

      if (active){
        let transform = `matrix(1,0,0,1,0,${-scroll.top})`
        section.el.style.webkitTransform = transform;
        section.el.style.msTransform = transform;
        section.el.style.transform = transform;
      }

      section.active = active

  }


  // ELEMENT

  addElement(el,props = {},immediate = false){

    let id = tools.generateId(6)

    let element = {
      id: id,
      el: el,
      pos: {},
      scroll: props.scroll || null,
      resize: props.resize || null,
      mouse: props.mouse || null,
      offsetTop: props.offsetTop || null,
      offsetBottom: props.offsetBottom || null,
      visible: false,
      mouseover: false,
      immediate: immediate
    }

    this.elements.push(element)

    return id
  }

  removeElement(id){
    let index = this.elements.findIndex(e => e.id == id)
    if (index > -1) this.elements.splice(index,1)

    index = this.mouseElements.findIndex(e => e.id == id)
    if (index > -1) this.mouseElements.splice(index,1)
  }

  checkElement(element,scroll){

      let visible = element.start < scroll.bottom && element.end > scroll.top

      if (element.visible || visible){

        if (element.scroll){

          let duration = this.resize.height + (element.end - element.start)
          let offset = Math.min(Math.max(scroll.bottom - element.start,0),duration)
          let scrolled = scroll.top - Math.max(element.start - this.resize.height, 0)

          element.scroll({
            scroll,
            window:{
              width: this.resize.width,
              height: this.resize.height
            },
            el: element.el,
            id: element.id,
            position: element.pos,
            offset: offset,
            scrolled: scrolled,
            enter: visible && !element.visible,
            leave: !visible && element.visible,
            percent: Math.min(Math.max(offset / duration,0),1),
          })
        }

        if (element.mouse && !this.touch){
          visible && !element.visible && this.addMouseElement(element)
          !visible && element.visible && this.removeMouseElement(element)
        }

        element.visible = visible
      }
  }


  // SCROLL

  onScroll(scroll){
    if (!this.touch){
      for (let i = 0; i < this.sections.length; i++){
        this.checkSections(this.sections[i],scroll)
      }
    }

    for (let i = 0; i < this.elements.length; i++){
      this.checkElement(this.elements[i], scroll)
    }
  }

  // MOUSE

  onMouse(mouse){
    this.mouseElements.forEach(element => {

      let mouseover = element.pos.left < mouse.pageX
                   && element.pos.right > mouse.pageX
                   && element.pos.top < mouse.pageY
                   && element.pos.bottom > mouse.pageY

      if (mouseover || element.mouseover){

        let x = Math.min(Math.max(mouse.pageX - element.pos.left,0),element.pos.width)
        let y = Math.min(Math.max(mouse.pageY - element.pos.top,0),element.pos.width)

        element.mouse({
          ...mouse,
          enter: mouseover && !element.mouseover,
          leave: !mouseover && element.mouseover,
          active: mouseover && element.mouseover,
          el: element.el,
          pos: element.pos,
          x: x,
          y: y
        })

        element.mouseover = mouseover
      }
    })
  }

  addMouseElement(element){
    this.mouseElements.push(element)
  }

  removeMouseElement(element){
    let index = this.mouseElements.findIndex(e => e.id == element.id)
    if (index > -1) this.mouseElements.splice(index,1)
  }

  // RESIZE

  onResize(){

    for (let i = 0; i < this.sections.length; i++){
      this.sections[i].pos = tools.getPosition(this.sections[i].el)
    }

    for (let i = 0; i < this.elements.length; i++){
      let element = this.elements[i]
      element.pos = tools.getPosition(element.el)

      element.start = element.offsetTop ? element.pos.top + tools.getValue(element.offsetTop) : element.pos.top
      element.end = element.offsetBottom ? element.pos.bottom - tools.getValue(element.offsetBottom) : element.pos.bottom

      if (element.resize) this.elements[i].resize({
        el: element.el,
        position: element.pos,
        window: {
          height: this.resize.height,
          width: this.resize.width
        }
      })
    }

  }

}
