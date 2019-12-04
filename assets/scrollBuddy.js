export default function(el){

  let scenes = []

  this.scroll = function(e){
    if (scenes.length < 1) return
    scenes.forEach(s => s.update(e))
  }

  this.scene = function(props = null){

    this.scrollFn = null
    this.enterFn = null
    this.exitFn = null

    this.entered = false
    this.exited = false
    this.percent = 0

    this.props = props || {}

    this.onScroll = (fn)=> {
      this.scrollFn = fn
    }
    this.onEnter = (fn)=> {
      this.enterFn = fn
      this.update()
    }
    this.onExit = (fn)=> {
      this.exitFn = fn
      this.update()
    }

    this.update = function(e){

      if (!this.props.el) return

      let positions = getPositions(props.el)
      let scroll = e ? e.scroll.y : 0
      let offset = this.props.offset || 0
      let duration = positions.win
      let percent = this.percent

      if (this.props.duration){
        if (this.props.duration.el){
          duration = positions.height * this.props.duration.el
        } else if (this.props.duration.window){
          duration = positions.win * this.props.duration.window
        }
      }

      let start = positions.top - positions.win * offset
      let end = start + duration

      if (scroll < start){
        !this.exited && this.exitFn && this.exitFn('before')
        this.entered = false
        this.exited = true
        percent = 0
      }

      if (scroll >= start && scroll <= end) {
        !this.entered && this.enterFn && this.enterFn(percent === 0 ? 'enterFromBefore' : 'enterFromAfter')
        this.exited = false
        this.entered = true
        percent = (scroll - start) / (end - start)
      }
      if (scroll > end) {
        !this.exited && this.exitFn && this.exitFn('after')
        this.entered = false
        this.exited = true
        percent = 1
      }

      this.scrollFn && this.scrollFn({...positions,start,end,percent,scroll})
      this.percent = percent
    }

    scenes.push(this)

  }
}

function getPositions(el){
  let top = 0
  let win = window.innerHeight
  let height = el.offsetHeight

  while (el){
    top += el.offsetTop
    el = el.offsetParent
  }

  let bottom = top + height
  return {top, bottom, height, win}
}
