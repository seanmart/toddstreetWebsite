import {getTop, getLeft, isArray, isInt, isFloat} from './utils'

export default class{
  constructor(el, params = {}){

    this.el = el

    // position
    this.top = 0
    this.left = 0
    this.width = 0
    this.height = 0
    this.bottom = 0
    this.right = 0

    // data
    this.inView = false
    this.offset = {x:0,y:0}
    this.data = {}

    // actions
    this.onScroll = params.onScroll || null
    this.onChange = params.onChange || null
    this.parallax = null
    this.sticky = null
    this.padding = params.padding || 0

    if (params.parallax) this.data.parallax = this.sort(params.parallax)
    if (params.sticky) this.data.sticky = this.sort(params.sticky)

    this.update()

  }

  update(){
    this.getPosition()
    if (this.data.parallax) this.updateParallax()
    if (this.data.sticky) this.updateSticky()
  }

  updateTransition(x){
    if (x === this.transition) return
      this.el.style.transition = x ? 'transform 1s' : ''
      this.transition = x
  }

  updateParallax(){
    let data = this.findByMinimum(this.data.parallax)
    this.parallax = data ? this.setParallax(data) : null
  }

  updateParallaxPosition(o,d){
    let offset = o - this.parallax.offset
    let distance = offset * this.parallax.speed[d]
    return offset > 0 ? distance : 0
  }

  updateSticky(){
    let data = this.findByMinimum(this.data.sticky)
    this.sticky = data ? this.setSticky(data) : null
  }

  updateStickyPosition(o){
    let offset = o - this.sticky.offset
    let distance = offset - this.sticky.position
    if (offset < 0) return 0
    return offset <= this.sticky.duration ? distance : this.offset.y
  }

  setParallax(data){
    return{
      offset: this.getValue(data.offset),
      speed:{
        x: -parseFloat((this.getValue(data.xSpeed)/10).toFixed(3)),
        y: -parseFloat((this.getValue(data.ySpeed)/10).toFixed(3))
      }
    }
  }

  setSticky(data){
    return{
      offset: !data.position ? this.getValue(data.offset) : 0,
      position: this.getValue(data.position),
      duration: this.getValue(data.duration)
    }
  }

  sort(data){
    if (!isArray(data)) return [data]
    return data.sort((a,b)=>(a.min || 0) - (b.min || 0))
  }

  findByMinimum(data){
    return data.reduce((a,c)=> c.min || 0 < window.innerWidth ? c : a ,null)
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
    let top = getTop(this.el)
    let left = getLeft(this.el)

    this.top = Math.max(top - window.innerHeight,0)
    this.left = Math.max(left - window.innerWidth,0)
    this.width = this.el.offsetWidth
    this.height = this.el.offsetHeight
    this.bottom = top + this.height
    this.right = left + this.width

  }



}
