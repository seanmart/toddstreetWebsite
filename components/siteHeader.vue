<template lang="html">
  <header v-element="handleScroll">
    <div class="top" v-section>

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

    </div>

    <button type="button" @click="toggleMenu">
       <div class="lines"><i/><i/><i/></div>
     </button>

    <aside ref="tag"><icons logo/></aside>

    <menu>
      <div class="content">
        <div class="top">
          <div class="logo">
            <nuxt-link to="/" class="logo"><icons logo/></nuxt-link>
          </div>
        </div>
      </div>
    </menu>
  </header>
</template>

<script>
export default {
  data:()=>({
    menu: false,
    tag: false
  }),
  watch:{
    $route(){
      this.hideHeader()
      setTimeout(this.showHeader,1500)
    }
  },
  mounted(){
    setTimeout(this.showHeader,500)
  },
  methods:{
    toggleMenu(){
      this.menu ? this.closeMenu() : this.openMenu()
    },
    showHeader(){
      setTimeout(()=> this.$emit('ready'), 250)
      let tl = this.$gsap.timeline()
      tl.set('header',{opacity:1},0)
      tl.fromTo('header .top svg',1,{yPercent: 100},{yPercent:0, ease: 'power4.out'},0)
      tl.fromTo('header .top .link',1,{yPercent: 100},{yPercent:0, stagger:.1, ease: 'power4.out'},.25)
      tl.fromTo('header button',1,{scale:.5, opacity:0},{scale: 1, opacity:1, ease: 'power4.out'},.5)
    },
    hideHeader(){
      let tl = this.$gsap.timeline()

      tl.to('header button',.5,{scale:.5, opacity:0, ease: 'power4.in'},0)
      tl.to('header .top .link',.5,{yPercent:-100, stagger:-.1, ease: 'power4.in'},.25)
      tl.to('header .top svg',.5,{yPercent:-100, ease: 'power4.in'},.5)
      tl.set('header',{opacity:0})
    },
    openMenu(){
      this.menu = true
      let tl = this.$gsap.timeline()
      tl.to('header menu',1,{width: '100vw', ease: 'power4.out'},0)
      tl.to('header .lines i',.25,{background: 'white'},.4)
      tl.to('header menu svg',1,{yPercent: -100, ease: 'power4.out'},.2)
    },
    closeMenu(){
      let tl = this.$gsap.timeline({onComplete: ()=> this.menu = false})
      tl.to('header menu svg',.5,{yPercent: 0,clearProps: 'all', ease: 'power4.in'},0)
      tl.to('header .lines i',.25,{clearProps: 'all'},0)
      tl.to('header menu',.4,{width: 0, clearProps: 'all', ease: 'power1.in'},.2)
    },
    handleScroll(e){
      e.status == 'leave' && this.$gsap.to(this.$refs.tag,.5,{xPercent: 100, ease: 'expo.inOut'})
      e.status == 'enter' && this.$gsap.to(this.$refs.tag,.5,{xPercent: 0,ease: 'expo.inOut'})
    }
  },
  computed:{
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
    padding: 0px $desktop-margins;
    display: flex;
    align-items: center;
  }

  .logo{
    overflow: hidden;
    flex: 0 0 auto;
    svg{
      width: 200px;
      padding: 10px;
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
    right: 100%;
    top: 70px;
    height: 150px;
    width: 50px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

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
      padding: 0px $tablet-margins;
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
      padding: 0px $mobile-margins;
    }

    .logo svg{
      width: 175px;
    }

    button{
      width: $mobile-margins;
      height: $mobile-nav-height;
    }

    aside{
      height: 80px;
      width: 30px;
      border-radius: 0px;
      top: 34px;

      svg{
        width: 60px;
      }
    }
  }
}

</style>
