<template lang="html">
  <div id="side-nav" ref="sideNav">
    <aside class="link--font">
      <h3
        v-for="(link,i) in links"
        :key="i"
        class="link"
        :class="{active: active == link.index}"
        @click="setScroll(link.el, link.index)"
        v-html="link.label"
      />
    </aside>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    active: null,
    scrolling: false,
    links:[],
    container:null,
    timeline: null,
    timeout: null
  }),
  watch:{
    ready(ready){
      ready ? this.init() : this.reset()
    },
    active(active){
      this.scrolling && active !== this.scrollTo
    }
  },
  computed: mapState(['ready']),
  methods:{
    init(){
      this.addLinks()
      this.setContainer()
      if (this.links.length > 0 && this.container){
        window.addEventListener('resize',this.handleResize)
      }
    },
    reset(){

      this.links = []
      this.container = null

      if (this.links.length > 0 && this.container){
        window.removeEventListener('resize',this.handleResize)
        this.timeline.kill()
        this.timeline = null
      }
    },
    addLinks(){
      Array.from(document.querySelectorAll('[data-nav]')).reverse().forEach((el,i) => {

        ScrollBuddy.create(el,{
          offsetStart:'50vh',
          offsetEnd: '50vh',
          onEnter: ()=> {
            if (!this.scrolling) this.active = i
            if (this.scrolling && i == this.active) this.scrolling = false
          }
        })


        this.links.push({el,label: el.getAttribute('data-nav'),index: i})
      })

    },
    setContainer(){
      let container = document.querySelector('[data-nav-container]')
      if (container){
        this.container = container
        this.setTimeline()

        ScrollBuddy.create(this.container,{
          offsetStart:'50vh',
          offsetEnd: '75vh',
          onScroll:(e)=> this.timeline.progress(e.percent)
        })
      }
    },
    setTimeline(){
      if (this.timeline) this.timeline.kill()
      let duration = 500 / (this.container.offsetHeight / 10)
      this.timeline = gsap.timeline({paused: true})
                          .to('#side-nav',duration,{x: '-100%', ease: 'power4.out'},0)
                          .to('#side-nav',duration,{x: '0%', ease: 'power4.in'},10)
    },
    setScroll(el, index){
      this.active = index
      this.scrolling = true
      gsap.to(window,2,{scrollTo: utils.getPosition(el).top, ease: 'power4.out'})
    },
    handleResize(){
      clearTimeout(this.timeout)
      this.timeout = (this.setTimeline,250)
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
  width: $margin--dk;

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
      color: $lightBlue;
    }
  }

  @media (max-width: $tablet){
    width: $margin--tb
  }

  @media (max-width: $mobile){
    width: $margin--mb-right;
  }
}
</style>
