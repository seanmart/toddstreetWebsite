import {getTranslate,getTop, getLeft, isArray, isInt, isFloat, isObject} from './utils'
export default class{
  constructor(el, params = {}){

    this.el = el
    this.target = params.target ? params.target() : null

    this.top = 0
    this.left = 0
    this.width = 0
    this.height = 0
    this.bottom = 0
    this.right = 0

    this.getPosition()

    // events
    this.onScroll = params.onScroll || null
    this.onEnter = params.onEnter || null
    this.onEnterTop = params.onEnterTop || null
    this.onEnterBottom = params.onEnterBottom || null
    this.onLeave = params.onLeave || null
    this.onLeaveTop = params.onLeaveTop || null
    this.onLeaveBottom = params.onLeaveBottom || null
    this.onReady = params.onReady || null
    this.onResize = params.onResize || null
    this.onCursorEnter = params.onCursorEnter || null
    this.onCursorLeave = params.onCursorLeave || null

    //transform
    this.section = params.section || false
    this.scroll = params.scroll || null
    this.sticky = params.sticky || null
    this.x = params.x ? -this.getValue(params.x) / 10 : null
    this.y = params.y ? -this.getValue(params.y) / 10 : null
    this.rotate = params.rotate ? this.getValue(params.rotate) / 10 : null
    this.scale = params.scale ? this.getValue(params.scale) / 10000 : null
    this.duration = params.duration ? this.getValue(params.duration) : null

    if (params.offset){
      this.offsetTop = this.getValue(params.offset)
      this.offsetBottom = this.getValue(params.offset)
    } else {
      this.offsetTop = params.offsetTop ? this.getValue(params.offsetTop) : null
      this.offsetBottom = params.offsetBottom ? this.getValue(params.offsetBottom) : null
    }

    // state
    this.padding = params.padding ? this.getValue(params.padding) : 0
    this.inside = false
    this.visible = this.top < 0
    this.inView = this.top - this.padding < 0
    this.bottomOffset = 0
    this.transform = this.sticky || this.rotate || this.scale || this.y || this.x || this.scroll
    this.smooth = params.smooth || null

    this.params = params
    this.onReady && this.onReady(this.el)
    this.onResize && this.getResize()

  }

  update(){

    this.getPosition()

    if (this.x) this.x = -this.getValue(this.params.x) / 10
    if (this.y) this.y = -this.getValue(this.params.y) / 10
    if (this.scale) this.scale = this.getValue(this.params.scale) / 1000
    if (this.duration) this.duration = this.getValue(this.params.duration)
    if (this.offset) this.offset = this.getValue(this.params.offset)
    if (this.padding) this.padding = this.getValue(this.params.padding)

    if (this.onResize) this.getResize()

  }

  getResize(){
      let params = this.onResize(window.innerWidth, window.innerHeight)
      if (!params) return

      if (params.x !== undefined) this.x = params.x ? -this.getValue(params.x) / 10 : null
      if (params.y !== undefined) this.y = params.y ? -this.getValue(params.y) / 10 : null
      if (params.scale !== undefined) this.scale = params.scale ? this.getValue(params.scale) / 1000 : null
      if (params.duration !== undefined) this.duration = params.duration ? this.getValue(params.duration) : null
      if (params.offset !== undefined) this.offset = params.offset ? this.getValue(params.offset) : null
  }

  getValue(value){
    if (!value) return 0
    if (isInt(value) || isFloat(value)) return value

    let num = parseFloat(value)

    return value.indexOf('%y') !== -1
              ? num * (this.height/100)
         : value.indexOf('%x') !== -1
              ? num * (this.width/100)
         : value.indexOf('vh') !== -1
              ? num * (window.innerHeight / 100)
         : value.indexOf('vw') !== -1
             ? num * (window.innerWidth / 100)
         : value.indexOf('px') !== -1
             ? num
         : 0
  }

  getPosition(){
    let el = this.target || this.el

    let top = getTop(el)
    let left = getLeft(el)

    this.top = top - window.innerHeight
    this.left = left - window.innerWidth
    this.width = el.offsetWidth
    this.height = el.offsetHeight
    this.bottom = top + this.height
    this.right = left + this.width

  }

}
