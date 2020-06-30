import {lerp, generateId, getPosition, isTouch} from '../tools'
let scroller, container, touch, smooth, inertia, sections, callbacks, resizeId, update, ticking, props


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

      let top = `matrix(1,0,0,1,0,${-scroller.top})`;
      container.style.webkitTransform = top;
      container.style.msTransform = top;
      container.style.transform = top;

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
    document.documentElement.style.cssText = `height: ${container.offsetHeight}px`
    updateSmooth(true)
  }

  function runCallbacks(){
    let props = scroller.props()
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
    init:(options)=> {

      let defaults = {
        container: document.body,
        inertia: .09
      }

      options = Object.assign({},defaults,options)
      container = options.container
      inertia = options.inertia
      smooth = !resizer.touch
      resizeId = null
      callbacks = []
      update = smooth ? updateSmooth : updateNative
      smooth && (container.style.cssText = `position: fixed; top: 0px; left: 0px; right: 0px;`)
      smooth && (resizeId = resizer.add(handleResize))
      window.addEventListener('scroll', ()=> !ticking && update())

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
    },
    sections:()=> sections,
    props:()=>{
      return{
        top: scroller.top,
        bottom: scroller.bottom,
        delta: scroller.delta,
        direction: scroller.direction
      }
    }
  }

  export default scroller