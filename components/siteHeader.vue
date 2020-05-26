<template lang="html">
  <header v-element="handleScroll">
    <nav v-section>
      <nuxt-link to="/" class="logo"><icons logo/></nuxt-link>
      <nuxt-link
        class="link"
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        v-html="link.label"
        />
    </nav>
    <button type="button"><i/><i/></button>
    <aside ref="tag"><icons logo/></aside>
  </header>
</template>

<script>
export default {
  watch:{
    $route(){
      let tl = this.$gsap.timeline()
      tl.to('header button',.5,{scale:.5, opacity:0, ease: 'power4.in'},0)
      tl.to('nav .link',.5,{yPercent: -100, stagger: -.1, ease: 'power4.in'},0)
      tl.to('nav .logo',.5,{yPercent: -100, ease: 'power4.in'},.25)
      tl.set(['nav .link','nav .logo'],{yPercent: 100})
      tl.to('nav .logo',.5,{yPercent: 0,ease: 'power4.out'},1)
      tl.to('nav .link',.5,{yPercent: 0, stagger: .1,ease: 'power4.out'},1.25)
      tl.to('header button',.5,{scale:1, opacity:1,ease: 'power4.out'},1.25)
    }
  },
  mounted(){
    let tl = this.$gsap.timeline({delay: .5})
    tl.from('header button',1,{scale:.5, opacity:0, ease: 'power4.out'},0)
    tl.from('nav .link',1,{yPercent: -100, stagger: -.1, ease: 'power4.out'},0)
    tl.from('nav .logo',1,{yPercent: -100, ease: 'power4.out'},.25)
  },
  methods:{
    handleScroll(e){
      e.left && this.$gsap.to(this.$refs.tag,.5,{xPercent: 100, ease: 'expo.inOut'})
      e.entering && this.$gsap.to(this.$refs.tag,.5,{xPercent: 0,ease: 'expo.inOut'})
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
    @include headerFont;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 18px;
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
      width: 30px;
      height: 2px;
      background: black;
      border-radius: 1px;
      margin: 3px 0px;
    }
  }

  aside{
    z-index: 100;
    position: fixed;
    right: 100%;
    bottom: 50px;
    height: 150px;
    width: 50px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;

    svg{
      flex: 0 0 auto;
      fill: white;
      width: 100px;
      transform: rotate(-90deg)
    }
  }
  @media (max-width: $tablet){
    padding: 0px $space--md;

    button{
      width: $space--md;
    }

    .link{
      display: none;
    }
  }


  @media (max-width: $mobile){
    padding: 0px $space--sm;
  }
}

</style>
