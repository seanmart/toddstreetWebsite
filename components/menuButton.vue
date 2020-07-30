<template lang="html">
  <div id="menu-button">
    <button class="font h6 loose" ref="menu" :style="{borderColor: color, color}">menu</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    els: [],
    color: '#000',
    last: '#000',
    position: {}
  }),
  watch:{
    ready(ready){
      ready && this.addEls()
    }
  },
  mounted(){
    resizer.add(this.getPosition)
    this.getPosition()
  },
  computed:mapState(['ready']),
  methods:{
    addEls(){
      Array.from(document.querySelectorAll('[data-button-color]')).forEach(el => {

        let color = el.getAttribute('data-button-color')

        ScrollBuddy.create(el,{
          offsetStart: `100vh - ${this.position.bottom}`,
          offsetEnd: this.position.top,
          onEnter:()=>{
            this.last = this.color
            this.color = color
          },
          onLeave:()=>{
            this.color = this.last
          }
        })

      })
    },
    getPosition(){
      let rect = this.$refs.menu.getBoundingClientRect()
      this.position = {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom
      }
    }
  }
}
</script>

<style lang="scss">
#menu-button{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: $nav-d;
  width: $space-rd;
  position: fixed;
  z-index: 100;
  top: 0px;
  right: 0px;

  button{
    padding: 6px 10px 7px;
    border: 1px solid #101010;
    color: #101010;
    transition: color .25s, border .25s;
  }

  @media (max-width: $tablet){
    height: $nav-t;
    width: $space-rt;
  }

  @media (max-width: $mobile){
    height: $nav-m;
    width: $space-rm;

    button{
      transform: rotate(-90deg);
      padding: 5px 8px 6px;
    }
  }
}
</style>
