<template lang="html">
  <aside id="sidebar" class="width-r">

    <div class="menu-button">
      <button type="button" data-color>menu</button>
    </div>

    <div class="side-nav">
      <nav>
        <button
          type="button"
          :key="i"
          :class="{active: sideNav.active == link.index}"
          v-for="link,i in sideNav.links"
          v-html="link.label"
          @click="setScroll(link.el, link.index)"
        />
      </nav>
    </div>

    <div class="logo-bug">
      <button type="button"><icon logo/></button>
    </div>

  </aside>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    sideNav:{
      links:[],
      scrolling: false,
      active: null
    }
  }),
  watch:{
    ready(r){
      r && this.setSideNav()
    }
  },
  computed: mapState(['ready']),
  methods:{
    setSideNav(){

      let links = Array.from(document.querySelectorAll('[data-nav]')).reverse()
      let container = document.querySelector('[data-nav-container]')

      if (container && links){

        let offsets = container.getAttribute('data-nav-container').replace('[','').replace(']','').split(',')
        let duration = 500 / (container.offsetHeight / 10)
        let timeline = gsap.timeline({paused: true})
                       .to('#sidebar .side-nav',duration,{x:0, ease: 'power4.out'},0)
                       .to('#sidebar .side-nav',duration,{x:'100%', ease: 'power4.in'},10)

        ScrollBuddy.create(container,{
          offsetStart: offsets.length > 0 ? `${offsets[0]}vh` : 0,
          offsetEnd: offsets.length > 1 ? `${offsets[1]}vh` : 0,
          onScroll:(e)=> timeline.progress(e.percent)
        })

        links.forEach((l,i) => ScrollBuddy.create(l,{
            offsetStart:'50vh',
            offsetEnd: '50vh',
            onEnter: ()=> {
              if (!this.sideNav.scrolling) this.sideNav.active = i
              if (this.sideNav.scrolling && i == this.sideNav.active) this.sideNav.scrolling = false
            }
        }))
      }

      this.sideNav.links = links.map((el,i) => ({el,label: el.getAttribute('data-nav'),index: i}))

    },
    setScroll(el, index){
      this.sideNav.active = index
      this.sideNav.scrolling = true
      gsap.to(window,2,{scrollTo: utils.getPosition(el).top, ease: 'power4.out'})
    }
  }
}
</script>

<style lang="scss">
#sidebar{
  z-index: 100;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .menu-button{
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: black;
    height: $nav-d;

    button{
      flex: 0 0 auto;
      padding: 10px 13px;
      border: 1px solid black;

      &.color-active{
        border: 1px solid white;
        color: white;
      }
    }
  }

  .side-nav{
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    nav{
      flex: 0 0 auto;
      transform: rotate(-90deg);
      button{
        padding: 5px 10px;
        text-transform: capitalize;
        transition: color .25s;
        &.active{
          color: $lightBlue !important;
        }
      }
    }
  }

  .logo-bug{
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: $nav-d * 1.25;
    transform: translateY(100%);

    button{
      flex: 0 0 auto;
      width: 120px;
      transform: rotate(-90deg);
      svg{
        width: 100%;
      }
    }
  }
}
</style>
