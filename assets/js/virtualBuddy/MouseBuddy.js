import {getPosition, generateId} from './tools'

let instances = {}

export class MouseBuddy{
  constructor(el,options,id){

    Object.assign(this,{
      onEnter:null,
      onActive: null,
      onLeave: null,
      onFirstMove: null
    },options)


    this.el = el
    this.position = {}
    this.resizeId = null
    this.mouseId = null
    this.active = false
    this.id = id || null
    this.moved = false

    this.update = this.update.bind(this)
    this._run = this._run.bind(this)

    this.update()
  }

  update(){
    this.position = getPosition(this.el)
    resizer.touch ? this.pause() : this.resume()
  }

  resume(){
    if (!this.resizeId) this.resizeId = resizer.add(this.update)
    if (!this.mouseId) this.mouseId = mouser.add(this._run)
  }

  pause(){
    if (this.mouseId){
      mouser.remove(this.mouseId)
      this.mouseId = null
    }
  }

  kill(){
    if (this.mouseId){
      mouser.remove(this.mouseId)
      this.mouseId = null
    }
    if (this.resizeId){
      resizer.remove(this.resizeId)
      this.resizeId = null
    }

    if (this.id) delete instances[this.id]
  }

  _run(e){
    if (this.position.top > scroller.bottom && !this.active) return
    if (this.position.bottom < scroller.top && !this.active) return

    let active = e.pageY >= this.position.top && e.pageY <= this.position.bottom
              && e.pageX >= this.position.left && e.pageX <= this.position.right

    if (active || this.active){

      let props = {
        ...e,
        id: this.id,
        offsetY: e.pageY - this.position.top,
        offsetX: e.pageX - this.position.left
      }

      if (this.onEnter && ((active && !this.active) || !this.moved)) this.onEnter(props)
      if (this.onActive && active && this.active && this.moved) this.onActive(props)
      if (this.onLeave && !active && this.active && this.moved) this.onLeave(props)

      this.active = active
      this.moved = true
    }

  }
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default {
  create:(e,o)=> {
    let id = generateId(5)
    instances[id] = new MouseBuddy(e,o, id)
    return instances[id]
  },
  killAll:()=> Object.keys(instances).forEach(id => instances[id].kill()),
  killById:(id) => instances[id].kill(),
  instances:()=> instances
}
