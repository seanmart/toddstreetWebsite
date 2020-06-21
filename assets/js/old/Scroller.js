
export default class{
  constructor({smooth, intertia, container, callback}){

    this.container = container || document.body
    this.callback = callback || null
    this.inertia = intertia || .1
    this.scroll = {delta: 0,direction:'down',bottom: 0,top: 0}
    this.windowHeight = window.innerHeight
    this.scroller = ()=>({})
    this.isSmooth = false
    this.ticking = false

    this.handleScroll = this.handleScroll.bind(this)
    this.handleResize= this.handleResize.bind(this)

    if (smooth){
      this.smooth = true
      this.scroller = this.scrollerSmooth
      this.container.style.cssText = `position: fixed; top: 0px; left: 0px; right: 0px;`
    } else {
      this.smooth = false
      this.scroller = this.scrollerNative
    }

    this.update()
    window.addEventListener('scroll',this.handleScroll)
    window.addEventListener('resize', this.handleResize)

  }

  update(){
    if (this.smooth) document.documentElement.style.cssText = `height: ${this.container.offsetHeight}px`
    this.windowHeight = window.innerHeight
  }

  handleScroll(){
    if (!this.ticking) this.scroller()
  }

  handleResize(){
    this.update()
    this.scroller()
  }

  scrollerSmooth(){
    let top = this.lerp(this.scroll.top,window.scrollY, this.inertia)
    this.ticking = Math.abs(top - scrollY) > .5

    if (!this.ticking){
      top = Math.round(top)
      this.scroll.top = top
    }

    this.updateScroll(top)

    window.requestAnimationFrame(()=>{
      let transform = `matrix(1,0,0,1,0,${-top})`
      this.container.style.webkitTransform = transform;
      this.container.style.msTransform = transform;
      this.container.style.transform = transform;
      this.callback && this.callback(this.scroll)
      if (this.ticking) this.scroller()
    })
  }

  scrollerNative(){
    this.updateScroll(window.scrollY)
    window.requestAnimationFrame(()=>{
      this.callback && this.callback(this.scroll)
    })
  }

  updateScroll(top){
    this.scroll = {
      delta: top - this.scroll.top,
      direction: top > this.scroll.top ? 'down' : top < this.scroll.top ? 'up' : this.scroll.direction ,
      bottom: top + this.windowHeight,
      top: top
    }
  }

  // TOOLS
  lerp(start, end, amt){
      return (1 - amt) * start + amt * end
  }
}
