export default class{
  constructor(mouseFunction, scroll,resize){

    this.mouseFunction = mouseFunction
    this.ready = false

    this.pageX = resize.width / 2
    this.pageY = resize.height / 2
    this.clientX = this.pageX
    this.clientY = this.pageY

    this.events = []

    this.handleScroll = this.handleScroll.bind(this)
    this.handleMouse = this.handleMouse.bind(this)

    window.addEventListener('mousemove',this.handleMouse)
    scroll.addEvent(this.handleScroll)
  }

  addEvent(fn){
    this.events.push(fn)
  }

  removeEvent(fn){
    let index = this.events.findIndex(event => event == fn)
    if (index > -1) this.events.splice(index,i)
  }

  handleMouse(e){
    this.ready = true
    this.pageX = e.pageX
    this.pageY = e.pageY
    this.clientX = e.clientX
    this.clientY = e.clientY

    this.runFunctions()
  }

  handleScroll(scroll){
    if (!this.ready) return
    this.pageY = this.clientY + scroll.top
    this.runFunctions()
  }

  runFunctions(){
    let props = {
      pageX: this.pageX,
      pageY: this.pageY,
      clientX: this.clientX,
      clientY: this.clientY
    }
    this.mouseFunction(props)
    this.events.forEach(event => event(props))

  }
}
