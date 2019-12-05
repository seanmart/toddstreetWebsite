import locomotiveScroll from "locomotive-scroll";

export default{
  instance: null,
  init(props){
    this.instance = new locomotiveScroll(props)
  },
  scroll(fn){
    this.instance.on('scroll',fn)
  },
  call(fn){
    this.instance.on('call',fn)
  }

}
