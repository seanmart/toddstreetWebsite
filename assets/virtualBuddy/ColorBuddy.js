import {getPosition, generateId} from './tools'

let containers = []
let items = []

export default class ColorBuddy{
  constructor(){
    scroller.add(this.check)
    resizer.add(this.update)
  }


  init(){

    Array.from(document.querySelectorAll('[data-color]')).forEach(el => {
      items.push({
        el: el,
        position: getPosition(el),
        active: false
      })
    })

    Array.from(document.querySelectorAll('[data-color-container]')).forEach(el => {
        containers.push({
          el: el,
          position: getPosition(el)
        })
    })

  }

  update(){
    items.forEach(i => i.position = getPosition(i.el))
    containers.forEach(c => c.position = getPosition(c.el))
  }

  check(e){
    containers.forEach(c => {
      if (c.position.top <= e.bottom && c.position.bottom >= e.top){

        items.forEach(i => {

          let top = i.position.top + (i.position.height / 2 )+  e.top
          let bottom = i.position.bottom - (i.position.height / 2) + e.top

          if (!i.active && top >= c.position.top && bottom <= c.position.bottom){
            i.el.classList.add('color-active')
            i.active = true
          } else if (i.active && (top < c.position.top || bottom > c.position.bottom)){
            i.el.classList.remove('color-active')
            i.active = false
          }

        })

      }
    })
  }
}
