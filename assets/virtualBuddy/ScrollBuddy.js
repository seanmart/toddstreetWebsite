import {getPosition, getValue, generateId, transform} from './tools'

let instances = {}
let init = false

export class ScrollBuddy{
  constructor(el,options,id){

    Object.assign(this,{
      offsetStart: 0,
      offsetEnd:0,
      start: null,
      end: null,
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
    this.enter = 0
    this.leave = 0
    this.active = true
    this.duration = 0
    this.scrolledOffset = 0
    this.startEl = null
    this.endEl = null
    this.fixedEl = null

    this.markers && this.addMarkers()
    this.fixed && this.addFixed()

  }

  update({height, width}){

    this.position = getPosition(this.el)

    this.enter = this.start || Math.max(this.position.top - height,0)
    this.leave = this.end || this.position.bottom

    this.enter += getValue(this.offsetStart,this.el)
    this.leave -= getValue(this.offsetEnd,this.el)

    this.duration = this.leave - this.enter
    this.markers && this.updateMarkers('initial')

    let active = width >= this.minWidth && width <= this.maxWidth
    if (active && !this.active) this.resume()
    if (!active && this.active) this.pause()

    this.active = active

  }

  addFixed(){
    let parent = this.el.parentNode
    this.fixedEl = this.el
    this.el = parent
  }

  addMarkers(){
    let markerId = typeof this.markers == 'string' ? this.markers : this.id
    this.startEl = document.createElement('span')
    this.endEl = document.createElement('span')

    scroller.container.appendChild(this.startEl).appendChild(document.createTextNode(`start: ${markerId}`))
    scroller.container.appendChild(this.endEl).appendChild(document.createTextNode(`end: ${markerId}`))

    this.startEl.classList.add(this.id)
    this.endEl.classList.add(this.id)

    this.startEl.style.cssText = `position: absolute; right: 10%; z-index: 1000; color: green; border-top: 1px solid green; padding-top: 3px; width: 100px; font-size: 10px;`
    this.endEl.style.cssText = `position: absolute; right: 10%; z-index: 1000; color: red; border-top: 1px solid red; padding-top: 3px; width: 100px; font-size: 10px;`

  }

  updateMarkers(msg){
    console.log(msg)
    this.startEl.style.top = `${this.enter}px`
    this.endEl.style.top = `${this.leave}px`
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
    if (!init) return

    let visible = this.enter <= e.top && this.leave >= e.top

    if (visible || this.visible){

      let props = {}
      props.scroll = e
      props.position = {...this.position,start: this.enter, end: this.leave}
      props.scrolled = e.top - this.enter
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
