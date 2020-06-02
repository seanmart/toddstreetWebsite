export default class{
  constructor(resizeFunction){

    this.height = window.innerHeight
    this.width = window.innerWidth

    this.events = []
    this.resizeFunction = resizeFunction
    this.handleResize = this.handleResize.bind(this)

    window.addEventListener('resize', this.handleResize)
  }

  addEvent(fn){
    this.events.push(fn)
  }

  removeEvent(fn){
    let index = this.events.findIndex(event => event == fn)
    if (index > -1) this.events.splice(index,i)
  }


  handleResize(){
    this.height = window.innerHeight
    this.width = window.innerWidth
    let props = {
      width: this.width,
      height: this.height
    }

    this.resizeFunction(props)
    this.events.forEach( event => event(props));
  }
}
