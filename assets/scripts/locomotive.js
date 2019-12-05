import locomotiveScroll from "locomotive-scroll";

let locomotive = new locomotiveScroll({
  el: document.getElementById('site'),
  smooth: true,
  getDirection: true
})

export default{
  instance: locomotive,
  scroll(fn){
    this.instance.on('scroll',fn)
  },
  call(fn){
    this.instance.on('call',fn)
  },
  update(){
    this.instance.init()
  }
}
