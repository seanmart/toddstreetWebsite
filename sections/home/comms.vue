<template lang="html">
  <section id="comms" v-section>
    <section-title right :text="data.title"/>
    <section-description :heading="data.heading" :body="data.body"/>
    <big-circle/>
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
