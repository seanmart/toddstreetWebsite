<template lang="html">
  <div id="lightbox">
    <div class="container">

      <div class="content" @click="close">
        <template v-for="item,i in media">
          <img v-if="item.type == 'image'" :src="item.src" alt="">
        </template>
      </div>

      <div class="background"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    tl: null,
    active: 0
  }),
  computed:{
    ...mapState({
      media: (state)=> state.lightbox.media,
      startOn: (state)=> state.lightbox.startOn
    })
  },
  watch:{
    media(media){
      if(Array.isArray(media) && media.length > 0){
        this.active = this.startOn
        this.open()
      }
    }
  },
  methods:{
    remove(){
      this.image = null
      this.video = null
    },
    open(){
      this.tl && this.tl.kill()
      this.tl = gsap.timeline()
                    .set('#lightbox',{display:'block'})
                    .to('#lightbox .background',.25,{opacity:.9},0)
                    .to('#lightbox .content',.25,{scale:1, opacity: 1},0.2)
    },
    close(){
      this.tl && this.tl.kill()
      this.tl = gsap.timeline({onComplete:()=> this.$store.commit('lightbox',{})})
                    .to('#lightbox .content',.15,{scale:.5,opacity: 0},0)
                    .to('#lightbox .background',.25,{opacity:0},.1)
                    .set('#lightbox',{display:'none'})
    },
  }
}
</script>

<style lang="scss">
#lightbox{
  position: fixed;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  top: 0px;
  left: 0px;
  display: none;

  .container{
    height: 100%;
    width: 100%;
    position: relative;
  }

  .background,
  .content{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
  }

  .background{
    background: black;
    opacity: 0
  }

  .content{
    transform: scale(.5);
    opacity: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img{
    max-height: 90vh;
    max-width: 90vw;
  }


}
</style>
