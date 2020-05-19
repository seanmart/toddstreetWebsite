<template lang="html">

  <div id="navigation" ref="navigation">

    <div class="top" ref="top">

      <div class="logo" ref="logo">
        <nuxt-link to="/"><icons logo/></nuxt-link>
      </div>

      <nav>
        <template v-if="links" v-for="link in links">
          <div class="link" ref="links">
            <nuxt-link :to="link.to" :key="link.index">
              <h3>{{link.label}}</h3>
            </nuxt-link>
          </div>
        </template>
      </nav>

    </div>
    <div class="menu-button" ref="button">
      <button><i/><i/></button>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    init: Boolean
  },
  mounted(){
    this.$gsap.set(this.$refs.links,{opacity: 0})
    this.$gsap.set(this.$refs.logo,{opacity: 0})
    this.$gsap.set(this.$refs.button,{opacity: 0})

    this.$vb.addSection(this.$refs.top)
    this.$vb.addElement(this.$refs.logo,{y:3})
    this.$vb.addElement(this.$refs.links,(i)=>({
      y: (i * 1) + 1,
      duration: 300,
      delay: 3
    }))

  },
  watch:{
    init(init){

      let tl = this.$gsap.timeline()

      tl.fromTo(this.$refs.logo,.75,{y:50},{y:0,opacity:1,ease: 'power2.out'},0)
      tl.fromTo(this.$refs.links,.75,{y:50},{y:0,opacity:1,stagger:.075,ease: 'power2.out'},.25)
      tl.fromTo(this.$refs.button,.75,{scale:.3},{scale:1,opacity:1,ease: 'power2.out'},.5)

    },
  },
  beforeDestroy(){
    this.$gsap.to(this.$refs.logo,.5,{y:-50,opacity:0, ease: 'power2.in'})
    this.$gsap.to(this.$refs.links,.5,{y:-50,opacity:0, ease: 'power2.in'})
    this.$gsap.to(this.$refs.button,.5,{y:-50,opacity:0, ease: 'power2.in'})
  },
  computed: mapState(['links'])
}
</script>

<style lang="scss">

$navHeight: $v-space * 1.25;

#navigation{

  .top{
    width: 100%;
    height: $navHeight;
    padding: 0px $h-space;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .logo{
    width: 220px;
  }

  nav{
    flex: 0 0 auto;
    margin-left: auto;
    display: flex;
    flex-direction: row;

    .link{
      margin-left: 50px;

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
