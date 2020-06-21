export function getPosition(el){
  let p = {}
  p.top = getOffsetTop(el)
  p.left = getOffsetLeft(el)
  p.height = el.offsetHeight
  p.width = el.offsetWidth
  p.bottom = p.top + p.height
  p.right = p.left + p.width
  return p
}

export function getOffsetTop(e){
  let d = 0
  while(e) {
    d += e.offsetTop;
    e = e.offsetParent;
  }
  return d
}

export function getOffsetLeft(e){
  let d = 0
  while(e) {
    d += e.offsetLeft;
    e = e.offsetParent;
  }
  return d
}

export function generateId(length){
  let id = ''
  let char = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789').split('')
  for (let i = 1; i <= length; i++){
    id += char[Math.floor(Math.random() * char.length)]
  }
  return id
}

export function isTouch(){
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
},
