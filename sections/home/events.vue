<template lang="html">
  <section id="events" ref="section">
      <big-title :text="data.title"/>
      <div class="test">

      </div>
  </section>
</template>

<script>
export default {
  props:{
    data: {type: Object, default: ()=>({})},
    init: {type: Boolean, default: false}
  },
  mounted(){
    this.$vb.addSection(this.$refs.section)

  }
}
</script>

<style lang="scss">
#events{
  .test{
    height: 100vh;
    width: 100%;
  }
}
</style>
