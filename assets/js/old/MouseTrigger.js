export default class{
  constructor(scrollTrigger){
    this.elements = []
    this.scrollTrigger = scrollTrigger

    this.mouse = {
      x: 0,
      y:0,
      cx:0,
      cy:0
    }

  }

  add(el,callback){
    this.scrollTrigger.add(el,()=>{

    })
  }
}
