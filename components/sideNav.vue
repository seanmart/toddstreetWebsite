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
    let id = 0
    this.links = Array.from(document.querySelectorAll('[data-nav]')).map(el =>{
      return {label: el.getAttribute('data-nav'), el, id: id++ }
    }).reverse()
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
      this.$vb.scroll.scrollTo(el)
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
