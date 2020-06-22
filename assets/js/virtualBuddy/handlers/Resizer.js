import {isTouch, generateId, debounce} from '../tools'

let resizer, callbacks, sizes, debouncedHandleResize

function handleResize(){
  updateResizer()
  callbacks.forEach(c => c.callback({
    height: resizer.height,
    width: resizer.width,
    touch: resizer.touch,
    sizes: resizer.sizes
  }, c.id))
}

function updateResizer(){
  resizer.height = window.innerHeight
  resizer.width = window.innerWidth
  let found = false
  sizes.forEach(size => {
    resizer.width < size.width && !found
    ? (resizer.sizes[size.key] = true) && (found = true)
    : (resizer.sizes[size.key] = false)
  })
}

// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

resizer = {
  height: 0,
  width: 0,
  touch: isTouch(),
  sizes:{},
  init:(options)=>{

    let defaults = {
      mobile: 600,
      tablet: 1000,
      desktop: 1400,
      widescreen: 100000
    }

    options = Object.assign({},defaults,options)
    sizes = Object.keys(options).map(key => ({key, width: options[key]})).sort((a,b) => a.width - b.width)
    callbacks = []
    updateResizer()

    window.addEventListener('resize', handleResize)
  },
  add:(callback)=>{
    let id = generateId(5)
    callbacks.push({callback,id})
    return id
  },
  remove:(id)=>{
    let index = callbacks.findIndex(c => c.id == id)
    if (index > -1) callbacks.splice(index, 1)
  },
}

export default resizer
