export const state = () => ({
  navColor: '#2f3339',
  initialNavColor: '#2f3339'
})

export const mutations = {
  navColor(state, hex) {
    state.navColor = hex || state.initialNavColor
  }
}
