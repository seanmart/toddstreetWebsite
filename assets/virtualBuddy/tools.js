export default{
  isMobile(){
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  },
  lerp(start, end, amt){
      return (1 - amt) * start + amt * end
  },
  getPosition(el){
    let p = {}
    p.top = this.getOffsetTop(el)
    p.left = this.getOffsetLeft(el)
    p.height = el.offsetHeight
    p.width = el.offsetWidth
    p.bottom = p.top + p.height
    p.right = p.left + p.width
    return p
  },
  getOffsetTop(e){
    let d = 0
    while(e) {
      d += e.offsetTop;
      e = e.offsetParent;
    }
    return d
  },
  getOffsetLeft(e){
    let d = 0
    while(e) {
      d += e.offsetLeft;
      e = e.offsetParent;
    }
    return d
  },
  transform(el, x = 0, y = 0, r = 0, s = 1) {

    let rad = r * (Math.PI / 180)
    let dx = Math.cos(rad) * s
    let dy = Math.sin(rad) * s
    let transform = `matrix(${dx},${dy},${-dy},${dx},${x},${y})`

    el.style.webkitTransform = transform;
    el.style.msTransform = transform;
    el.style.transform = transform;
  },
  animate(el, x = 0, y = 0, r = 0, s = 1){
    window.requestAnimationFrame(()=>{
      this.transform(el,x,y,r,s)
    })
  },
  getValue(value,el){

    if (value == undefined || value == null) return value
    if (typeof value == 'number' || typeof value == 'function') return value

    let parsedValue = parseFloat(value)

    return value.indexOf('%y') !== -1
             ? parsedValue * (el.offsetHeight/100)
        : value.indexOf('%x') !== -1
             ? parsedValue * (el.offsetWidth/100)
        : value.indexOf('vh') !== -1
             ? parsedValue * (window.innerHeight / 100)
        : value.indexOf('vw') !== -1
            ? parsedValue * (window.innerWidth / 100)
        : value.indexOf('px') !== -1
            ? parsedValue
        : value.indexOf('deg') !== -1
            ? parsedValue
        : 0
   }
}
