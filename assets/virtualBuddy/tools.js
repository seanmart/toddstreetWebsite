export default{
  isTouch(){
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  },
  lerp(start, end, amt){
      return (1 - amt) * start + amt * end
  },
  generateId(length){
    let id = ''
    let char = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789').split('')
    for (let i = 1; i <= length; i++){
      id += char[Math.floor(Math.random() * char.length)]
    }
    return id
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

    let parseValue = (string)=>{
      let val = parseFloat(string)
      return string.includes('%y') ? val * (el.offsetHeight/100)
           : string.includes('%x') ? val * (el.offsetWidth/100)
           : string.includes('vh') ? val * (window.innerHeight / 100)
           : string.includes('vw') ? val * (window.innerWidth / 100)
           : string.includes('px') ? val
           : string.includes('deg') ? val
           : val
    }

    if (value.includes(' + ')){
      let total = 0
      value.split(' + ').forEach(v => {
        total += parseValue(v)
      })
      return total
    }

    if (value.includes(' - ')){
      let total = 0
      value.split(' - ').forEach(v => total = !total ? parseValue(v) : total -= parseValue(v))
      return total
    }

    return parseValue(value)

   }
}
