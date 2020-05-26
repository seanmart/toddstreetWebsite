<template lang="html">
  <section id="events" v-section>
      <section-title :text="data.title"/>
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
  },
}
</script>

<style lang="scss">
#events{
  .section-description{
    margin-left: $col5;
  }

  .big-circle{
    position: absolute;
    z-index: -1;
    top:$v-space;
    left: 50%;
  }

  .content{
    height: 100vh;
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
