import {getPosition, getValue, generateId} from './tools'

let instances = {}

export class ScrollBuddy{
  constructor(el,options,id){

    Object.assign(this,{
      offsetStart: 0,
      offsetEnd:0,
      minWidth: 0,
      maxWidth: 100000,
      onEnter: null,
      onLeave: null,
      onScroll: null,
    },options)

    this.update = this.update.bind(this)
    this._run = this._run.bind(this)

    this.scrollId = scroller.add(this._run)
    this.resizeId = resizer.add(this.update)
    this.id = id

    this.el = el
    this.position = {}
    this.visible = false
    this.start = 0
    this.end = 0
    this.active = true
    this.duration = 0
    this.scrolledOffset = 0

    this.update({height: resizer.height, width: resizer.width})
  }

  update({height, width}){
    this.position = getPosition(this.el)
    this.start = this.position.top + getValue(this.offsetStart)
    this.end = this.position.bottom - getValue(this.offsetEnd)
    this.duration = Math.min(this.start, height) + (this.end - this.start)
    this.scrolledOffset = Math.max(this.start - height,0)

    let active = width >= this.minWidth && width <= this.maxWidth
    if (active && !this.active) this.resume()
    if (!active && this.active) this.pause()

    this.active = active

  }

  resume(){
    if (!this.scrollId) this.scrollId = scroller.add(this._run)
  }

  pause(){
    if (this.scrollId){
      scroller.remove(this.scrollId)
      this.scrollId = null
    }
  }

  kill(){
    if (this.scrollId){
      scroller.remove(this.scrollId)
      this.scrollId = null
    }
    if (this.resizeId){
      resizer.remove(this.resizeId)
      this.resizeId = null
    }

    if (this.id) delete instances[this.id]
  }

  _run(e){
    let visible = this.start < e.bottom && this.end > e.top
    if (visible || this.visible){

      let props = {}
      props.scroll = e
      props.position = {...this.position,start: this.start, end: this.end}
      props.scrolled = Math.min(Math.max(e.top - this.scrolledOffset,0),this.duration)
      props.percent = props.scrolled / this.duration
      props.id = this.id

      if (this.onScroll && visible && this.visible) this.onScroll(props)
      if (this.onEnter && visible && !this.visible) this.onEnter(props)
      if (this.onLeave && !visible && this.visible) this.onLeave(props)

      this.visible = visible
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
    instances[id] = new ScrollBuddy(e,o, id)
    return instances[id]
  },
  killAll:()=> Object.keys(instances).forEach(id => instances[id].kill()),
  killById:(id) => instances[id].kill(),
  instances:()=> instances
}
