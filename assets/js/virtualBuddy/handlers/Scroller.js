import {lerp, generateId, getPosition, isTouch} from '../tools'
let scroller, container, smooth, inertia, sections, callbacks, resizeId, update, ticking, props


  function getSections(){
    let els = Array.from(container.querySelectorAll('[data-section]'))
    if (els.length < 1) els = [container]
    sections = els.map(el => ({el, position: getPosition(el)}))
  }

  function updateNative(){
    updateScroller(window.scrollY)
    runCallbacks()
  }

  function updateSmooth(){
    let scrollY = window.scrollY
    let top = lerp(scroller.top, scrollY,inertia)
    ticking = Math.abs(top - scrollY) > .5

    updateScroller(top);

    window.requestAnimationFrame(()=> {

      for (let i = 0; i < sections.length; i++){
        if (sections[i].position.top <= scroller.bottom + 100 && sections[i].position.bottom >= scroller.top - 100
        ){
          let top = `matrix(1,0,0,1,0,${-scroller.top})`;
          sections[i].el.style.webkitTransform = top;
          sections[i].el.style.msTransform = top;
          sections[i].el.style.transform = top;
        }
      }

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
    sections.forEach(section => section.position = getPosition(section.el))
  }

  function runCallbacks(){
    callbacks.forEach(c => c.callback({
      top: scroller.top,
      bottom: scroller.bottom,
      delta: scroller.delta,
      direction: scroller.direction
    }, c.id))
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
        smooth: !isTouch(),
        container: document.body,
        inertia: .09
      }

      options = Object.assign({},defaults,options)
      container = options.container
      inertia = options.inertia
      smooth = options.smooth
      resizeId = null
      callbacks = []
      update = smooth ? updateSmooth : updateNative
      smooth && getSections()
      smooth && (container.style.cssText = `position: fixed; top: 0px; left: 0px; right: 0px;`)
      smooth && (resizeId = resizer.add(handleResize))
      window.addEventListener('scroll', ()=> !ticking && update())
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
      smooth && getSections()
      smooth && handleResize()
    },
    sections:()=> sections
  }

  export default scroller
