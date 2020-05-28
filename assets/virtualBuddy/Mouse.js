import tools from './tools'

export default class{
  constructor(scroll){
    this.scroll = scroll
    this.elements = {}
    this.inView = []
    this.scrollY = 0

    this.updateElementsPosition = this.updateElementsPosition.bind(this)
    this.updateMouseOnScroll = this.updateMouseOnScroll.bind(this)
    this.checkActive = this.checkActive.bind(this)
    this.updateMouse = this.updateMouse.bind(this)

    this.scroll.addEvent(this.updateMouseOnScroll)
    window.addEventListener('mousemove',this.updateMouse)
    window.addEventListener('resize',this.updateElementsPosition)

    this.mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  }

  // ADD

  addElement(el,fn){

    let id = tools.generateId(5)

    let element = {
      el: el,
      fn: fn,
      active: false,
      pos: tools.getPosition(el)
    }

    let scrollFunction = (e)=>{
      if (e.status == 'enter') this.addInView(id)
      if (e.status == 'leave') this.removeInView(id)
      if (e.visible) this.checkActive(element)
    }

    element.scrollId = this.scroll.addElement(el,scrollFunction,{immediate: true})
    this.elements[id] = element

    return id
  }

  addInView(id){
    this.inView.push(id)
  }

  // REMOVE

  removeElement(id){
    this.scroll.removeElement(this.elements[id].scrollId)
    this.removeInView(id)
    delete this.elements[id]
  }

  removeInView(id){
    let index = this.inView.findIndex(a => a == id)
    if (index > -1) this.inView.splice(index,1)
  }

  // UPDATE

  updateMouseOnScroll(e){
    this.scrollY = e.top
  }

  updateMouse(e){
    this.busy = true
    this.mouse = {
      x: e.clientX,
      y: e.clientY
    }
    if (this.inView.length > 0) this.checkInview()
    this.busy = false
  }

  updateElementsPosition(){
    Object.keys(this.elements).forEach(id => {
      let e = this.elements[id]
      e.pos = tools.getPosition(e.el)
    })
  }


  // CHECK

  checkInview(){
    this.inView.forEach( id => this.checkActive(this.elements[id]))
  }

  checkActive(e){
    let y = this.mouse.y + this.scrollY

    let active = e.pos.top < y
              && e.pos.bottom > y
              && e.pos.left < this.mouse.x
              && e.pos.right > this.mouse.x

    if (active || e.active) this.run(e,active)
  }

  // RUN

  run(e,active){
    e.fn({
      entering: !e.active && active,
      active: e.active && active,
      leaving: e.active && !active,
      pageX: this.mouse.x,
      pageY: this.mouse.y + this.scrollY,
      x: this.mouse.x - e.pos.left,
      y: this.mouse.y + this.scrollY - e.pos.top
    })
    e.active = active
  }
}
