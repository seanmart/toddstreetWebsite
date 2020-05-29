<template lang="html">
  <header v-element="handleScroll">
    <nav v-section>
      <nuxt-link to="/" class="logo"><icons logo/></nuxt-link>
      <nuxt-link
        class="link navigation--rg"
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        v-html="link.label"
        />
    </nav>
    <button type="button">
       <div class="lines"><i/><i/><i/></div>
     </button>
    <aside ref="tag"><icons logo/></aside>

    <menu>
      this is the menu
    </menu>
  </header>
</template>

<script>
export default {
  data:()=>({
    headerAnimation: null
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
    showHeader(){
      setTimeout(()=> this.$emit('ready'), 250)
      let tl = this.$gsap.timeline()
      tl.set('header',{opacity:1},0)
      tl.fromTo('nav .logo',1,{yPercent: 100},{yPercent:0, ease: 'power4.out'},0)
      tl.fromTo('nav .link',1,{yPercent: 100},{yPercent:0, stagger:.1, ease: 'power4.out'},.25)
      tl.fromTo('header button',1,{scale:.5, opacity:0},{scale: 1, opacity:1, ease: 'power4.out'},.5)
    },
    hideHeader(){
      let tl = this.$gsap.timeline()

      tl.to('header button',.5,{scale:.5, opacity:0, ease: 'power4.in'},0)
      tl.to('nav .link',.5,{yPercent:-100, stagger:-.1, ease: 'power4.in'},.25)
      tl.to('nav .logo',.5,{yPercent:-100, ease: 'power4.in'},.5)
      tl.set('header',{opacity:0})
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
  padding: 0px $space--bg;
  height: $space--bg;
  display: flex;
  align-items: center;
  opacity: 0;

  nav{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px -10px;
    overflow: hidden;
  }

  .logo{
    flex: 0 0 auto;
    width: 200px;
    margin-right: auto;
    padding: 10px;
  }

  .link{
    padding: 10px;
    margin-left: 20px;
  }

  button{
    z-index: 100;
    position: fixed;
    width: $space--bg;
    height: $space--bg;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0px;
    right: 0px;

    i{
      display: block;
      width: 20px;
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
    top: $space--bg * .45;
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
    width: 100vw;
    background: black;
    top: 0px;
    right: 100%;
    z-index: 99;
  }

  @media (max-width: $tablet){
    padding: 0px $space--md;
    height: $space--md;

    button{
      width: $space--md;
      height: $space--md;
    }

    aside{
      height: 120px;
      width: 40px;

      svg{
        width: 80px;
      }
    }

    .link{
      display: none;
    }
  }


  @media (max-width: $mobile){
    padding: 0px $space--sm;

    .logo{
      width: 175px;
    }

    button{
      width: $space--sm;
      height: $space--md;
    }

    aside{
      height: 90px;
      width: 30px;
      top: $space--md * .45;

      svg{
        width: 60px;
      }
    }
  }
}

</style>
