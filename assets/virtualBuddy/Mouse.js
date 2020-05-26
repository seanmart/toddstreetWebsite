import tools from './tools'
export default class{
  constructor(scroll){

    this.runFunction = this.runFunction.bind(this)

    this.scroll = scroll

    this.mouse = {
      pageX:0,
      pageY:0,
      clientY:0,
      clientX: 0
    }

    this.elements = {}

    window.addEventListener('mousemove', (e)=> {
      this.mouse = {
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY
      }
    })

    window.addEventListener('resize',()=>{
      Object.keys(this.elements).forEach(key => {
        let element = this.elements[key]
        element.pos = tools.getPosition(element.el)
      })
    })

  }

  addElement(el,fn = null){

    if (!fn) return

    let element = {
      el: el,
      fn: fn,
      active: false,
      pos: tools.getPosition(el)
    }

    this.scroll.addElement(el,(e)=> this.handleScroll(element,e))
    el.addEventListener('mousemove',()=> this.runFunction(element, true))
    el.addEventListener('mouseleave',()=> this.runFunction(element,false))
    el.addEventListener('click',()=> element.fn({click: true}))

    let id = tools.generateId(12)
    this.elements[id] = element
    el.dataset['mouse'] = id
  }

  removeElement(el){
    let id = el.dataset['mouse']
    let element = this.elements[id]

    this.scroll.removeElement(el)
    el.removeEventListener('mousemove',()=> this.runFunction(element, true))
    el.removeEventListener('mouseleave',()=> this.runFunction(element,false))

    delete this.elements[id]
  }

  handleScroll(element,e){
    let y = this.mouse.clientY + e.scroll.top
    let active = element.pos.top < y && element.pos.bottom > y
    if ( active || element.active) {
      this.runFunction(element, active)
      this.mouse.pageY = y
    }
  }

  runFunction(element, active){

    element.fn({
      entering: !element.active && active,
      active: element.active && active,
      leaving: element.active && !active,
      mouse: {
        ...this.mouse,
        x: this.mouse.pageX - element.pos.left,
        y: this.mouse.pageY - element.pos.top
      }
    })

    element.active = active
  }
}
