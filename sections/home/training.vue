<template lang="html">
  <section id="training" class="space--all" data-section>
    <section-title class="space--b" :text="data.title"/>
    <p v-if="data.heading" class="heading body--font bold col--ml4" v-enter:slideup v-html="data.heading"/>
    <p v-if="data.description" class="description body--font col--ml4" v-enter:slideup v-html="data.description"/>
    <div class="texture big-circle margin--t" v-enter:zoomout v-parallax="2"/>
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
#training{
  height: 200vh;
}
</style>
