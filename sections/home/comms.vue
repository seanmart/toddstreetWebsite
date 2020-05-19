<template lang="html">
  <section id="comms" ref="section">
      <big-title :text="data.title"/>
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
#comms{

}
</style>
