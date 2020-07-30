export function transform(el,y){
  let transform = `matrix(1,0,0,1,0,${y})`;
  el.style.webkitTransform = transform;
  el.style.msTransform = transform;
  el.style.transform = transform;
}

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
}

export function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}

export function getValue(value,el){

  if (value == undefined || value == null) return value
  if (typeof value == 'number') return value
  if (typeof value == 'function') return value()

  let parseValue = (string)=>{
    let val = parseFloat(string)
    return string.includes('%y') ? val * (el.offsetHeight / 100)
         : string.includes('%x') ? val * (el.offsetWidth / 100)
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

 export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
