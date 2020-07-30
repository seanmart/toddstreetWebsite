import {getPosition, getValue, generateId, transform} from './tools'

let instances = {}
let init = false

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
      immediate: false,
      markers: false,
      fixed: false
    },options)

    this.update = this.update.bind(this)
    this._run = this._run.bind(this)

    this.scrollId = scroller.add(this._run)
    this.resizeId = resizer.add(this.update)
    this.id = id

    this.el = typeof el === 'string' ? document.querySelectorAll(el) : el
    this.position = {}
    this.visible = false
    this.start = 0
    this.end = 0
    this.active = true
    this.duration = 0
    this.scrolledOffset = 0
    this.startEl = null
    this.endEl = null
    this.fixedEl = null

    this.init && this.update(resizer.props())
    this.markers && this.addMarkers()
    this.fixed && this.addFixed()

  }

  update({height, width}){

    this.position = getPosition(this.el)
    this.start = this.position.top + getValue(this.offsetStart,this.el)
    this.end = this.position.bottom - getValue(this.offsetEnd, this.el)
    this.duration = Math.min(this.start, height) + (this.end - this.start)
    this.scrolledOffset = Math.max(this.start - height,0)

    let active = width >= this.minWidth && width <= this.maxWidth
    if (active && !this.active) this.resume()
    if (!active && this.active) this.pause()

    this.active = active
    this.markers && this.updateMarkers()

  }

  addFixed(){
    let parent = this.el.parentNode
    this.fixedEl = this.el
    this.el = parent
  }

  addMarkers(){
    this.startEl = document.createElement('span')
    this.endEl = document.createElement('span')

    scroller.container.appendChild(this.startEl).appendChild(document.createTextNode('start'))
    scroller.container.appendChild(this.endEl).appendChild(document.createTextNode('end'))

    this.startEl.classList.add(this.id)
    this.endEl.classList.add(this.id)

    this.startEl.style.cssText = `position: absolute; right: 10%; z-index: 1000; color: green; border-top: 1px solid green; padding-top: 3px; width: 70px`
    this.endEl.style.cssText = `position: absolute; right: 10%; z-index: 1000; color: red; border-top: 1px solid red; padding-top: 3px; width: 70px`

    this.updateMarkers()
  }

  updateMarkers(){
    if (this.startEl) this.startEl.style.top = `${this.start}px`
    if (this.endEl) this.endEl.style.top = `${this.end}px`
  }

  removeMarkers(){
    this.startEl.parentNode.removeChild(this.startEl)
    this.endEl.parentNode.removeChild(this.endEl)
    this.startEl = null
    this.endEl = null
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

      if (this.onScroll) this.onScroll(props)
      if (this.onEnter && visible && !this.visible) this.onEnter(props)
      if (this.onLeave && !visible && this.visible) this.onLeave(props)

      if (this.fixed){
        transform(this.fixedEl,props.scrolled)
      }

      this.visible = visible
    }
  }

}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default {
  init:()=>{
    Object.keys(instances).forEach(key => instances[key].update(resizer.props()))
    init = true
  },
  create:(e,o)=> {
    let id = generateId(5)
    if (typeof e == 'string') e = document.querySelector(e)
    instances[id] = new ScrollBuddy(e,o, id)

    return instances[id]
  },
  kill:()=> {
    Object.keys(instances).forEach(id => {
      instances[id].markers && instances[id].removeMarkers()
      instances[id].kill()
    })
  },
  killById:(id) => instances[id].kill(),
  instances:()=> instances,
}
