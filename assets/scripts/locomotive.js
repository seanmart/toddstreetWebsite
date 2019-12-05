import locomotiveScroll from "locomotive-scroll";

let locomotive = new locomotiveScroll({
  el: document.getElementById('scroll'),
  smooth: true,
  smoothMobile: true,
  getDirection: true,
  touchMultiplier: 3
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
