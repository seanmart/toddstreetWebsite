import scroller from './handlers/Scroller'
import resizer from './handlers/Resizer'
import mouser from './handlers/Mouser'
import MouseBuddy from './MouseBuddy'
import ScrollBuddy from './ScrollBuddy'
import ColorBuddy from './ColorBuddy'

import {getPosition, getValue, lerp} from './tools'

export default function(options = {}){

  window.resizer = resizer
  window.scroller = scroller
  window.mouser = mouser

  resizer.init(options.resizer)
  scroller.init(options.scroller)
  mouser.init(options.mouser)

  window.ScrollBuddy = ScrollBuddy
  window.MouseBuddy = MouseBuddy
  window.ColorBuddy = new ColorBuddy
  window.utils = {getPosition, getValue, lerp}
}
