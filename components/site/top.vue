<template lang="html">
  <div id="top">
    <div class="side logo">
      <logo/>
    </div>

    <div class="mobile logo">
      <logo/>
    </div>

    <button class="button" type="button" name="menu" @click="open = !open">
      <div class="line top"/>
      <div class="line bottom"/>
    </button>

    <div class="menu">
      <div class="content padding">

        <div class="links">
            <nuxt-link v-for="(link,i) in data.links" :key="i" :to="link.path">
              <h1 class="inner-link">{{link.label}}</h1>
            </nuxt-link>
        </div>
        <div class="top logo">
          <logo/>
        </div>
        <div class="info">
          <div class="address">
            <div class="line"/>
            <div class="item" v-for="(item,i) in data.address" :key="i">
              <span class="copy">{{item}}</span>
            </div>
          </div>
          <div class="social">
            <a href="#">icon</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/components/site/logo'
import data from '@/assets/data'
export default {
  components:{logo},
  data(){
    return{
      data: data.top,
      open: false,
      buttonAnimation: null
    }
  },
  mounted(){

    let ba = new this.$gsap.timeline({paused: true,ease: 'power1.inOut'})
    ba.to('#top .button',.35,{padding: 20,width:"+=70", height: '+=70'},0)
    ba.to('#top .button .line.top',.35,{rotation: -45},0)
    ba.to('#top .button .line.bottom',.35,{y: -10, rotation: 45},0)
    this.buttonAnimation = ba

    let tl = new this.$gsap.timeline()
    tl.set('#top .logo.top',{y:'-100%'})
    tl.fromTo('#top .button',1,{y:'-100%'},{y:'0%'},.25)
    tl.fromTo('#top .side.logo',1,{y:'100%'},{y:'0%'},.25)
    tl.fromTo('#top .mobile.logo',1,{x:'100%'},{x:'0%'},.25)

  },
  watch:{
    open(open){
      open ? this.openMenu() : this.closeMenu()
    }
  },
  methods:{
    openMenu(){
      let tl = new this.$gsap.timeline()
      tl.add(this.buttonAnimation.play(),0)
      tl.to('#top .logo.side',.3,{y:'100%',ease:'power2.in'},0)
      tl.to('#top .menu',.75,{width: '100vw',ease: 'power2.out'},0)
      tl.fromTo('#top .logo.top',.5,{y:'-100%'},{y:'0%',ease:'power2.out'},.25)
      tl.fromTo('#top .address .line',.5,{width:0},{width:'100%',ease:'power2.out'},.5)
      tl.staggerFromTo('#top .address span',.5,{y:'100%'},{y:'0%'},.15,.5)
      tl.staggerFromTo('#top .inner-link',.75,{y:'100%'},{y:'0%'},.15,.6)
    },
    closeMenu(){
      let tl = new this.$gsap.timeline()
      tl.add(this.buttonAnimation.reverse(),0)
      tl.to('#top .menu',.5,{width: 0,ease: 'power2.out'},0)
      tl.to('#top .logo.side',.5,{y:'0%',ease:'power2.out'},.1)
    }
  }
}
</script>

<style lang="scss">

  $infoWidth: 300px;
  $sideWidth: 60px;

  #top{
    position: relative;
    z-index: 100;
  }

  #top .menu{
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 0px;
    overflow: hidden;
    background: $bg2
  }

  #top .logo{
    fill: $color;
  }

  #top .logo.side{
    position: fixed;
    z-index: 1;
    bottom: 0px;
    left: 0px;
    width: $sideWidth;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #top .logo.top{
    position: absolute;
    right: $padding;
    width: $infoWidth;
    padding-top: $padding / 2;
    top: 0px;
  }

  #top .logo.mobile{
    width: 130px;
    position: fixed;
    top: 0px;
    right: 0px;
    height: $sideWidth;
    width: 180px;
    justify-content: center;
    align-items: center;
    display: none;
    z-index: 1;
  }

  #top .logo.mobile svg{
    flex: 0 0 150px;
  }

  #top .logo.side svg{
    transform: rotate(-90deg);
    flex: 0 0 150px;
  }


  #top .button{
    position: fixed;
    display: block;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: $sideWidth;
    height: $sideWidth;
    padding: 15px;
    background: none;
    border: none;
    outline: none;
  }

  #top .button .line{
    width: 100%;
    height: 2px;
    background: $color;
    margin: 8px 0px;
  }

  #top .content{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    position: relative;
    padding: $padding;
  }

  #top .links{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  #top .links a{
    overflow: hidden;
    display: inline-block;
  }

  #top .inner-link{
    font-size: 7vw;
    display: inline-block;
  }

  #top .info{
    flex: 0 0 $infoWidth;
  }

  #top .address{
    margin-top: $paddingSmall;
    padding: $paddingSmall 0px;
    position: relative;
  }

  #top .address .line{
    position: absolute;
    top: 0px;
    width: 100%;
    border-top: 3px double $color;
  }

  #top .address .item{
    overflow: hidden;
  }
  #top .address span{
    display: block;
    font-size: 20px;
    line-height: 30px;
  }

  @media screen and (max-width: $tablet){

    #top .logo.top{
      display: none;
    }

    #top .content{
      flex-direction: column;
    }

    #top .links{
      min-height: 400px;
    }

    #top .inner-link{
      font-size: 9vw;
    }

    #top .info{
      flex: 0 0 40%;
    }

    #top .logo.mobile{
      display: flex;
    }

    #top .logo.side{
      display: none;
    }

    #top .logo.top{
      display: none;
    }

  }

  @media screen and (max-width: $mobile){
    #top .inner-link{
      font-size: 11vw;
    }

  }
</style>
