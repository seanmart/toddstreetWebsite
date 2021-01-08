import {lerp, generateId, getPosition, isTouch, transform} from '../tools'
let scroller, touch, smooth, inertia, callbacks, resizeId, update, ticking, props


  function updateNative(){
    updateScroller(window.scrollY)
    runCallbacks()
  }

  function updateSmooth(force = false){
    let scrollY = window.scrollY
    let top = lerp(scroller.top, scrollY,inertia)
    ticking = !force && Math.abs(top - scrollY) > .5
    if (!ticking) top = Math.floor(top)

    updateScroller(top);

    window.requestAnimationFrame(()=> {

      transform(scroller.container,-scroller.top)
      runCallbacks()
      ticking && update()
    })
  }

  function updateScroller(top){
    scroller.delta = top - scroller.top,
    scroller.direction = top > scroller.top ? 'down' : 'up',
    scroller.bottom = top + resizer.height,
    scroller.top = top
  }

  function handleResize(){
    document.documentElement.style.cssText = `height: ${scroller.container.offsetHeight}px`
    updateSmooth(true)
  }

  function runCallbacks(){
    let props = {
      top: scroller.top,
      bottom: scroller.bottom,
      direction: scroller.direction,
      delta: scroller.delta
    }
    callbacks.forEach(c => c.callback(props, c.id))
  }

  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  scroller = {
    delta: 0,
    direction:'down',
    bottom: 0,
    top: 0,
    container: null,
    init:(options)=> {

      let defaults = {
        container: document.body,
        inertia: .09,
        smooth: true
      }

      options = Object.assign({},defaults,options)
      scroller.container = options.container
      inertia = options.inertia
      smooth = options.smooth && !resizer.touch
      resizeId = null
      callbacks = []
      update = smooth ? updateSmooth : updateNative

      window.addEventListener('scroll', ()=> !ticking && update())

      if (smooth){
        scroller.container.style.cssText = `position: fixed; top: 0px; left: 0px; right: 0px;`
        resizer.add(handleResize)
        handleResize()
      }

      updateScroller(0)
    },
    add:(callback)=> {
      let id = generateId(5);
      callbacks.push({callback,id});
      return id
    },
    remove:(id)=>{
      let index = callbacks.findIndex(c => c.id == id);
      if (index > -1) callbacks.splice(index, 1)
    },
    refresh:()=> {
      scroller.top = 0
      scroller.bottom = 0
      scroller.delta = 0
      smooth && handleResize()
      runCallbacks()
    }
  }

  export default scroller
