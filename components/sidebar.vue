<template lang="html">
  <aside id="sidebar" class="width-r">

    <div class="menu-button">
      <button type="button" class="h6 caps" data-color @click="menu = !menu">menu</button>
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

    <div class="logo-bug" data-color ref="logo">
      <button type="button"><icon logo /></button>
    </div>

  </aside>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    menu: false,
    sideNav:{
      links:[],
      scrolling: false,
      active: null,
    }
  }),
  watch:{
    ready(r){
      r && this.setSideNav()
    },
    menu(m){
      m
      ? this.$store.dispatch('openMenu')
      : this.$store.dispatch('closeMenu')
    }
  },
  computed: mapState(['ready']),
  methods:{
    setSideNav(){

      gsap.set('#sidebar .logo-bug',{clearProps: 'all'})
      gsap.set('#sidebar .side-nav',{clearProps: 'all'})

      let links = Array.from(document.querySelectorAll('[data-nav]')).reverse()
      let container = document.querySelector('[data-nav-container]')

      if (container && links){

        let offsets = container.getAttribute('data-nav-container').replace('[','').replace(']','').split(',')
        let duration = 500 / (container.offsetHeight / 10)

        let navtl = gsap.timeline({paused: true})
                       .to('#sidebar .side-nav',duration,{x:0, ease: 'power4.out'},0)
                       .to('#sidebar .side-nav',duration,{x:'100%', ease: 'power4.in'},10)

        ScrollBuddy.create(container,{
          offsetStart: offsets.length > 0 ? `${offsets[0]}vh` : 0,
          offsetEnd: offsets.length > 1 ? `${offsets[1]}vh` : 0,
          onScroll:(e)=> navtl.progress(e.percent)
        })

        links.forEach((l,i) => ScrollBuddy.create(l,{
            offsetStart:'50vh',
            offsetEnd: '50vh',
            onEnter: ()=> {
              if (!this.sideNav.scrolling) this.sideNav.active = i
              if (this.sideNav.scrolling && i == this.sideNav.active) this.sideNav.scrolling = false
            }
        }))

        let logotl = gsap.to('#sidebar .logo-bug',1,{y:0, ease: 'none', paused: true},0)

        ScrollBuddy.create(this.$refs.logo,{
          start: 200,
          end: 600,
          onScroll:(e)=> logotl.progress(e.percent),
        })
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
    &.color-active{
      fill: white;
      transition: fill .5s;
    }

    button{
      flex: 0 0 auto;
      width: 120px;
      transform: rotate(-90deg);
      svg{
        width: 100%;
      }
    }
  }

  @media (max-width: $mobile){
    .menu-button{
      height: $nav-m;
      button{
        transform: rotate(-90deg);
        padding: .5em;
        font-size: .9em;
      }
    }

  }
}
</style>
