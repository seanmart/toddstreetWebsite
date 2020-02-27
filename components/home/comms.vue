<template lang="html">
  <section id="comms" v-scroll:section>
    <info
      reverse
      :title="data.title"
      :subtitle="data.subtitle"
      :description="data.description"
      :offerings="data.offerings"
    />
    <gallery :images="data.gallery"/>
  </section>
</template>

<script>
import info from './components/info'
import gallery from './components/gallery'
export default {
  props:{data:{type: Object, default:()=>({})}},
  components:{info,gallery}
}
</script>

<style lang="scss">

</style>
