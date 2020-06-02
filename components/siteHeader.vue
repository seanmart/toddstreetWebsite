<template lang="html">
  <header v-scroll="toggleTag">
    <section class="top full-width" v-section>

      <div class="logo">
        <nuxt-link to="/" class="logo"><icons logo/></nuxt-link>
      </div>

      <nav>
        <nuxt-link
          class="link navigation--rg"
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          v-html="link.label"
          />
      </nav>

    </section>

    <button type="button" @click="toggleMenu">
       <div class="lines"><i/><i/><i/></div>
     </button>

    <aside :class="{show: showTag}"><icons logo/></aside>

    <menu>
      <div class="content">
        <section class="top">
          <div class="logo">
            <nuxt-link to="/" class="logo"><icons logo/></nuxt-link>
          </div>
        </section>
      </div>
    </menu>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    menuOpen: false,
    showTag: false
  }),
  watch:{
    ready(ready){
      if (ready){
        let tl = this.$gsap.timeline()
        tl.set('header',{opacity:1},0)
        tl.fromTo('header .top svg',1,{yPercent: 100},{yPercent:0, ease: 'power4.out'},0)
        tl.fromTo('header .top .link',1,{yPercent: 100},{yPercent:0, stagger:.1, ease: 'power4.out'},.25)
        tl.fromTo('header button',1,{scale:.5, opacity:0},{scale: 1, opacity:1, ease: 'power4.out'},.5)
      }
    },
    $route(){
      let tl = this.$gsap.timeline()
      tl.to('header button',.5,{scale:.5, opacity:0, ease: 'power4.in'},0)
      tl.to('header .top .link',.5,{yPercent:-100, stagger:-.1, ease: 'power4.in'},.25)
      tl.to('header .top svg',.5,{yPercent:-100, ease: 'power4.in'},.5)
    }
  },
  methods:{
    toggleMenu(){
      this.menuOpen ? this.closeMenu() : this.openMenu()
    },
    toggleTag(e){
      this.showTag = e.leave
    },
    openMenu(){
      this.menuOpen = true
      let tl = this.$gsap.timeline()
      tl.to('header menu',1,{width: '100vw', ease: 'power4.out'},0)
      tl.to('header .lines i',.25,{background: 'white'},.4)
      tl.to('header menu svg',1,{yPercent: -100, ease: 'power4.out'},.2)
    },
    closeMenu(){
      let tl = this.$gsap.timeline({onComplete: ()=> this.menuOpen = false})
      tl.to('header menu svg',.5,{yPercent: 0,clearProps: 'all', ease: 'power4.in'},0)
      tl.to('header .lines i',.25,{clearProps: 'all'},0)
      tl.to('header menu',.4,{width: 0, clearProps: 'all', ease: 'power1.in'},.2)
    }
  },
  computed:{
    ...mapState(['ready']),
    links(){
      let links = []
      let files = require.context('../pages', true, /.vue$/)
      files.keys().forEach(page => {
        let dataFn = files(page).default.data
        if (dataFn) {
          let data = dataFn()
          if (data.nav){
            let url = page.replace('.','').replace('.vue','')
            links.push({...data.nav, to: url})
          }
        }
      })
      return links.sort((a,b) => a.order < b.order)
    }
  }
}
</script>

<style lang="scss">

header{
  opacity: 0;

  .top{
    width: 100%;
    height: $desktop-nav-height;
    margin: 0px -10px;
    padding-top: 0px;
    padding-bottom: 0px;
    display: flex;
    align-items: center;
  }

  .logo{
    overflow: hidden;
    flex: 0 0 auto;
    a{
      display: block;
    }
    svg{
      padding: 10px;
      width: 200px;
      fill: inherit;
    }
  }

  nav{
    overflow: hidden;
    flex: 0 0 auto;
    margin-left: auto;

    .link{
      display: inline-block;
      padding: 10px;
      margin-left: 20px;
    }
  }

  button{
    z-index: 101;
    position: fixed;
    padding: 0px;
    width: $desktop-margins;
    height: $desktop-nav-height;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0px;
    right: 0px;

    i{
      display: block;
      width: 38px;
      height: 2px;
      background: black;
      border-radius: 1px;
      margin: 4px 0px;
    }
  }

  aside{
    z-index: 98;
    position: fixed;
    padding: 0px;
    right: 100%;
    top: 70px;
    height: 150px;
    width: 50px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .25s;
    &.show{
      transform: translateX(100%);
    }

    svg{
      flex: 0 0 auto;
      fill: white;
      width: 100px;
      transform: rotate(90deg)
    }
  }

  menu{
    position: fixed;
    height: 100vh;
    width: 0px;
    background: black;
    top: 0px;
    left: 0px;
    overflow: hidden;
    z-index: 100;

    .content{
      width: 100vw
    }

    .logo{
      svg{
        fill: white;
        transform: translateY(100%);
      }
    }
  }


  @media (max-width: $tablet){
    .top{
      height: $tablet-nav-height;
    }

    button{
      width: $tablet-margins;
      height: $tablet-nav-height;
    }

    aside{
      height: 120px;
      width: 40px;
      top: 55px;

      svg{
        width: 80px;
      }
    }

    nav{
      display: none;
    }
  }


  @media (max-width: $mobile){
    .top{
      height: $mobile-nav-height;
    }

    .logo svg{
      width: 175px;
    }

    button{
      width: $mobile-margin-right;
      height: $mobile-nav-height;
      i{
        width: 25px;
      }
    }

    aside{
      left: 100%;
      right: auto;
      bottom: 40px;
      top: auto;
      max-width: 40px;
      width: $mobile-margin-right / 1.5;
      svg{
        transform: rotate(-90deg)
      }
      &.show{
        transform: translateX(-100%);
      }
    }
  }
}

</style>
