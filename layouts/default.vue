<template>
  <transition name="load" v-on:after-leave="init">
    <div v-if="loaded" key="page" id="page" :class="{touch}">
      <site-header/>
      <nuxt />
      <site-footer/>
    </div>
    <div v-else id="loader" key="load">
      <icons logo class="logo"/>
    </div>
  </transition>
</template>
<script>

import siteHeader from '@/components/siteHeader'
import siteFooter from '@/components/siteFooter'

var imagesLoaded = require('imagesloaded');

export default{
  components:{siteHeader,siteFooter},
  data:()=>({
    touch: false,
    loaded: false,
    time: null
  }),
  mounted(){
    this.time = Date.now()
    this.touch = this.$vb.touch
    if (this.touch) gsap.set('#loader', {height: window.innerHeight})

    imagesLoaded('#site',{background: true},()=> {
      let timeDiff = Date.now() - this.time
      setTimeout(()=> this.loaded = true, Math.max(1500 - timeDiff,0))
    })

  },
  watch:{
    $route(to,from){
      if (to.matched[0].path !== from.matched[0].path){
        this.$store.commit('ready', false)
        setTimeout(this.init,1750)
      }
      window.scrollTo(0,0)
    }
  },
  methods:{
    init(){
      this.$store.commit('ready', true)
      this.$vb.init()
    }
  }
}
</script>
<style lang="scss">

#page{
  overflow: hidden;
  width: 100vw;
  &.hide{
    opacity: 0;
  }
}

#loader{
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo{
    width: 400px;
    max-width: 50vw;
    fill: white;
    animation: slideup 1s backwards;
    animation-delay: .25;
  }
}

.load-enter-active, .load-leave-active {
  transition: .5s
}

.page-enter-active, .page-leave-active {
  transition: 1s
}

.load-enter, .load-leave-to,
.page-enter, .page-leave-to{
  opacity: 0;
}

.page-enter-active, .page-leave-active {
  transition: 1s
}

.page-enter, .page-leave-to{
  opacity: 0;
}

@keyframes slideup{
  0%{
    opacity: 0;
    transform: translateY(100%);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
