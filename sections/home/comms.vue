<template lang="html">
  <section id="comms" v-section>
    <section-title right :text="data.title"/>
    <section-description :heading="data.heading" :body="data.body"/>
    <big-circle/>
    <div class="content">

    </div>
  </section>
</template>

<script>
export default {
  props:{
    data: {type: Object, default: ()=>({})}
  }
}
</script>

<style lang="scss">
#comms{
  .section-description{
    width: $col9;
  }
  .big-circle{
    position: absolute;
    z-index: -1;
    top:$v-space;
    right: 50%;
  }

  .content{
    height: 100vh;
  }

  @media (max-width: $mobile){
    .section-description{
      width: auto;
    }
    .big-circle{
      top:$v-space * 1.5;
    }
  }
}
</style>
