<template lang="html">
  <section id="about" class="space--all texture" data-section>
    <section-title :text="data.title"/>
  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
export default {
  components:{sectionTitle},
  props:['data']
}
</script>

<style lang="scss">
#cares{
  height: 600px;
}
</style>
