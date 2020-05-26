<template lang="html">

  <div id="navigation">

    <div class="top" v-section v-element="handleScroll">

      <nuxt-link to="/" class="logo"><icons logo/></nuxt-link>

      <nav>
        <template v-if="links" v-for="link in links">
          <div class="link">
            <nuxt-link :to="link.to" :key="link.index">
              <h3>{{link.label}}</h3>
            </nuxt-link>
          </div>
        </template>
      </nav>

    </div>
    <div class="menu-button">
      <button><i/><i/></button>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      scrollAnimation: null
    }
  },
  mounted(){

    let tl = this.$gsap.timeline({delay: .5})

    tl.fromTo('#navigation .logo svg',1,{y:100},{y:0,ease: 'power2.out'},.15)
    tl.fromTo('nav a',1,{y:100},{y:0,stagger:.1,ease: 'power2.out'},.3)
    tl.fromTo('#navigation .menu-button',.5,{scaleX:0},{scaleX:1,ease: 'power2.out'},1)

    this.scrollAnimation = this.$gsap.to('nav .link',1,{yPercent:(i)=> i * -50, paused: true})
  },
  beforeDestroy(){
    this.$gsap.to('#navigation .logo svg',.5,{y:-100, ease: 'power2.in'})
    this.$gsap.to('nav a',.5,{y:-100, stagger:-.075, ease: 'power2.in'})
    this.$gsap.to('#navigation .menu-button',.5,{scaleX:0,ease: 'power2.in'})
  },
  computed: mapState(['links']),
  methods:{
    handleScroll(e){
      this.scrollAnimation.progress(e.percent)
    }
  }
}
</script>

<style lang="scss">

$navHeight: $v-space * 1.25;

#navigation{

  .top{
    height: $navHeight;
    padding: 0px $h-space;
    margin: 0px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .logo{
    overflow: hidden;
    width: 200px;
    display: inline-block;

    svg{
      width: 100%;
    }
  }

  nav{
    flex: 0 0 auto;
    margin-left: auto;
    display: flex;
    flex-direction: row;

    .link{
      margin-left: 50px;
      overflow: hidden;

      a{
        display: inline-block;
      }

      h3{
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 400;
      }
    }
  }

  .menu-button{
    position: fixed;
    z-index: 1000;
    right: 0px;
    top: 0px;
    height: $navHeight;
    width: $h-space;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button{
      padding: 20px;
      display: block;

      i{
        display: block;
        width: 30px;
        height: 2px;
        margin: 5px 0px;
        background: black;
        transition: transform .25s;
      }

      &:hover{
        i:first-child{
          transform: translateY(-2px);
        }
        i:last-child{
          transform: translateY(2px);
        }
      }
    }
  }

  @media (max-width: $tablet){
    .top{
      padding: 0px $mh-space;

      nav{
        display: none;
      }
    }

    .menu-button{
      right: $mh-space;
      width: auto;
      margin-right: -20px;
    }
  }

  @media (max-width: $mobile){

    .top,
    .menu-button{
      height: $v-space;
    }

    .logo{
      width: 150px;
    }
  }

}
</style>
