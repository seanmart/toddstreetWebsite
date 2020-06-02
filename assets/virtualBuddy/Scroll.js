import tools from './tools'
import './polyfills/requestAnimationFrame.polyfill.js';

export default class{
  constructor(scrollFunction,touch,resize){
    this.touch = touch
    this.scrollFunction = scrollFunction
    this.window = resize
    this.ticking = false
    this.html = document.documentElement
    this.body = document.body
    this.events = []

    this.scrollY = 0
    this.top = 0
    this.bottom = this.window.height
    this.direction = 'down'
    this.delta = 0

    this.scrollToProps = {
      destination: null,
      current: null,
      ticking: false,
      cancel: false
    }

    this.checkScroll = touch ? this.checkNative : this.checkSmooth
    this.handleScroll = this.handleScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.cancelScrollTo = this.cancelScrollTo.bind(this)

    window.addEventListener('scroll',this.handleScroll)
    resize.addEvent(this.handleScroll)


    if (!this.touch){
      resize.addEvent(this.handleResize)
      this.body.style.position = 'fixed'
      this.body.style.top = '0px'
      this.body.style.left = '0px'
      this.body.style.right = '0px'
      this.body.style.overscrollBehavior = 'none'
    }

    this.html.style.height = `${this.body.offsetHeight}px`

  }

  init(){
    if (!this.touch) this.html.style.height = `${this.body.offsetHeight}px`
    this.handleScroll()
  }

  // EVENT

  addEvent(fn){
    this.events.push(fn)
  }

  removeEvent(fn){
    let index = this.events.findIndex(event => event == fn)
    if (event > -1) this.events.splice(index,1)
  }

  // HANDLE

  handleScroll(){
    this.scrollY = window.scrollY
    if (!this.ticking) this.checkScroll()
  }

  handleResize(){
    this.html.style.height = `${this.body.offsetHeight}px`
  }

  // CHECK

  checkNative(){
    this.ticking = true
    this.updateScroll(this.scrollY)
    window.requestAnimationFrame(()=>{
      this.updateFunctions()
      this.ticking = false
    })
  }

  checkSmooth(){
    this.ticking = Math.abs(this.scrollY - this.top) > .01
    this.updateScroll(tools.lerp(this.top,window.scrollY,.075))

    window.requestAnimationFrame(()=>{
      this.updateFunctions()
      if (this.ticking) this.checkSmooth()
    })
  }

  // UPDATE

  updateScroll(top){
    this.delta = top - this.top
    this.top = top
    this.bottom = top + this.window.height
    this.direction = this.last < this.top ? 'down' : 'up'
  }

  updateFunctions(){

    let props = {
      top: this.top,
      bottom: this.bottom,
      direction: this.direction,
      delta: this.delta
    }

    this.scrollFunction(props)
    this.events.forEach(fn => fn(props))
  }

  // SCROLLTO

  scrollTo(el){
    if (typeof el == 'string') el = document.querySelector(el)
    if (!el) return

    this.scrollToProps.destination = tools.getPosition(el).top

    if (!this.scrollToProps.ticking) {
      window.addEventListener('wheel', this.cancelScrollTo)
      window.addEventListener('touchmove', this.cancelScrollTo)
      this.scrollToProps.current = this.top
      this.runScrollTo()
    }
  }

  runScrollTo(){
    this.scrollToProps.current = tools.lerp(this.scrollToProps.current, this.scrollToProps.destination,.05)
    this.scrollToProps.ticking = Math.abs(this.scrollToProps.destination - this.scrollToProps.current) > .5

    window.requestAnimationFrame(()=>{
      window.scrollTo(0,this.scrollToProps.current)
      if (this.scrollToProps.ticking && !this.scrollToProps.cancel) {
        this.runScrollTo()
      } else {
        window.removeEventListener('wheel', this.cancelScrollTo)
        window.removeEventListener('touchmove', this.cancelScrollTo)

        this.scrollToProps = {
          ticking: false,
          current: null,
          destiation: null,
          cancel: false,
          wheel: null
        }

      }
    })
  }

  cancelScrollTo(){
    this.scrollToProps.cancel = true
  }
}
