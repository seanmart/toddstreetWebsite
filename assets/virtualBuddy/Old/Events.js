export default class{
  constructor(){

    this.ticking = false

    this.resizeElements = {}
    this.mouseElements = {}
    this.scrollElements = {}

    this.onScroll = this.onScroll.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onResize = this.onResize.bind(this)

    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('resize', this.onResize)

    this.mouse = {
      pageX: 0,
      pageY: 0,
      clientX: 0,
      clientY: 0
    }

    this.scroll = {
      top: 0,
      bottom: 0,
      direction: null,
      delta: 0
    }

    this.scrollTo = {
      destination: null,
      current: null,
      ticking: false,
      cancel: false
    }

    this.window = {
      height: 0,
      width: 0
    }

    this.page = {
      el: null,
      height: 0,
      width: 0
    }
  }
}
