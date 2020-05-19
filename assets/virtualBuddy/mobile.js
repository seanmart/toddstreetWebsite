import Main from './main.js'

export default class extends Main{
  constructor(){
    super()
  }

  // -----------------------------------------------------------------------------------------------
  // CHECK
  // -----------------------------------------------------------------------------------------------

  checkTransform(e, props){
    if (e.mobile){
      super.checkTransform(e, props)
    }
  }


  // -----------------------------------------------------------------------------------------------
  // UPDATE
  // -----------------------------------------------------------------------------------------------

  update(){
    console.log('update')
    if (this.window.width == window.innerWidth) return
    super.update()
  }

}
