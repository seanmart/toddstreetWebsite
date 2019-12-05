import locomotiveScroll from "locomotive-scroll";

let locomotive = new locomotiveScroll({
  el: document.getElementById('scroll'),
  inertia: .5,
  smooth: true,
  getDirection: true,
  //smoothMobile: true,
  //touchMultiplier: 2.5
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
