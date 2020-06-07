<template lang="html">
  <header v-scroll="toggleTag">
    <section class="top" v-section>

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
       <div class="lines">
         <i :style="{backgroundColor: navColor}"/>
         <i :style="{backgroundColor: navColor}"/>
         <i :style="{backgroundColor: navColor}"/>
       </div>
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
        let tl = gsap.timeline()
        tl.set('header',{opacity:1},0)
        tl.fromTo('header .top svg',1,{yPercent: 100},{yPercent:0, ease: 'power4.out'},0)
        tl.fromTo('header .top .link',1,{yPercent: 100},{yPercent:0, stagger:.1, ease: 'power4.out'},.25)
        tl.fromTo('header button',1,{scale:.5, opacity:0},{scale: 1, opacity:1, ease: 'power4.out'},.5)
      }
    },
    $route(){
      let tl = gsap.timeline()
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
      let tl = gsap.timeline()
      tl.to('header menu',1,{width: '100vw', ease: 'power4.out'},0)
      tl.to('header .lines i',.25,{background: 'white'},.4)
      tl.to('header menu svg',1,{yPercent: -100, ease: 'power4.out'},.2)
    },
    closeMenu(){
      let tl = gsap.timeline({onComplete: ()=> this.menuOpen = false})
      tl.to('header menu svg',.5,{yPercent: 0,clearProps: 'all', ease: 'power4.in'},0)
      tl.to('header .lines i',.25,{background: this.navColor},.15)
      tl.to('header menu',.4,{width: 0, clearProps: 'all', ease: 'power1.in'},.2)
    }
  },
  computed:mapState(['ready', 'navColor','links'])
}
</script>

<style lang="scss">

header{
  opacity: 0;

  .top{
    height: $desktop-section-space;
    padding-top: 0px;
    padding-bottom: 0px;
    display: flex;
    align-items: center;
  }

  .logo{
    flex: 0 0 auto;
    overflow: hidden;

    a{
      display: block;
      margin-left: -10px;
    }
    svg{
      width: 200px;
      fill: inherit;
      padding: 10px;
    }
  }

  nav{
    overflow: hidden;
    flex: 0 0 auto;
    margin-left: auto;
    margin-right: -10px;

    .link{
      display: inline-block;
      padding: 10px;
      margin-left: 25px;
    }
  }

  button{
    z-index: 101;
    position: fixed;
    padding: 0px;
    width: $desktop-margins;
    height: $desktop-section-space;
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
      height: $tablet-section-space;
    }

    button{
      width: $tablet-margins;
      height: $tablet-section-space;
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
      height: $mobile-section-space;
    }

    .logo svg{
      width: 175px;
    }

    button{
      width: $mobile-margin-right;
      height: $mobile-section-space;
      i{
        width: 25px;
      }
    }

    aside{
      left: 100%;
      right: auto;
      height: 110px;
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
