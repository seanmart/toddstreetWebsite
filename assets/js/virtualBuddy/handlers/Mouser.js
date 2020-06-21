import {generateId} from '../tools'

let mouser, callbacks

function handleMouse(e){
    mouser.pageX = e.pageX,
    mouser.pageY = e.pageY,
    mouser.clientX = e.clientX,
    mouser.clientY = e.clientY
    runCallbacks()
}

function runCallbacks(){
  callbacks.forEach(c => c.callback({
    pageX: mouser.pageX,
    pageY: mouser.pageY,
    clientX: mouser.clientX,
    clientY: mouser.clientY
  }, c.id))
}

mouser = {
  pageX: 0,
  pageY:0,
  clientX:0,
  clientY:0,
  init:()=>{
    callbacks = []
    scroller.add((e)=> (mouser.pageY = mouser.clientY + e.top) && (runCallbacks()))
    window.addEventListener('mousemove',handleMouse)
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

export default mouser
