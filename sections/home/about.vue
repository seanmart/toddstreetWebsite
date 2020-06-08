<template lang="html">
  <section id="about" class="texture">
    <div class="inner-section">
      <section-title :title="data.title"/>
    </div>
  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
import sectionDescription from '@/components/sectionDescription'

export default {
  props:['data'],
  components:{sectionTitle,sectionDescription}
}
</script>

<style lang="scss">
</style>
