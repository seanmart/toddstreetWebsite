<template>
  <transition name="load" v-on:after-leave="init">
    <div v-if="loaded" key="page" id="page" :class="{touch}">
      <site-header/>
      <nuxt />
      <site-footer/>
    </div>
    <div v-else id="loader" key="load">
      <icons logo class="logo"/>
      <div class="loader">Loading...</div>
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

    imagesLoaded('#site',{background: true},()=> {
      let timeDiff = Date.now() - this.time
      setTimeout(()=> this.loaded = true, Math.max(1000 - timeDiff,0))
    })

  },
  watch:{
    $route(){
      this.$store.commit('ready', false)
      setTimeout(()=> {
        this.$store.commit('ready', true)
        this.$vb.init()
      },1500)
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
    max-width: 80vw;
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

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
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
