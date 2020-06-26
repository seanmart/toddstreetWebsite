<template lang="html">
  <div id="side-nav" ref="sideNav">
    <aside>
      <button
        v-for="(link,i) in links"
        :key="i"
        class="link link--font"
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
    timeout: null,
    resizeId: null,
    first: true
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
      this.resizeId = resizer.add(this.handleResize)
      }
    },
    reset(){
      this.links = []
      this.container = null

      if (this.links.length > 0 && this.container){
        resizer.add(this.resizeId)
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
        let offsets = container.getAttribute('data-nav-container').replace('[','').replace(']','').split(',')

        this.setTimeline()

        ScrollBuddy.create(this.container,{
          offsetStart:offsets.length > 0 ? `${offsets[0]}vh` : 0,
          offsetEnd: offsets.length > 1 ? `${offsets[1]}vh` : 0,
          onScroll:(e)=> this.timeline.progress(e.percent)
        })
      }
    },
    setTimeline(){
      if (this.timeline) this.timeline.kill()
      let duration = 500 / (this.container.offsetHeight / 10)
      this.timeline = gsap.timeline({paused: true})
                          .to('#side-nav',duration,{x: '-100%', opacity: 1, ease: 'power4.out'},0)
                          .to('#side-nav',duration,{x: '0%', opacity: 0, ease: 'power4.in'},10)
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
  top: 0px;
  height: 100vh;
  z-index: 50;
  left: 100%;
  opacity: 0;
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
