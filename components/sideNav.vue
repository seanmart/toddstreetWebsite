<template lang="html">
  <div id="side-nav">
    <aside class="navigation--rg">
      <h3
        v-for="(link,i) in links"
        :key="i"
        class="link"
        :class="{active: active == link.id}"
        @click="setScroll(link.el, link.id)"
        v-html="link.label"
      />
    </aside>
  </div>
</template>

<script>
import tools from '@/assets/virtualBuddy/tools'
export default {
  data:()=>({
    active: null,
    scrolling: false,
    links:[]
  }),
  watch:{
    active(active){
      this.scrolling && active !== this.scrollTo
    }
  },
  mounted(){
    this.links = Array.from(document.querySelectorAll('[data-nav]')).map(el =>{
      let id = this.$vb.addElement(el,{scroll: this.onScroll, offsetTop:'50vh', offsetBottom: '50vh'})
      return {label: el.getAttribute('data-nav'), el, id }
    }).reverse()
  },
  destroyed(){
    this.links.forEach(link => this.$vb.removeElement(link.id))
  },
  methods:{
    onScroll(e){
      if (e.enter){
        if (!this.scrolling) this.active = e.id
        if (this.scrolling && e.id == this.active) this.scrolling = false
      }
    },
    setScroll(el, id){
      this.active = id
      this.scrolling = true
      gsap.to(window,2,{scrollTo: tools.getPosition(el).top, ease: 'power4.out'})
    }
  }
}
</script>

<style lang="scss">

#side-nav{
  position: fixed;
  top: 50%;
  z-index: 50;
  left: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: $desktop-margins;

  aside{
    flex: 0 0 auto;
    transform: rotate(-90deg);
    display: flex;
    justify-content: space-between;
  }

  .link{
    cursor: pointer;
    flex: 1 1 auto;
    padding: 10px 15px;
    position: relative;
    &.active{
      color: $blue;
    }
  }

  @media (max-width: $tablet){
    width: $tablet-margins;
  }

  @media (max-width: $mobile){
    width: $mobile-margin-right;
  }
}
</style>
