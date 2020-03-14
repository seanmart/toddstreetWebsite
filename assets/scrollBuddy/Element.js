import {getTranslate,getTop, getLeft, isArray, isInt, isFloat, isObject} from './utils'
export default class{
  constructor(el, params = {}){

    this.el = el
    this.target = params.target ? params.target() : null
    this.params = params

    this.top = 0
    this.left = 0
    this.width = 0
    this.height = 0
    this.bottom = 0
    this.right = 0
    this.visible = false
    this.inView = false
    this.bottomOffset = 0

    this.update(true)

  }

  update(init = false){

    this.getPosition()
    let newParams = this.params.onResize ? this.params.onResize(window.innerWidth) || {} : {}
    let params = Object.assign({},this.params,newParams)

    // transform
    this.section = params.section || false
    this.scroll = params.scroll || null
    this.sticky = params.sticky || null
    this.x = params.x ? -this.getValue(params.x) / 10 : null
    this.y = params.y ? -this.getValue(params.y) / 10 : null
    this.rotate = params.rotate ? this.getValue(params.rotate) / 10 : null
    this.scale = params.scale ? this.getValue(params.scale) / 10000 : null
    this.duration = params.duration ? this.getValue(params.duration) : null
    this.offsetTop = params.offsetTop ? this.getValue(params.offsetTop) : null
    this.offsetBottom = params.offsetBottom ? this.getValue(params.offsetBottom) : null

    // events
    this.onScroll = params.onScroll || null
    this.onEnter = params.onEnter || null
    this.onEnterTop = params.onEnterTop || null
    this.onEnterBottom = params.onEnterBottom || null
    this.onLeave = params.onLeave || null
    this.onLeaveTop = params.onLeaveTop || null
    this.onLeaveBottom = params.onLeaveBottom || null
    this.onReady = params.onReady || null

    this.padding = params.padding ? this.getValue(params.padding) : 0
    this.transform = this.sticky || this.rotate || this.scale || this.y || this.x || this.scroll

    if (init && this.onReady) this.onReady(this.el)

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
