<template lang="html">
  <section id="landing">
    <div class="content container">

      <split-text
        v-for="item,i in data"
        :key="`title${i}`"
        :text="`${item.title}&nbsp&nbsp${item.title}&nbsp&nbsp${item.title}`"
        :class="`title-${i}`"
        class="title outer"
        textClass="h0 contain"
      />

      <div class="main">

        <div class="container message">
            <split-text
                v-for="item,i in data"
                :key="`message${i}`"
                :text="item.message"
                :class="`message-${i}`"
                class="inner-message"
                textClass="p4"
              />
        </div>

        <div class="container timer">
          <p v-html="`0${index + 1} / 0${data.length}`"/>
          <div class="bar"><div class="inner-bar"/></div>
        </div>

      </div>

      <div class="window container">

        <div class="image" v-for="item,i in data" :key="`image${i}`" :class="`image-${i}`">
          <div v-image="item.image" class="inner-image" v-speed="'20%'"/>
        </div>

        <split-text
          v-for="item,i in data"
          :key="`title${i}`"
          :text="`${item.title}&nbsp&nbsp${item.title}&nbsp&nbsp${item.title}`"
          :class="`title-${i}`"
          class="title inner"
          textClass="h0 contain"
        />

      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:['data', 'ready'],
  data:()=>({
    index: 0,
    tl: null,
    duration: 10,
    transition: 1.25
  }),
  mounted(){
    ScrollBuddy.create('#landing',{
      onEnter:()=> this.tl && this.tl.play(),
      onLeave:()=> this.tl && this.tl.pause()
    })
  },
  watch:{
    ready(ready){
      ready && setTimeout(this.animate,500)
    }
  },
  destroyed(){
    this.tl && this.tl.kill()
  },
  methods:{
    animate(){

      let t = this.transition
      let d = this.duration
      let i = this.index
      let timer = ['#landing .timer p','#landing .timer .bar']

      this.tl = gsap.timeline()

      //load
      this.tl.to(`#landing .image-${i}`,t,{y:0, ease: 'power4.out'},0)
      this.tl.to(`#landing .title-${i}`,t + d,{x: d * -90, ease: 'none'},.3)
      this.tl.to(`#landing .outer.title-${i} span`,t,{y:0, stagger: .05, ease: 'power4.out'},.3)
      this.tl.to(`#landing .inner.title-${i} span`,t,{y:0, stagger: .05, ease: 'power4.out'},.3)
      this.tl.to(`#landing .message-${i} span`,t,{y:0,stagger: .01, ease: 'power4.out'},.4)
      this.tl.to(timer,t,{y:0, stagger: .05, ease: 'power4.out'},.5)
      this.tl.from(`#landing .inner-bar`,d,{scaleX:0, ease: 'none'},.5)

      //unload
      this.tl.to(`#landing .outer.title-${i} span`,t,{yPercent:-100, ease: 'power4.in'},d)
      this.tl.to(`#landing .inner.title-${i} span`,t,{yPercent:-100, ease: 'power4.in'},'<')
      this.tl.to(`#landing .message-${i} span`,t,{yPercent:-100, ease: 'power4.in'},'<')
      this.tl.to(timer,t,{y:-50, ease: 'power4.in'},'<')
      this.tl.to(`#landing .image-${i}`,t,{yPercent:-100, ease: 'power4.in'},'<.25')

      //reset
      this.tl.set(`#landing .title-${i} span`,{clearProps:'y'})
      this.tl.set(`#landing .message-${i} span`,{clearProps:'y'})
      this.tl.set(`#landing .image-${i}`,{clearProps:'y'})
      this.tl.set(`#landing .title-${i}`,{clearProps:'x'})
      this.tl.set(timer,{clearProps:'y'})

      //next
      this.tl.add(this.next)

    },
    next(){
      this.index = this.index < this.data.length - 1 ? this.index + 1 : 0
      this.animate()
    }
  }
}
</script>

<style lang="scss">
#landing{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 800px;

  .content{
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 500px;
  }

  .container{
    position: relative;
  }

  .title{
    z-index: 1;
    position: absolute;
    top: 50px;
    width: 100vw;
    right: 0px;
    white-space: nowrap;
    padding-left: $space-ld;

    span{
      transform: translateY(100%);
      font-weight: 400;
      letter-spacing: -1.5px;
    }
  }

  .main{
    flex: 1 0 600px;
    display: flex;
    flex-direction: column;
  }

  .window{
    flex: 0 1 500px;
    margin-right: $space-rd;
    z-index: 2;
    overflow: hidden;

    .title{
      right: -$space-rd;
      color: white;
    }
  }

  .image{
    position: absolute;
    overflow: hidden;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    transform: translateY(101%);

    .inner-image{
      flex: 0 0 auto;
      height: 120%;
      width: 100%;
    }
  }

  .message{
    margin: 200px $space-ld 0px;
    flex: 1 1 auto;

    .inner-message{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;

      span{
        transform: translateY(100%);
      }
    }
  }

  .timer{
    flex: 0 0 auto;
    margin-left: $space-ld;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    margin-bottom: -8px;

    p{
      flex: 0 0 auto;
      transform: translateY(50px);
    }

    .bar{
      flex: 0 1 200px;
      height: 2px;
      margin-left: 20px;
      background: #ddd;
      transform: translateY(50px);
    }

    .inner-bar{
      height: 100%;
      width: 100%;
      background: black;
      transform-origin: left;
    }
  }

  @media (max-width: $tablet){
    .title{padding-left: $space-lt}

    .window{
      margin-right: $space-rt;
      .title{right: -$space-rt}
    }
    .message{
      margin: 170px $space-lt 0px;
    }
    .main{
      flex: 1 0 350px;
    }
    .timer{
      margin-left: $space-lt;
    }
  }

  @media (max-width: $mobile){
    padding: $nav-m 0px;
    align-items: stretch;
    min-height: 600px;
    height: 92vh;

    .content{
      height: auto;
      flex-direction: column-reverse;
    }
    .title{
      padding-left: $space-lm;
      top: 100px;
    }

    .window{
      flex: 0 0 250px;
      margin-right: $space-rm;
      .title{right: -$space-rm}
    }
    .message{
      margin-top: $space-rm;
      margin-left: $space-lm;
      margin-right: $space-rm;
    }
    .main{
      flex: 1 1 auto;
    }
    .timer{
      margin-bottom: 0px;
      margin-left: $space-lm;
    }
  }

  @media(min-width: $desktop){
    .content{
      height: 60vh;
    }

    .window{
      flex: 0 1 60vh;
    }

    .message{
      margin-top: 25vh;
    }
  }

}
</style>
