<template lang="html">
  <section id="training" v-scroll:section>
    <info
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
  components:{info,gallery},
}
</script>

<style lang="scss">

</style>
