import tools from './tools'

export default class{
  constructor(scroll){
    this.scroll = scroll
    this.elements = []
    this.mouse = {clientX: 0, clientY: 0, pageX: 0, pageY: 0}


    this.onResize = this.onResize.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onGlobalMouse = this.onGlobalMouse.bind(this)

    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.onGlobalMouse)
    window.addEventListener('visibility', this.onResize)
    this.scroll.addEvent(this.onScroll)
  }

  // ELEMENT

  addElement(el,fn){

    let e = {
      el: el,
      fn: fn,
      pos: tools.getPosition(el),
      active: false
    }

    console.log(e)

    el.addEventListener('mousemove',()=> this.onMouseMove(e))
    this.elements.push(e)
  }

  removeElement(el){
    let index = this.elements.findIndex(e => e.el = el)
    if (index > -1){
      el.removeEventListener('mousemove',()=> this.onMouseMove(e))
      this.elements.splice(index,1)
    }
  }

  // ON

  onMouseMove(e){
    if (!this.active) this.checkMouse(e)
  }

  onResize(){
    this.elements.forEach(e => e.pos = tools.getPosition(e.el))
  }

  onScroll(scroll){
    this.mouse.pageY = scroll.top + this.mouse.clientY
    this.elements.forEach( e => this.checkMouse(e))
  }

  checkMouse(e){
    let active = e.pos.top < this.mouse.pageY
              && e.pos.bottom > this.mouse.pageY
              && e.pos.left < this.mouse.pageX
              && e.pos.right > this.mouse.pageX

    if (active || e.active){

      if (active && !e.active) this.run(e,'entering')
      if (active && e.active) this.run(e,'active')
      if (!active && e.active) this.run(e,'leaving')

      e.active = active
    }

  }

  onGlobalMouse(e){
    this.mouse = {
      pageX: e.pageX,
      pageY: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY
    }

    this.elements.forEach( e => e.active && this.checkMouse(e))
  }

  run(e, status){
    e.fn({
      ...this.mouse,
      x: this.mouse.pageX - e.pos.left,
      y: this.mouse.pageY - e.pos.top,
      entering: status == 'entering',
      active: status == 'active',
      leaving: status == 'leaving',
      }
    )
  }
}
