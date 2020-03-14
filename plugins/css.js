import vars from '@/assets/scss/variables.scss'

import Vue from 'vue'

let color = {
  midnight: vars.midnight,
  charcoal: vars.charcoal,
  snow: vars.snow,
  ruby: vars.ruby,
  sunny: vars.sunny,
  creme: vars.creme,
  storm: vars.storm
}

let size = {
  widescreen: parseInt(vars.widescreen),
  tablet: parseInt(vars.tablet),
  tabletLandscape: parseInt(vars.tabletLandscape),
  mobile: parseInt(vars.mobile),
  mobileLandscape: parseInt(vars.mobileLandscape)
}

Object.defineProperty(Vue.prototype, "$color", {
  value: color
});

Object.defineProperty(Vue.prototype, "$size", {
  value: size
});
