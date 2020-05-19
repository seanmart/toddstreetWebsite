<template lang="html">
  <section id="sizzle" ref="section">
    <div class="content" ref="content">
      <follow appear>
        <div class="video"/>
        <template v-slot:button>
          <h3 class="button">play</h3>
        </template>
      </follow>
    </div>
  </section>
</template>

<script>
import follow from '@/components/follow'
export default {
  components:{follow},
  mounted(){
    this.$vb.addSection(this.$refs.section, { onEnter:({direction})=>{
      if (direction !== 'down') return
      this.$gsap.fromTo(this.$refs.content,1,{scale:.5,y: 200,opacity: 0},{scale:1,y: 0,opacity: 1})
    }})
  }
}
</script>

<style lang="scss">
#sizzle{

  .video{
    width: 100%;
    padding-bottom: 56.25%;
    background: #eee;
  }

  .button{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    cursor: pointer;
  }


  @media (max-width: $mobile){
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
