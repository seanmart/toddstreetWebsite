<template lang="html">
  <section id="intro" data-scroll-section>
    <div class="intro-text">
      <text-reveal :play="ready">
        <span v-for="(line, i) in data.text" v-html="line" :key="i" />
      </text-reveal>
    </div>

    <div
    id="intro-video" :class="{hide: hideVideo}">
      <div ref="video" id="5k71u7zdpe" class="video wistia_embed wistia_async_5k71u7zdpe videoFoam=true"/>
    </div>
  </section>
</template>

<script>
import textReveal from "@/components/textReveal";
export default {
  components: { textReveal },
  props: {
    data: Object
  },
  data() {
    return {
      ready: false,
      animations: {},
      hideVideo: false
    };
  },
  watch:{
    ready(){
      this.$gsap.to(this.$refs.video, 2,{opacity: 1})
    }
  },
  mounted() {
    this.$gsap.set(this.$refs.video,{opacity:0})
    setTimeout(() => (this.ready = true), 1000);
    let height = window.innerHeight
    window.addEventListener('resize', ()=> height = window.innerHeight)

    this.$loco.on('scroll',(e)=>{
      e.scroll.y > height && !this.hideVideo && this.handleCall('exit')
      e.scroll.y < height && this.hideVideo && this.handleCall('enter')
    })
  },
  methods:{
    handleCall(status){
      if (status === 'exit'){
        this.hideVideo = true
        Wistia.api('5k71u7zdpe') && Wistia.api('5k71u7zdpe').pause()
      } else {
        this.hideVideo = false
        Wistia.api('5k71u7zdpe') && Wistia.api('5k71u7zdpe').play()
      }
    }
  }
};
</script>

<style lang="scss">
#intro {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  height: 100vh;

  .intro-text {
    flex: 0 0 auto;

    span {
      @include big-text
    }
  }

  #intro-video {
    opacity: 0.3;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 177.777vh;
    min-width: 100vw;
    z-index: -1;

    &.hide{
      display: none;
    }
    .video {
      pointer-events: none;
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width: $mobile) {
  #intro {
    .intro-text {
      margin: 0px auto;
    }
  }
}
</style>
