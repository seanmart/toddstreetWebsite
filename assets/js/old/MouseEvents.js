export default class{
  constructor(){
    this.events = []
    this.handleMouseMove = this.handleMouseMove.bind(this)
    window.addEventListener('mousemove',this.handleMouseMove)
  }

  handleMouseMove(e){
    for (let i = 0; i < this.events.length; i++){
      this.events[i](e)
    }
  }

  add(fn){
    this.events.push(fn)
  }

  remove(fn){
    let index = this.events.findIndex(e => e.fn == fn)
    if (index > -1) this.events.splice(index,1)
  }
}
