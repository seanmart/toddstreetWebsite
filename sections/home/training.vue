<template lang="html">
  <section id="training" v-section>
    <section-title :text="data.title"/>
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
#training{
  .section-description{
    margin-left: $col5;
  }
  .big-circle{
    position: absolute;
    z-index: -1;
    top:$v-space;
    left: 50%;
  }

  @media (max-width: $mobile){
    .section-description{
      margin: 0px;
    }
    .big-circle{
      top:$v-space * 1.5;
    }
  }
}
</style>
