export default{
  functional: true,
  props:{
    childClass: {type:String, default: null},
    wrapperClass: {type:String, default: null},
    tag: {type:String, default: 'div'}
  },
  render(h,{children,props}){
    let childs = []
    children.forEach(c => {
      if (c.tag){
        if (props.childClass){
          if (!c.data) c.data= {}
          if (c.data.staticClass){
            c.data.staticClass += ' ' + props.childClass
          } else {
            c.data.staticClass = props.childClass
          }
        }
        childs.push(c)
      }
    })


    return childs.map(c => h(props.tag,{class: props.wrapperClass},[c]))
  }
}
