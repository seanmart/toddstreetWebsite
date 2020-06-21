import {getPosition} from './tools'

export default class{
  constructor(){
    this.elements = []
    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth
    this.update = this.update.bind(this)

    window.addEventListener('resize', ()=> {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      this.elements.forEach(e => e.pos = getPosition(e.el))
    })
  }

  add(el,callback){
    this.elements.push({
      el,
      callback,
      pos: getPosition(el),
      visible: false,
      status: null
    })
  }

  remove(el){
    let index = this.elements.findIndex(e => e.el == el)
    if (index > -1) this.elements.splice(index,1)
  }

  update(e){

    for (let i = 0; i < this.elements.length; i++){

      let element = this.elements[i]
      let visible = element.pos.top < e.bottom && element.pos.bottom > e.top

      if (visible || element.visible){

        let offset = e.top - Math.max(element.pos.top - this.windowHeight,0)
        let duration = Math.min(this.windowHeight,element.pos.top) + element.pos.height
        let progress = Math.min(Math.max(offset / duration,0),1)
        let entering = e.direction == 'down'
                       ? offset / this.windowHeight
                       : (duration - offset) / this.windowHeight

        element.callback({
          scroll: {...e},
          el:element.el,
          position: {...element.pos},
          enter: visible && !element.visible,
          leave: !visible && element.visible,
          windowHeight: this.windowHeight,
          windowWidth: this.windowWidth,
          entering: entering <= 1 ? entering : 0,
          duration,
          offset,
          progress
        })

        element.visible = visible

      }
    }
  }
}
