<template lang="html">
  <div class="section-title"  ref="sectionTitle" v-enter:custom="animation">
    <div class="rule" ref="rule"/>
    <div class="words">
      <template v-for="word,i in words">
        <div class="word" :key="i"><h1 v-html="`${word}&nbsp`"/></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    text:{type: String, default: ''}
  },
  methods:{
    animation(){
      return gsap.timeline({paused: true})
                 .from(this.$refs.rule,.75,{scaleY:0},0)
                 .from(this.$refs.sectionTitle.querySelectorAll('h1'),.65,{yPercent: 100, stagger: .03, ease: 'power4.out'},.4)
    }
  },
  computed:{
    words(){
      return this.text.split(' ')
    }
  }
}
</script>

<style lang="scss">
.section-title{
  display: flex;
  flex-direction: row;

  .rule{
    flex: 0 0 auto;
    width: 10px;
    background: $lightBlue;
    margin-right: 40px;
    margin-bottom: 18px;
    transform-origin: bottom;
  }

  .words{
    flex: 1 1 auto;
    max-width: 800px;
  }

  .word{
    display: inline-block;
    overflow: hidden;
    margin-bottom: 2px;
    h1{
      font-family: 'bebas neue';
      font-size: 80px;
      font-weight: 600;
      line-height: 74%;
      letter-spacing: -1px;
      padding-bottom: 12px;
    }
  }

  @media(max-width: $tablet){
    .rule{
      margin-bottom: 16px;
    }
    .word{
      h1{
        font-size: 65px;
        padding-bottom: 10px
      }
    }
  }

  @media(max-width: $mobile){
    .rule{
      margin-bottom: 12px;
    }
    .word{
      h1{
        font-size: 45px;
        padding-bottom: 7px
      }
    }
  }
}
</style>
