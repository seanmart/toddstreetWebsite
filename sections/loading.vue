<template lang="html">
  <div id="loading">
    <div class="content"><icon logoVerticalPadding/></div>
  </div>
</template>

<script>
export default {
  props:{
    hide:{type: Boolean, default: false}
  },
  watch:{
    hide(){
      gsap.timeline()
          .to('#loading',.5,{height:0,display:'none', ease: 'power2.in'})
          .add(()=> this.$emit('hidden'))
    }
  },
  mounted(){

    let letter = Array.from(document.querySelectorAll('.logo-letter'))
    let rect = document.querySelector('#loading svg').getBoundingClientRect()
    let todd = [...letter].splice(0,4)
    let street = [...letter].splice(4,6)

    gsap.timeline({delay: .5})
        .set('#loading svg',{opacity:1})
        .from(todd,1,{y: -rect.height * .5, opacity:0, ease: 'power2.out'})
        .from(street,1,{y: rect.height * .5, opacity:0, ease: 'power2.out'},'<.5')
        .add(()=> this.$emit('done'),'+=.5')

    if (resizer.touch) gsap.set('#loading .content', {height: window.innerHeight})
  }
}
</script>

<style lang="scss">
#loading{
  position: fixed;
  top: 0px;
  left: 0px;
  background: black;
  z-index: 1000;
  .content{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
      flex: 0 0 auto;
      fill: white;
      width: 600px;
      max-width: 100vw;
      opacity: 0;
    }
  }
}
</style>
