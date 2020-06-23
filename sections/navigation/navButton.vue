<template lang="html">
  <button type="button" id="nav-button">
    <i :style="{background: color}"/>
    <i :style="{background: color}"/>
    <i :style="{background: color}"/>
  </button>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    els: [],
    color: '#000',
    last: '#000',
    first: true
  }),
  watch:{
    color(to,from){this.last = from},
    ready(ready){
      ready ? this.addEls() : this.reset()
    }
  },
  computed:mapState(['ready']),
  methods:{
    reset(){
      this.ids.forEach(id => ScrollBuddy.killById(id))
    },
    addEls(){
      this.ids = Array.from(document.querySelectorAll('[data-button-color]')).map(el => {
        let color = el.getAttribute('data-button-color')
        let id = ScrollBuddy.create(el,{
          offsetStart: '90vh',
          offsetEnd: '10vh',
          onEnter: ()=> this.color = color,
          onLeave: ()=> this.color = this.last
        }).id
        return id
      })
    }
  }
}
</script>

<style lang="scss">
#nav-button{
  z-index: 100;
  height: $space--dk;
  width: $margin--dk;
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  i{
    flex: 0 0 auto;
    width: 30px;
    height: 2px;
    margin: 2px 0px;
    background: black;
    border-radius: 1px;
    transition: transform .25s;
  }
  &:hover{
    i:first-child{
      transform: translateY(-2px);
    }
    i:last-child{
      transform: translateY(2px);
    }
  }
  @media (max-width: $tablet){
    height: $space--tb;
    width: $margin--tb;
  }
  @media (max-width: $mobile){
    height: $space--mb;
    width: $margin--mb-right;
  }
}
</style>
