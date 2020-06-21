<template lang="html">
  <section id="events" class="space--all" data-section>
    <section-title class="space--b" :text="data.title"/>
    <p v-if="data.heading" class="heading body--font bold col--ml4" v-enter:slideup v-html="data.heading"/>
    <p v-if="data.description" class="description body--font col--ml4" v-enter:slideup v-html="data.description"/>
    <div class="texture big-circle margin--t" v-enter:zoomout v-parallax="2"/>
    <div class="gallery margin--t">
      <div v-for="(caseStudy,i) in data.caseStudies" :key="i" class="gallery-item">
        <case-study :data="caseStudy"/>
      </div>
    </div>
  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
import caseStudy from '@/components/caseStudy'
export default {
  components:{sectionTitle,caseStudy},
  props:['data'],
}
</script>

<style lang="scss">
#events{

  .gallery-item{
    overflow: hidden;
    margin-bottom: 0px;
    flex: 0 0 100%;
    .case-study{
      padding-bottom: 50%;
    }

  }
}
</style>
