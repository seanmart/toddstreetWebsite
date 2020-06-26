<template lang="html">
  <section id="about" class="space--all texture">
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
#about{
  height: 600px;
}
</style>
