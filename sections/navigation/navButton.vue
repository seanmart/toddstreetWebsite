<template lang="html">
  <button type="button" id="nav-button">
    <div class="menu link--font link--sm" ref="menu" :style="{borderColor: color, color}">
      <span>menu</span>
    </div>
  </button>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    els: [],
    color: '#000',
    last: '#000',
    active: false,
    position: {}
  }),
  watch:{
    ready(ready){ready ? this.addEls() : this.reset()}
  },
  mounted(){
    resizer.add(this.getPosition)
    this.getPosition()
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
          offsetStart: this.position.bottom,
          onScroll:({position, scroll})=>{
            let active = position.top < this.position.top + scroll.top
                      && position.bottom > this.position.bottom + scroll.top
                      && position.right > this.position.left

            if (active && !this.active) this.setColor(color)
            if (!active && this.active) this.color = this.last
            this.active = active
          }
        }).id

        return id
      })
    },
    setColor(color){
      this.last = this.color
      this.color = color
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

  .menu{
    flex: 0 0 auto;
    padding: 7px 10px;
    border: 1px solid black;
    transition: border .25s;
    font-size: 14px;
  }

  span{
    transition: color .25s;
  }

  @media (max-width: $tablet){
    height: $space--tb;
    width: $margin--tb;
  }
  @media (max-width: $mobile){
    height: $space--mb;
    width: $margin--mb-right;

    .menu{
      padding: 5px 8px;
      transform: rotate(-90deg);
    }
  }
}
</style>
