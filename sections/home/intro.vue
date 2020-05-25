<template lang="html">
  <section id="intro" v-section>

    <div class="title" v-element="handleScroll">
      <splitText :text="data.title"/>
    </div>

    <div class="description" ref="desc">
      <p v-html="description"/>
    </div>

  </section>
</template>

<script>
export default {
  props:{
    data: {type: Object, default: ()=>({})}
  },
  data(){
    return{
      animate: null
    }
  },
  mounted(){

    this.$nextTick(()=>this.setHoverItems())

    let tl = this.$gsap.timeline({delay: .5, onComplete: this.initHoverEls })
    tl.from('#intro .title',2,{yPercent: -100,ease: 'power4.out'},0)
    tl.from('#intro .word span',1,{yPercent:-140,stagger: .05, ease: 'power4.out'},.2)
    tl.from('#intro .description', 1.5,{yPercent:-50, opacity:0,ease: 'power4.out'},.4)
    tl.from('#intro .description i', 1,{scaleX:0, stagger: .05, ease: 'power2.inOut'},.75)

    this.animate = this.$gsap.timeline({paused: true})
    this.animate.to('#intro .word',1,{x:(i)=>`${i * 1.5}vw`, ease: 'none'},0)

  },
  computed:{
    description(){
      return this.data.description.hover.reduce((a,i)=>{
        return a.replace(i.text,`<b>${i.text}<i></i><img src="${i.gif}"/></b>`)
      },this.data.description.text)
    }
  },
  methods:{
    setHoverItems(){
      Array.from(this.$refs.desc.getElementsByTagName('b')).map(el =>{

        let img = el.getElementsByTagName('img')

        this.$vb.addMouseElement(el,(e)=>{
          if (e.entering){
            this.$gsap.to(img,.2,{ display: 'block',scale: 1, opacity: 1})
          } else if (e.active){
            this.$gsap.to(img,.1,{x: e.x, y: e.y})
          } else if (e.leaving){
            this.$gsap.to(img,.2,{ scale: 0, opacity: 0, display: 'none'})
          }
        })

      })
    },
    handleScroll(e){
      //this.animate.progress(e.percent)
    },
  }
}
</script>

<style lang="scss">
#intro{
  position: relative;
  padding-top: $v-space / 1.5;

  .title{
    margin-bottom: $v-space / 3;

    .word{
      overflow: hidden;
      span{
        @include title;
      }
    }
  }

  .description{
    position: relative;

    img{
      position: absolute;
      display: block;
      bottom: 200%;
      left: 0px;
      max-width: 200px;
      max-height: 200px;
      pointer-events: none;
      user-select: none;
      transform: scale(0);
      opacity: 0;
    }

    i{
      position: absolute;
      display: block;
      top: 95%;
      left: 0px;
      height: 2px;
      width: 100%;
      background: #0053AD;
      transition: opacity .5s;
      transform-origin: left;
      border-radius: 1px;
      opacity: .2;
    }

    b{
      font-weight: 500;
      cursor: pointer;
      transition: color .5s;
      position: relative;
      color: #0053AD;
      &:hover{
        i{
          opacity: 1;
        }
      }
    }

    p{
      @include body-big;
      max-width: 800px;
      display: inline-block;
    }
  }

  @media (max-width: $tablet){
    padding-top: $v-space / 3;

    .title{
      .word{
        &:first-child{
          display: block;
          margin-bottom: 4px;
        }
      }
      .break{
        display: none;
      }
    }
  }

}
</style>
