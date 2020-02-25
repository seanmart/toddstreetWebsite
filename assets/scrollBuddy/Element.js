import {getTranslate,getTop, getLeft, isArray, isInt, isFloat, isObject} from './utils'
export default class{
  constructor(el, params = {}){

    this.el = el
    this.target = params.target ? params.target() : null

    // position
    this.top = 0
    this.left = 0
    this.width = 0
    this.height = 0
    this.bottom = 0
    this.right = 0
    this.offset = 0

    this.getPosition()

    this.padding = params.scroll ? 500 : 0

    this.view = {
      mounted: this.top - this.padding < 0,
      visible: this.top < 0,
    }

    this.data = {}

    this.transform = null
    this.sticky = null

    this.onScroll = params.onScroll || null
    this.onEnterTop = params.onEnterTop || null
    this.onLeaveTop = params.onLeaveTop || null
    this.onEnterBottom = params.onEnterBottom || null
    this.onLeaveBottom = params.onLeaveBottom || null
    this.onEnter = params.onEnter || null
    this.onLeave = params.onLeave || null

    if (params.transform) this.data.transform = this.sort(params.transform)
    if (params.sticky) this.data.sticky = this.sort(params.sticky)
    if (params.scroll) this.data.scroll = this.sort(params.scroll)


    if (this.data.transform) this.updateTransform()
    if (this.data.sticky) this.updateSticky()
    if (this.data.scroll) this.updateScroll()

  }

  update(){
    this.getPosition()
    this.offset = 0

    if (this.data.transform) this.updateTransform()
    if (this.data.sticky) this.updateSticky()
    if (this.data.scroll) this.updateScroll()

  }

  updateTransform(){
    let data = this.findByMinimum(this.data.transform)
    this.transform = data ? this.setTransform(data) : null
  }

  updateSticky(){
    let data = this.findByMinimum(this.data.sticky)
    this.sticky = data ? this.setSticky(data) : null
  }

  updateScroll(){
    let data = this.findByMinimum(this.data.scroll)
    this.scroll = data ? this.setScroll(data) : null
  }

  setTransform(data = {}){
    return{
      offset: this.getValue(data.offset),
      duration: this.getValue(data.duration),
      r: parseFloat((this.getValue(data.rotate)/100).toFixed(3)),
      s: parseFloat((this.getValue(data.scale)/1000).toFixed(3)),
      x: -parseFloat((this.getValue(data.x)/10).toFixed(3)),
      y: -parseFloat((this.getValue(data.y)/10).toFixed(3))
    }
  }

  setSticky(data = {}){
    return{
      offset: !data.position ? this.getValue(data.offset) : 0,
      position: this.getValue(data.position),
      duration: this.getValue(data.duration)
    }
  }

  setScroll(data = {}){
    return{
      duration: data.duration ? this.getValue(data.duration) : null,
      reverse: data.reverse || false
    }
  }

  sort(data){
    if (!isArray(data)) return [data]
    return data.sort((a,b)=>(b.min || 0) - (a.min || 0))
  }

  findByMinimum(data){
    return data.reduce((a,c)=> (c.min || 0) < window.innerWidth && !a ? c : a,null)
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
